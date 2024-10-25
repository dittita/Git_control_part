//Update 2024/08/06
const express = require("express");
const router = express.Router();
const user = require("../database/models/user"); //10

router.patch("/esl_linkESL", async (req, res) => {
  try {
    const { itemId, properties } = req.body;
    const axios = require("axios");
    const fs = require("fs");
    const https = require("https");
    const http = require("http");
    //const { ID } = req.params;
    //let { ID } = req.body
    // <<<<
    //     var eslCode = "N4074190701913284"
    //     var itemid = "A12"
    // =======
    // >>>>>>> upstream/main

    var eslCode = req.body.eslCode;
    var itemid = req.body.itemid;

    const json = {
      barcode: properties.barcode,

      links: [
        {
          barcode: properties.barcode,
          itemId: properties.itemId,
          
          
        },
      ],
    };
    console.log(json);
    let result_linkESL = await axios.patch(
      "http://192.168.101.119:3333/api/public/core/v1/labels",
      json,
      {
        headers: { "Content-Type": "application/json" },
        auth: { username: "config", password: "config" },
      }
    );
    console.log("Start");
    // get data and inset to data
    // Create or modify itemDetails based on the incoming data
       const itemDetails = {
        itemId: properties.itemId || " ",  // Use incoming itemId or default value
        properties: {
          // itemName: itemName || "DefaultName",  // Use incoming itemName or default value
          MO_DL: properties.MO_DL,
          Part: properties.Part,
          PART_NO: properties.PART_NO,
          Vendor: properties.Vendor,
          MO1: "",
          MO2: "",
          MO3: "",
          QTY: "0",
          // Add more properties as needed
        }
      };
    console.log(itemDetails);

    let result_addItem = await axios.patch(
      "http://192.168.101.119:3333/api/public/core/v1/items",
      itemDetails,
      {
        headers: { "Content-Type": "application/json" },
        auth: {
          username: process.env.API_USERNAME || "config",
          password: process.env.API_PASSWORD || "config"
        }
      }
    );

    console.log("Result add"+result_addItem.data);
    res.json({
      result_addItem: result_addItem.data,
      api_result: constants.OK
    });
    res.json({
      //result_updateQty,
      result_linkESL: result_linkESL.data,
      api_result: constants.OK,
    });
  } catch (error) {
    // console.log(error);
    // res.json({
    //   error,
    //   api_result: constants.NOK,
    // });
  }
});
router.get("/Model", async (req, res) => {
  try {
    let result = await user.sequelize.query(
      `SELECT  distinct [Model] FROM [Control_part].[dbo].[Master_finalPart] ORDER BY [Model] `
    );
    res.json({
      result: result[0],
      api_result: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});

router.get("/partname/:model", async (req, res) => {
  try {
    let { model } = req.params;
    let result = await user.sequelize.query(
      `SELECT  distinct [Part_name] FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' ORDER BY [Part_name]  `
    );
    res.json({
      result: result[0],
      api_result: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});

router.get("/part_number/:model/:partname", async (req, res) => {
  try {
    let { model, partname } = req.params;
    let result = await user.sequelize.query(
      `SELECT  distinct  [Part_number_NMB] FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' and  [Part_name]  = '${partname}' ORDER BY [Part_number_NMB] `
    );
    res.json({
      result: result[0],
      api_result: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});

router.get("/vendor/:model/:partname/:partnumber", async (req, res) => {
  try {
    let { model, partname, partnumber } = req.params;
    let result = await user.sequelize.query(
      `SELECT  distinct  [Supplier] FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' and  [Part_name]  = '${partname}' and  [Part_number_NMB] = '${partnumber}' ORDER BY  [Supplier]`
    );
    res.json({
      result: result[0],
      api_result: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});
router.get("/Mold/:model/:partname/:partnumber/:vendor", async (req, res) => {
  try {
    let { model, partname, partnumber, vendor } = req.params;
    let result = await user.sequelize.query(
      `SELECT DISTINCT [Mold]  FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' and  [Part_name]  = '${partname}' and  [Part_number_NMB] = '${partnumber}' and [Supplier] = '${vendor}'  and Mold != '' UNION SELECT DISTINCT 'Mix mold' AS [Mold] `
    );
    res.json({
      result: result[0],
      api_result: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});

router.get("/Data_master", async (req, res) => {
  try {
    // let { startDate, finishDate, process_pe, line } = req.params;

    // Convert 'undefined' string to empty string
    // if (line === 'undefined') {
    //   line = '';
    // }

    let result = await user.sequelize.query(
      `SELECT  [ESL_number],[Part_number],[Model],[Part_name],[Vendor],[Mold],[Mo_number] ,[IQC_number],[Rack_number] ,[Number],[QTY],[Updater] ,[Status],[ID] FROM [Control_part].[dbo].[Matching_rack_number] order by [ESL_number]`
    );

    var listRawData = [];
    listRawData.push(result[0]);

    res.json({
      result: result[0],
      listRawData,
      api_result: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});

// Endpoint to handle data insertion
router.post("/insert-data", async (req, res) => {
  const {
    ESL_number,
    Part_number,
    Model,
    Part_name,
    Vendor,
    Mold,
    Rack_number,
    Updater,
    Timestamp,
    Number_limit,
  } = req.body;
  console.log(Number_limit);
  // Check if mandatory fields are missing
  if (
    !ESL_number ||
    !Part_number ||
    !Model ||
    !Part_name ||
    !Vendor ||
    !Mold ||
    !Rack_number ||
    !Updater ||
    !Timestamp ||
    !Number_limit
  ) {
    console.error("Missing required fields");
    return res.status(400).send("Missing required fields");
  }

  // Construct the SQL query with placeholders
  const querydata = `
    INSERT INTO [Control_part].[dbo].[Matching_rack_number]
    ([ESL_number], [Part_number], [Model], [Part_name], [Vendor], [Mold], [Rack_number], [Updater], [Timestamp],[Number])
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  try {
    // Assuming 'user' is your Sequelize model
    const result = await user.sequelize.query(querydata, {
      replacements: [
        ESL_number,
        Part_number,
        Model,
        Part_name,
        Vendor,
        Mold,
        Rack_number,
        Updater,
        Timestamp,
        Number_limit,
      ],
    });
    console.log("Insert result:", result);
    // Send success response
    res.send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error); // Log the detailed error
    // Return a 500 status with the error message
    res.status(500).send("Error inserting data: " + error.message);
  }
});

router.delete("/delete-data/:ID", async (req, res) => {
  const { ID } = req.params;
  console.log(ID);
  // Construct the SQL query to delete the record

  try {
    const result = await user.sequelize.query(
      `DELETE FROM [Control_part].[dbo].[Matching_rack_number] WHERE ID = '${ID}'`
    ); // Adjust according to your database library
    res.send("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Error deleting data");
  }
});

router.patch("/esl_addItem", async (req, res) => {
  try {
    console.log("Start");
    // get data and inset to data
    const { itemId, itemName, properties } = req.body; // Destructure the incoming payload
    // Create or modify itemDetails based on the incoming data
    const itemDetails = {
      itemId: itemId || "DefaultID", // Use incoming itemId or default value
      properties: {
        itemName: itemName || "DefaultName", // Use incoming itemName or default value
        MO_DL: properties?.MO_DL || "DEFAULT_MO_DL", // Use incoming or default value
        Part: properties?.Part || "DEFAULT_Part", // Use incoming or default value
        MO1: properties?.MO1 || "DEFAULT_MO1", // Use incoming or default value
        QTY: properties?.QTY || "DEFAULT_MO_DL", // Use incoming or default value
        // Add more properties as needed
      },
    };
    console.log(itemDetails);

    // const result_addItem = await axios.patch(
    //   "http://192.168.101.119:3333/api/public/core/v1/items",
    //   itemDetails,
    //   {
    //     headers: { "Content-Type": "application/json" },
    //     auth: {
    //       username: process.env.API_USERNAME || "config",
    //       password: process.env.API_PASSWORD || "config",
    //     },
    //   }
    // );

    console.log(result_addItem.data);
    res.json({
      // result_addItem: result_addItem.data,
      api_result: constants.OK,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(error.response ? error.response.status : 500).json({
      error: error.message || "An error occurred",
      api_result: constants.NOK,
    });
  }
});

module.exports = router;
