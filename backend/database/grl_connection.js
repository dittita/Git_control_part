const Sequelize = require("sequelize");
const sequelize = new Sequelize("DataforAnalysis", "DATALYZER", "NMB54321", {
  host: "192.168.101.219",
  // host: "10.120.122.10", //10.120.122.10
  //port: 2005,
  dialect: "mssql",
  dialectOptions: {
    options: { requestTimeout: 600000 },
  },
});
(async () => {
  await sequelize.authenticate();
})();
module.exports = sequelize;

