const Sequelize = require("sequelize");
const desc = new Sequelize("TransportData", "DATALYZER", "NMB123456", {
  host: "192.168.101.216",
  // host: "10.120.122.10", //10.120.122.10
  //port: 2005,
  dialect: "mssql",
  dialectOptions: {
    options: { requestTimeout: 600000 },
  },
});
(async () => {
  await desc.authenticate();
})();
module.exports = desc;


