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

| CPU NODES | API RAM | DB RAM | DB Max POOL |
| --------- | ------- | ------ | ----------- |
| 3         | 1GB     | 1GB    | 300         |

## Results

| Contracts (Subscriptions) | App Ram Usage | App Cpu Usage | DB Ram Usage | DB Cpu Usage | Errors | Time To Send All (ms) |
| ------------------------- | ------------- | ------------- | ------------ | ------------ | ------ | --------------------- |
| 50                        | 135 mb        | 23%           | 371 mb       | 36%          | 0      | 163                   |
| 100                       | 188 mb        | 51%           | 371 mb       | 36%          | 0      | 186                   |
| 500                       | 198 mb        | 98%           | 382 mb       | 37%          | 0      | 755                   |
| 1000                      | 191 mb        | 117%          | 401 mb       | 38%          | 0      | 1335                  |
| 2000                      | 209 mb        | 201%          | 490 mb       | 40%          | 0      | 2902                  |

## Graph

![lineGraph](https://i.ibb.co/b1Hr40s/chart22.png)

## How to run the test

Running this test requires to understand how the code in eventhos works. For those that don't here it is a semi-detailed guide.

### Create a stored procedure

First run the script that is in this directory to create a stored procedure.
