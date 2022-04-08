require("dotenv").config;
const app = require("./performanceReportServer/performanceReportServer");
const executeAutomatization = require("./automatization/automatization");

const performanceServerPort = process.env.PERFORMANCE_SERVER_PORT || 2112;

const server = app.listen(performanceServerPort, async () => {
  console.log(`listening in port http://localhost:${server.address().port}`);
  console.log("Running automatization");
  await executeAutomatization();
  console.log("Finished");
  process.exit();
});
