const { Sequelize, DataTypes } = require("sequelize");
const database = require("../grl_connection");
const ECBTM = database.define(
        "Endcap_BTM",
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
            Pre_Position: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            Press_Position: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            Force: {
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
        await ECBTM.sync({ force: false });
    })();
        module.exports = ECBTM;