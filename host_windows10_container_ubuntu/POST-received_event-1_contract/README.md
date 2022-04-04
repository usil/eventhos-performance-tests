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

| Virtual Users | CPU Nodes | App Ram | DB Ram | Max Pool | Average Time (ms) | Readme |
| ------------- | --------- | ------- | ------ | -------- | ----------------- | ------ |
| 50            | 1         | 1 GB    | 1 GB   | 400      | 2900              |
| 50            | 2         | 1 GB    | 1 GB   | 600      | 1465              |
| 50            | 3         | 1 GB    | 1 GB   | 600      | 1288              |
| 100           | 1         | 1 GB    | 1 GB   | 400      | 8300              |
| 100           | 2         | 1 GB    | 1 GB   | 600      | 2785              |
| 100           | 3         | 1 GB    | 1 GB   | 600      | 2057              |
| 500           | 1         | 1 GB    | 1 GB   | 400      | 42781             |
| 500           | 2         | 1 GB    | 1 GB   | 600      | 20422             |
| 500           | 3         | 1 GB    | 1 GB   | 600      | 14750             |
| 1000          | 1         | 1 GB    | 1 GB   | 400      | 90033             |
| 1000          | 2         | 1 GB    | 1 GB   | 600      | 40140             |
| 1000          | 3         | 1 GB    | 1 GB   | 600      | 27977             |
| 1500          | 1         | 1 GB    | 1 GB   | 400      | 131565            |
| 1500          | 2         | 1 GB    | 1 GB   | 600      | 60785             |
| 1500          | 3         | 1 GB    | 1 GB   | 600      | 44461             |
| 2000          | 1         | 1 GB    | 1 GB   | 400      | 180751            |
| 2000          | 2         | 1 GB    | 1 GB   | 600      | 82463             |
| 2000          | 3         | 1 GB    | 1 GB   | 600      | 56690             |

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
