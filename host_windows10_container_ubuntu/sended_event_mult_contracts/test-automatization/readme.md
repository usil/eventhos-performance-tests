# Eventhos subscriptions test automatization

This library propose is to the the performance of the eventhos system when an event with multiple contracts is send.

## Usage

### Environment variables

This support an `.env` file

| Variable                | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| EVENTHOS_API            | Url to the eventhos api                                    |
| ADMIN_PASSWORD          | The admin password                                         |
| PERFORMANCE_SERVER_PORT | The port where the performance server mock will be created |
| PC_IP                   | The ip of your pc                                          |

### Running it

First run npm install then use `npm start -- --times <number of contracts to test>`. The following command will run the test with 1000 contracts `npm start -- --times 1000`.
