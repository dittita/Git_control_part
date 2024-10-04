//Update 2024/08/06
const express = require("express");
const router = express.Router();
const user = require("../database/models/user"); //10
const axios = require("axios");
const constants = require("./constants"); // Adjust the path if necessary

router.get("/Data_racknumber", async (req, res) => {
  try {

    let result = await user.sequelize.query(
      `SELECT  [ESL_number],[Part_number],[Model] ,[Part_name] ,[Vendor] ,[Mold] ,[Mo_number] ,[IQC_number] ,[Rack_number],[Number] ,[QTY],[Updater] ,[Status],[Timestamp],[ID] FROM [Control_part].[dbo].[Matching_rack_number] order by [Model],[Part_name]`
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


//Find check_duplicate receive
router.get("/check_duplicate/:model/:supplier/:part_name/:item_no/:mold/:MOnumber/:IQCnumber",
  async (req, res) => {
    try {
      const { model, supplier, part_name, item_no, mold, MOnumber, IQCnumber } =
        req.params;
      // Replace "-" with "/" in the model parameter
      const sanitizedModel = model.replace(/-/g, "/");

      // let sanitizedMold = mold === "Mix mold" ? "" : mold;

      let result = await user.sequelize.query(
        `SELECT [Model],[Status] FROM [Control_part].[dbo].[Received_Part] where  [Model] = '${model}' and [Part_name] = '${part_name}' and [Item_no] = '${item_no}' and [Supplier] = '${supplier}' and [MO_number]= '${MOnumber}' and [IQC_lot]= '${IQCnumber}'  `
      );
      // console.log(result);
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
  }
);

//Select request component_data
router.get("/component_data/:monumber/:IQC_number/:Part_name/:Item_no",
  async (req, res) => {
    try {
      const { monumber, IQC_number, Part_name, Item_no } = req.params;
      let result = await user.sequelize.query(
        `SELECT [Model],[Part_name] ,[Item_no] ,[Supplier]  ,[MO_number] ,[IQC_lot] ,[QTY] ,[Mold],[DateTime_KutupF4]  FROM [Control_part].[dbo].[Issue_part_KitupF4] where MO_number ='${monumber}' and [IQC_lot] = '${IQC_number}' and [Part_name] = '${Part_name}' and [Item_no] = '${Item_no}'`
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
  }
);

//Select check
router.get("/label_tray/:model/:supplier/:part_name/:item_no/:mold/:labeltray",
  async (req, res) => {
    try {
      const { model, supplier, part_name, item_no, mold, labeltray } =
        req.params;
      // Replace "-" with "/" in the model parameter
      const sanitizedModel = model.replace(/-/g, "/");

      let sanitizedMold = mold === "Mix mold" ? "" : mold;

      let dara = `SELECT [Model],[Qty_per_pack],[Qty_per_bundle] FROM [Control_part].[dbo].[Master_finalPart] where [Model] = '${sanitizedModel}' and [Supplier] ='${supplier}' and [Part_name] = '${part_name}' and [Part_number_Seagate] = '${labeltray}' and [Part_number_NMB] ='${item_no}'`;
      console.log(dara);

      let result = await user.sequelize.query(
        `SELECT [Model],[Qty_per_pack],[Qty_per_bundle] FROM [Control_part].[dbo].[Master_finalPart] where [Model] = '${sanitizedModel}' and [Supplier] ='${supplier}' and [Part_name] = '${part_name}' and [Part_number_Seagate] = '${labeltray}' and [Part_number_NMB] ='${item_no}'`
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
  }
);

//Select check
router.get("/label_tray_QTY/:model/:supplier/:part_name/:item_no/:mold",
  async (req, res) => {
    try {
      const { model, supplier, part_name, mold } =
        req.params;
      // Replace "-" with "/" in the model parameter
      const sanitizedModel = model.replace(/-/g, "/");

      let sanitizedMold = mold === "Mix mold" ? "" : mold;

      // let data = `SELECT [Model],[Qty_per_pack],[Qty_per_bundle] FROM [Control_part].[dbo].[Master_finalPart] where [Model] = '${sanitizedModel}' and [Supplier] ='${supplier}' and [Part_name] = '${part_name}' and [Part_number_Seagate] = '${labeltray}' and [Part_number_NMB] ='${item_no}'`;
      // console.log(data);

      let result = await user.sequelize.query(
        `SELECT [Model],[Qty_per_pack],[Qty_per_bundle] FROM [Control_part].[dbo].[Master_finalPart] where [Model] = '${sanitizedModel}' and [Supplier] ='${supplier}' and [Part_name] = '${part_name}' and Mold = '${sanitizedMold}'`
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
  }
);


//Find rack number emtry
router.get("/rack_number/Clear_rack", async (req, res) => {
  try {
    // Now, perform the UPDATE to set the Status to 'used' (or any other value)
    await user.sequelize.query(
      `UPDATE [Control_part].[dbo].[Matching_rack_number] SET [Status] = null  WHERE [Status] = 'Wait'`
    );

    res.json({
      // result: result[0],
      // listRawData,
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
//Find rack number emtry
router.get("/rack_number/:model/:supplier/:part_name/:item_no/:mold",
  async (req, res) => {
    try {
      const { model, supplier, part_name, item_no, mold } = req.params;
      // Replace "-" with "/" in the model parameter
      const sanitizedModel = model.replace(/-/g, "/");

      // let sanitizedMold = mold === "Mix mold" ? "" : mold;

      let result = await user.sequelize.query(
        `SELECT TOP(1) [ESL_number],[Rack_number],[Number],[Model],[Vendor],[Part_name],[Part_number],[Mold] FROM [Control_part].[dbo].[Matching_rack_number]  where [Model] = '${sanitizedModel}' and [Vendor] ='${supplier}' and [Part_name] = '${part_name}'  and [Part_number] ='${item_no}' and [Mold] = '${mold}' and [Status] is null order by [ID] `
      );

      var listRawData = [];
      listRawData.push(result[0]);
      // If a result is found, extract the required info
      const record = result[0][0];
      const rackNumber = record.Rack_number;
      const ESL_number = record.ESL_number;
      const Number = record.Number;
      const Model = record.Model;
      const Vendor = record.Vendor;
      const Part_name = record.Part_name;
      const Part_number = record.Part_number;
      const Mold = record.Mold;
      // Now, perform the UPDATE to set the Status to 'used' (or any other value)
      await user.sequelize.query(
        `UPDATE [Control_part].[dbo].[Matching_rack_number] SET [Status] = 'Wait'  WHERE [Rack_number] = '${rackNumber}' 
   AND [Number] = '${Number}'
    AND [Model] = '${Model}' 
    AND [Vendor] = '${Vendor}' 
    AND [Part_name] = '${Part_name}' 
    AND [Part_number] = '${Part_number}' 
    AND [Mold] = '${Mold}' 
    AND [Status] IS NULL`
      );

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
  }
);


router.patch("/esl_addItem", async (req, res) => {
  try {
    const { itemId, properties } = req.body;

    let result = await user.sequelize.query(
      `SELECT [ESL_number],[Part_number],[Model],[Part_name],[Vendor],[Mold],[Rack_number],COALESCE(SUM([QTY]),0)  as [QTY] FROM [Control_part].[dbo].[Matching_rack_number] where [Rack_number] = '${itemId}' group by [ESL_number],[Part_number],[Model],[Part_name],[Vendor],[Mold],[Rack_number]`
    );
    const record = result[0][0];
    console.log("result" +result[0][0]);
    // Ensure properties.QTY and record.QTY are converted to integers
    const qtyFromProperties = parseInt(properties.QTY, 10) || 0; // Convert to integer, default to 0 if NaN
    const qtyFromRecord = parseInt(record.QTY, 10) || 0; // Convert to integer, default to 0 if NaN
    console.log(properties);
    // Calculate totalQTY as an integer
    const totalQTY = qtyFromProperties + qtyFromRecord;
    const MO1_txt = properties.MO1 || "";
    const MO2_txt = properties.MO2 || "";
    const MO3_txt = properties.MO3 || "";
    const MOnumber = [MO1_txt, MO2_txt, MO3_txt].filter(Boolean).join("-");
    const number_txt = properties.Number || "";
    const iqcNumber = properties.iqcNumber || "";
    const Model = record.Model || "";
    const vendor = properties.vendor || "";
    const partname = properties.Part || "";
    const itemDetails = {
      itemId: itemId,
      properties: {
        MO_DL: properties.MO_DL,
        Part: properties.Part,
        vendor:properties.vendor,
        ["MO" + number_txt]: MOnumber,
        QTY: totalQTY,
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
// console.log("vendor"+vendor);
// console.log("Model"+Model);
// console.log("partname"+ partname);
    //Update status rack
    await user.sequelize.query(
      `Update [Control_part].[dbo].[Matching_rack_number]  set [Status] = 'Successful' , [Mo_number] = '${MOnumber}',[IQC_number] = '${iqcNumber}',[QTY] = '${totalQTY}' where [Rack_number] = '${itemId}' and [Status] = 'Wait' and Number = '${number_txt}'`
    );
    //Update status rack
    let result4  = await user.sequelize.query(
      `Update [Control_part].[dbo].[Received_Part] SET [Status] = 'Kitup_F4' where [Status] IS NULL  and [Part_name]  = '${partname}' and [Supplier] = '${vendor}' and [Model] = '${Model}' and [MO_number]  = '${MOnumber}' and [IQC_lot] = '${iqcNumber}'`
    );
    console.log(result4);
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
