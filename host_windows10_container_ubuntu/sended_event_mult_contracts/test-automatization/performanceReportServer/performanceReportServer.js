const express = require("express");
const app = express();

// const results = { data: [], numberOfElements: 0 };
let results = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("ok");
});

app.delete("/:uid", (req, res) => {
  const { uid } = req.params;
  delete results[uid];
  res.json({ message: "cleaned" });
});

app.get("/:uid", (req, res) => {
  const { uid } = req.params;
  // console.log(results);
  res.json({ ...results[uid] });
});

app.post("/receive", (req, res) => {
  const nowDate = new Date();
  const timeToShow = `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}:${nowDate.getMilliseconds()}`;
  const uid = req.body.performanceReport.uid;

  if (results[uid]) {
    results[uid].data.push({
      body: { ...req.body },
      count: results[uid].data.length + 1,
      timeOfReceivedEvent: timeToShow,
      time: nowDate.getTime(),
    });
  } else {
    results[uid] = {
      sendedAt: req.body.performanceReport.launchedAt,
      numberOfElements: req.body.performanceReport.testQuantity,
      data: [
        {
          body: { ...req.body },
          count: 1,
          timeOfReceivedEvent: timeToShow,
          time: nowDate.getTime(),
        },
      ],
    };
  }

  res.json({ message: "registered" });
});

module.exports = app;

// const server = app.listen(2112, () => {
//   console.log(`listening in port http://localhost:${server.address().port}`);
// });
