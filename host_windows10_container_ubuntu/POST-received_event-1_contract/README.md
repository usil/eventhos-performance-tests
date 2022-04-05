# /event/received performance test

## Stress information

This stress test only test the endpoint with one contract. And the subscribed endpoint instantly returns a 200.

## End point information

| Method | Full Url                               |
| ------ | -------------------------------------- |
| POST   | `http://localhost:2109/event/received` |

### Url query variables

| Variable         | Value           |
| ---------------- | --------------- |
| event-identifier | `stress_select` |
| access-key       | `access_key`    |

## Test list

| Virtual Users | CPU Nodes | App Ram | DB Ram | Max Pool | Average Time (ms) | Readme                                                                                                    |
| ------------- | --------- | ------- | ------ | -------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| 50            | 3         | 1 GB    | 1 GB   | 600      | 550               | [Link](<./(50)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600/README.md>)   |
| 100           | 3         | 1 GB    | 1 GB   | 600      | 609               | [Link](<./(100)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600//README.md>) |
| 500           | 3         | 1 GB    | 1 GB   | 600      | 3071              | [Link](<./(500)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600/README.md>)  |
| 1000          | 3         | 1 GB    | 1 GB   | 600      | 6041              | [Link](<./(1000)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600/README.md>) |
| 1500          | 3         | 1 GB    | 1 GB   | 600      | 7773              | [Link](<./(1500)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600/README.md>) |
| 2000          | 3         | 1 GB    | 1 GB   | 600      | 8187              | [Link](<./(2000)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600/README.md>) |

## Graph

![graph](https://i.ibb.co/8MzjVMK/Virtual-Users-frente-a-Time-ms.png)
