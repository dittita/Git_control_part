const { Sequelize, DataTypes } = require("sequelize");
const database = require("./../connection/icx_connection");
const manpower_master = database.define(
    "manpower_master",
    {
        employee_number: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
                    },
        employee_title_name: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        employee_first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        employee_last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        division_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_email: {
                type: Sequelize.STRING,
                allowNull: false,
        },
    },
    {
        //option
    }
);
(async () => {
    await manpower_master.sync({ force: false});
})();

module.exports = manpower_master;

