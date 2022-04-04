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

| Virtual Users | CPU Nodes | App Ram | DB Ram | Max Pool | Average Time (ms) | Readme                                                                                                                                                                                                                                |
| ------------- | --------- | ------- | ------ | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 50            | 1         | 1 GB    | 1 GB   | 400      | 2900              | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(50)%201%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20400>)   |
| 50            | 2         | 1 GB    | 1 GB   | 600      | 1465              | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1500)%202%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |
| 50            | 3         | 1 GB    | 1 GB   | 600      | 1288              | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(50)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>)   |
| 100           | 1         | 1 GB    | 1 GB   | 400      | 8300              | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(100)%201%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20400>)  |
| 100           | 2         | 1 GB    | 1 GB   | 600      | 2785              | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(100)%202%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>)  |
| 100           | 3         | 1 GB    | 1 GB   | 600      | 2057              | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(100)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>)  |
| 500           | 1         | 1 GB    | 1 GB   | 400      | 42781             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(500)%201%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20400>)  |
| 500           | 2         | 1 GB    | 1 GB   | 600      | 20422             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(500)%202%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>)  |
| 500           | 3         | 1 GB    | 1 GB   | 600      | 14750             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(500)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>)  |
| 1000          | 1         | 1 GB    | 1 GB   | 400      | 90033             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1000)%201%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20400>) |
| 1000          | 2         | 1 GB    | 1 GB   | 600      | 40140             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1000)%202%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |
| 1000          | 3         | 1 GB    | 1 GB   | 600      | 27977             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1000)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |
| 1500          | 1         | 1 GB    | 1 GB   | 400      | 131565            | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1500)%201%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20400>) |
| 1500          | 2         | 1 GB    | 1 GB   | 600      | 60785             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1500)%202%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |
| 1500          | 3         | 1 GB    | 1 GB   | 600      | 44461             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(1500)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |
| 2000          | 1         | 1 GB    | 1 GB   | 400      | 180751            | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(2000)%201%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20400>) |
| 2000          | 2         | 1 GB    | 1 GB   | 600      | 82463             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(2000)%202%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |
| 2000          | 3         | 1 GB    | 1 GB   | 600      | 56690             | [Link](<https://github.com/usil/eventhos-performance-tests/tree/proformance-test/host_windows10_container_ubuntu/POST-received_event-1_contract/(2000)%203%20CPU%20NODE%20-%20APP%20RAM%201GB%20-%20DB%20RAM%201GB%20-%20Pool%20600>) |

## Graph

### 50 Virtual Users

![50vu](https://i.ibb.co/N2FJrkk/Time.png)

### 100 Virtual Users

![100vu](https://i.ibb.co/RzXPfpy/Time-1.png)

### 500 Virtual Users

![500vu](https://i.ibb.co/bJSDn6g/Time-2.png)

### 1000 Virtual Users

![1000vu](https://i.ibb.co/mShmtzy/Time-3.png)

### 1500 Virtual Users

![1500vu](https://i.ibb.co/Bct6CS1/Time-4.png)

### 2000 Virtual Users

![2000vu](https://i.ibb.co/XSGCHJD/Time-5.png)
