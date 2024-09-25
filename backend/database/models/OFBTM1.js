const { Sequelize, DataTypes } = require("sequelize");
const database = require("../grl_connection");
const OFBTM1 = database.define(
        "OilFill_BTM1",
        {
            Date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                primaryKey: false,
            },
            Time: {
                type: Sequelize.STRING,
                allowNull: false,
    //             unique: true,
            },
            Amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            Dispensing_Time: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            Process_Time: {
                type: Sequelize.FLOAT,
                allowNull: false,
            }
        },
        {
            //option
        }
    );
        (async () => {
        await OFBTM1.sync({ force: false });
    })();
        module.exports = OFBTM1;