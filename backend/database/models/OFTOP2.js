const { Sequelize, DataTypes } = require("sequelize");
const database = require("../grl_connection");
const OFTOP2 = database.define(
        "OilFill_TOP2",
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
        await OFTOP2.sync({ force: false });
    })();
        module.exports = OFTOP2;