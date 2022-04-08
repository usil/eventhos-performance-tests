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

| CPU NODES | API RAM | DB RAM | DB Max POOL | Max Database Connections |
| --------- | ------- | ------ | ----------- | ------------------------ |
| 3         | 1GB     | 1GB    | 300         | 1100                     |

## Results

| Contracts (Subscriptions) | App Ram Usage | App Cpu Usage | DB Ram Usage | DB Cpu Usage | Errors | Time To Send All (ms) |
| ------------------------- | ------------- | ------------- | ------------ | ------------ | ------ | --------------------- |
| 50                        | 135 mb        | 23%           | 371 mb       | 36%          | 0      | 163                   |
| 100                       | 188 mb        | 51%           | 371 mb       | 36%          | 0      | 186                   |
| 500                       | 198 mb        | 98%           | 382 mb       | 37%          | 0      | 755                   |
| 1000                      | 191 mb        | 117%          | 401 mb       | 38%          | 0      | 1335                  |
| 2000                      | 209 mb        | 201%          | 490 mb       | 40%          | 0      | 2902                  |

## Graph

![lineGraph](https://i.ibb.co/k2jfVmL/chart.png)

## Running the test

To run those test use the [automatization test server](./test-automatization/readme.md).

## Annotations (Max connections limit reached in mysql)

Its important to keep in mind that having 3 CPU Nodes technically equals to having 3 instances of the app running. This means 3 instances of knex, if your max pool connections is 1000 then your actual max pool of connections will be 3000, this could generate an error in the database, the max connections limit reached (`mysql error 1040`).

To solve this you will have to balance 3 aspects, the nodes, the max pool in knex and the `max_connections` of the mysql db. This means that in the docker compose the line `--max_connections=<desired connections number>` will be needed in the command attribute of `eventhos-db` container. For the pool modify the `DATA_BASE_POOL_MAX` environment variable inside the docker-compose file, finally modify `CPU_COUNT` environment variable in the same file.
