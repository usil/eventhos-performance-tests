require("dotenv").config();

const axios = require("axios").default;
const argv = require("minimist")(process.argv.slice(2));
const rs = require("randomstring");
const fs = require("fs/promises");
const path = require("path");

const options = {
  headers: {
    Authorization: "",
  },
};

const eventhosApi = process.env.EVENTHOS_API;
const adminPassword = process.env.ADMIN_PASSWORD;
const performanceServerPort = process.env.PERFORMANCE_SERVER_PORT || 2112;
const pcIp = process.env.PC_IP;
const waitTime = argv.wt || 5000;

const delay = (delayTime) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delayTime);
  });
};

const setOauthHeader = async () => {
  try {
    const oauthResponse = await axios.post(eventhosApi + "/auth/login", {
      username: "admin",
      password: adminPassword,
    });

    options.headers.Authorization = `BEARER ${oauthResponse.data.content.jwt_token}`;

    return [true, null];
  } catch (error) {
    console.log(error);
    return [null, error.message];
  }
};

const createClient = async () => {
  try {
    const identifierAndNameString = rs.generate({
      length: 12,
      charset: "alphabetic",
    });

    const createClientResult = await axios.post(
      eventhosApi + "/auth/client?longLive=false",
      {
        description: "description",
        identifier: identifierAndNameString,
        name: identifierAndNameString,
        roles: [{ id: 1, identifier: "admin" }],
      },
      {
        ...options,
      }
    );
    return [
      {
        clientSecret: createClientResult.data.content.clientSecret,
        clientId: createClientResult.data.content.clientId,
      },
      null,
    ];
  } catch (error) {
    console.log(error);
    return [null, error.message];
  }
};

const createSystem = async (systemClass = "producer") => {
  try {
    const producerIdentifier = rs.generate({
      length: 12,
      charset: "alphabetic",
    });
    let bodyToCreateSystem = {
      description: "description",
      identifier: producerIdentifier,
      name: producerIdentifier,
      systemClass,
      type: "CRM",
    };
    if (systemClass === "producer") {
      const lastClient = (
        await axios.get(
          eventhosApi + "/auth/client?pageIndex=0&&itemsPerPage=1&&order=desc",
          {
            ...options,
          }
        )
      ).data.content.items[0];
      bodyToCreateSystem.clientId = lastClient.id;
    }

    const createSystemResponse = await axios.post(
      eventhosApi + "/system",
      {
        ...bodyToCreateSystem,
      },
      {
        ...options,
      }
    );
    return [createSystemResponse.data.content.systemId, null];
  } catch (error) {
    console.log(error);
    return [null, error.message];
  }
};

const createEvent = async (producerId = 0) => {
  try {
    const eventIdentifier = rs.generate({
      length: 12,
      charset: "alphabetic",
    });
    const createEventResult = await axios.post(
      eventhosApi + "/event",
      {
        description: "description",
        identifier: eventIdentifier,
        name: eventIdentifier,
        operation: "select",
        system_id: producerId,
      },
      {
        ...options,
      }
    );
    return [
      { eventId: createEventResult.data.content.eventId, eventIdentifier },
      null,
    ];
  } catch (error) {
    console.log(error);
    return [null, error.message];
  }
};

const createAction = async (consumerId = 0) => {
  try {
    const actionIdentifier = rs.generate({
      length: 12,
      charset: "alphabetic",
    });
    const createActionResult = await axios.post(
      eventhosApi + "/action",
      {
        bodyInput: "raw",
        description: "description",
        headers: [],
        identifier: actionIdentifier,
        method: "post",
        name: actionIdentifier,
        operation: "select",
        queryUrlParams: [],
        rawBody: { performanceReport: "${.body}" },
        securityType: 0,
        system_id: consumerId,
        url: `http://${pcIp}:${performanceServerPort}/receive`,
      },
      {
        ...options,
      }
    );
    return [createActionResult.data.content.actionId, null];
  } catch (error) {
    console.log(error);
    return [null, error.message];
  }
};

const createContract = async (actionId = 0, eventId = 0) => {
  try {
    const contractIdentifier = rs.generate({
      length: 12,
      charset: "alphabetic",
    });
    const createContractResult = await axios.post(
      eventhosApi + "/contract",
      {
        actionId: actionId,
        eventId: eventId,
        identifier: contractIdentifier,
        name: contractIdentifier,
      },
      {
        ...options,
      }
    );
    return [createContractResult.data.content.actionId, null];
  } catch (error) {
    console.log(error);
    return [null, error.message];
  }
};

const executeAutomatization = async () => {
  try {
    const contractsCount = parseInt(argv.times);

    await setOauthHeader();

    const [clientResult, clientError] = await createClient();

    const [producerId, producerError] = await createSystem();

    const [consumerId, consumerError] = await createSystem("consumer");

    const [eventResponse, eventError] = await createEvent(producerId);

    for (let index = 0; index < contractsCount; index++) {
      const [actionId, actionError] = await createAction(consumerId);
      await createContract(actionId, eventResponse.eventId);
    }

    const getAccessKey = await axios.post(eventhosApi + "/auth/token", {
      grant_type: "client_credentials",
      client_id: clientResult.clientId,
      client_secret: clientResult.clientSecret,
    });

    const uid = rs.generate({
      length: 12,
      charset: "alphabetic",
    });

    const sendEvent = await axios.post(
      eventhosApi +
        `/event/received?event-identifier=${eventResponse.eventIdentifier}&access-key=${getAccessKey.data.content.jwt_token}`,
      {
        uid,
        testQuantity: contractsCount,
        launchedAt: new Date().getTime(),
      }
    );

    console.log("Waiting For a result");

    await delay(waitTime);

    const reportResult = await axios.get(
      `http://${pcIp}:${performanceServerPort}/${uid}`
    );

    const reportResultData = reportResult.data;

    const timeToSendAll =
      reportResultData.data[reportResultData.data.length - 1].time -
      reportResultData.sendedAt;

    const reportJson = {
      uid,
      reportGeneratedAt: new Date().toISOString(),
      totalInvocations: contractsCount,
      assertsTrueCount:
        reportResultData.data.length === contractsCount
          ? contractsCount
          : reportResultData.data.length,
      assertsFalseCount: contractsCount - reportResultData.data.length,
      timeToSendAllInMilliseconds: timeToSendAll,
    };

    await fs.writeFile(
      path.join(__dirname, `../reports/${contractsCount}-${uid}.json`),
      JSON.stringify(reportJson, null, 3)
    );

    return sendEvent.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = executeAutomatization;
