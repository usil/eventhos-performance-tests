# Sending events to subscribers performance test

## End point information

| Method | Full Url                               |
| ------ | -------------------------------------- |
| POST   | `http://localhost:2109/event/received` |

### Url query variables

| Variable         | Value           |
| ---------------- | --------------- |
| event-identifier | `stress_select` |
| access-key       | `access_key`    |

## Eventhos Api Configuration

| CPU NODES | API RAM | DB RAM | DB POOL |
| --------- | ------- | ------ | ------- |
| 3         | 1GB     | 1GB    | 600     |

## Results

| Contracts (Subscriptions) | App Ram Usage | App Cpu Usage | DB Ram Usage | DB Cpu Usage | Errors | Time To Send All (ms) |
| ------------------------- | ------------- | ------------- | ------------ | ------------ | ------ | --------------------- |
| 100                       | 228 mb        | 47%           | 460 mb       | 20%          | 0      | 160                   |
| 500                       | 248 mb        | 111%          | 461 mb       | 30%          | 0      | 482                   |
| 1000                      | 256 mb        | 128%          | 466 mb       | 45%          | 0      | 1031                  |
| 2000                      | 289 mb        | 191%          | 470 mb       | 46%          | 0      | 1901                  |

## Graph

![lineGraph](https://i.ibb.co/b1Hr40s/chart22.png)

## How to run the test

Running this test requires to understand how the code in eventhos works. For those that don't here it is a semi-detailed guide.

### Create a stored procedure

First run the script that is in this directory to create a stored procedure.

### Running the stored procedure

This SP will create multiple contract for 1 event. A complication that surges is that you will need to pass some encrypted strings.

The variables:

```sql
IN numberOfSubscriptions INT,
IN clientID VARCHAR(60),
IN clientIdentifier VARCHAR(175),
IN clientSecret  VARCHAR(175),
IN producerSystemIdentifier VARCHAR(175),
IN producerSystemName VARCHAR(175),
IN consumerSystemIdentifier VARCHAR(175),
IN consumerSystemName VARCHAR(175),
IN eventIdentifier VARCHAR(175),
IN eventName VARCHAR(175),
IN actionName VARCHAR(175),
IN actionIdentifier VARCHAR(175),
IN actionHttpConfiguration  mediumtext,
IN securityActionHttpConfiguration mediumtext,
IN contractIdentifier VARCHAR(175),
IN contractName VARCHAR(175)
```

The variables `clientSecret`, `actionHttpConfiguration` and `securityActionHttpConfiguration` need to be an encrypted string.

### Getting the encrypted variables

For this you will need to manipulate the data base. For the `clientSecret` first create a client in the eventhos platform, save the auto generated client secret, then in the database, clients table, grab that generated encrypted string and save it somewhere.

For `securityActionHttpConfiguration` use the following, `bd738195e1a77d59c3d73a22b8f73842|.|e07a241c5cb29821928ed01953d55c2616`

And finally `actionHttpConfiguration` similar to the client secret create an action with the necessary values. Go to the actions table and take the `http_configuration` for the last created action and save it.

### Run the SP

Example to create the test for 2000 contracs.

```sql
call createEventWithSubscriptions(2000, '2000Clients', '2000Clients', '9de6ab172b3b74cb81c76b917f5a65cd|.|b2bc3dfec4d19534e3f961ae07977b3b52c5a6f01214648670a0217b17ae99ff', '2000Producers', '2000Producers', '2000Consumers', '2000Consumers', '2000Events', '2000Events', '2000Actions', '2000Actions', 'e2c61951aff0e4a62104a2c3422e2962|.|aeb456f33e4bf14894b63edb816039d13f4f219b48e97419c36f352ca97a1f0a0dd3bc61a75290f9e3b4cabeaed7ec408d0e1b26cb47c295d79f58a7b94e1ac6dd1b37b54252d39eb85b8dd0bd802c0edf54f1809d744503b7ece5db21244d7ce2ad535ba0eb0cd0ee1c5df9627d303d664296214a737df0b60d36995be0885f8f3997666a64fab9583f4aa423ffe7cb3f51e16991741d7b3b2e2a6911d43d3f706313e3268bbf3d3c0aa9f060bc85d22716afec534d76afd53cab956127b34647a6df1d96c30b0e29d4d0e1a7c1402f331a45670c3ac2e8a069ba7321d4fc07951292d81a8cafa1f1f3916ffe0fcfb32efd2df03db306132c79254cdb9946ef33a0b1a6e7b2ce064c77d06ed014c6e7612c397f1ff1fdb08ff9fb0cb495c9ae58126477c4f975f56aa792e0d2fde359065eafd7bc3ec2054431f3ecda161f444885c7a5f03e71153f5bef8c4e86a338704850ea393d52a5675a0749b2a25403918baa923aed705910cb8fb2ee789adf15c769a7b171dc5d73c5f4a84e7f1d30ce45af0e12bdb3468ea29d85f93516746291a7da5f74a45394df1689f330d316705685314d13e44cb982c02296f618e513cb5639a222a8cf85aa40a5463dd80a8c58457d6bbfc24cf8c488bc76a4c3c05d54f1337b9770c8ebaf135e3521fd78', 'bd738195e1a77d59c3d73a22b8f73842|.|e07a241c5cb29821928ed01953d55c2616', '2000Contracts', '2000Contracts');
```

### Call the endpoint

First you will need an acess token, call with `POST` `http://localhost:2109/auth/token` with the following body:

```json
{
  "grant_type": "client_credentials",
  "client_id": "2000Clients",
  "client_secret": "<The client secret generated in the platform>"
}
```

After that you will get an `acess_token`

Now using postman call the `/received` endpoint. For example:

`http://localhost:2109/event/received?event-identifier=2000Events&access-key=<acess_token>`
