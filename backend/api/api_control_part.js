//Update 2024/08/06
const express = require("express");
const router = express.Router();
const user = require("../database/models/user"); //10
const axios = require('axios');
const constants = require('./constants'); // Adjust the path if necessary

router.get("/loacation", async (req, res) => {
  try {
    let result = await user.sequelize.query(`select distinct [Model_group]
    FROM [QAInspection].[dbo].[tbVisualInspection]
  where [Model_group] is not null
  and [Model_group]!='' and [Model_group]!='All'
  union
  select '**ALL**'
    order by [Model_group]`);
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

// router.get("/process_mainplan", async (req, res) => {
//   try {

//     let result = await user2.query(
//       `SELECT
//       distinct \`Cost Center\`
//    FROM mp_minebea_thai_2.view_requests_all
//    ORDER BY \`Cost Center\` `,);

//     var listRawData2 = [];
//     listRawData2.push(result[0]);

//     res.json({
//       result: result[0],
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });
// router.get("/daily/:startDate/:finishDate", async (req, res) => {
//   try {
//     const { startDate, finishDate } = req.params;
//     let result = await user1.sequelize.query(
//       `exec [PE_maintenance].[dbo].[Downtime_daily]  '${startDate}', '${finishDate}'`);

//     var listRawData2 = [];
//     listRawData2.push(result[0]);

//     res.json({
//       result: result[0],
//       listRawData2,
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });
// router.get("/all_report/:startDate/:finishDate/:process_pe/:line", async (req, res) => {
//   try {
//     let { startDate, finishDate, process_pe, line } = req.params;
//     if (line === 'undefined') {
//       line = '';
//     }
//     let result = await user2.query(
//       `SELECT
//       DATE_FORMAT(Created, '%Y-%m-%d') as \`Date\`,
//       \`Equipment no.\`,
//       Equipment,
//       TRIM(SUBSTRING_INDEX(\`Production line\`, '_', 1))  as \`Line\`, TRIM(SUBSTRING_INDEX(\`Production line\`, '_', -1)) as \`Model\`,
//       TRIM(SUBSTRING_INDEX(\`Technician comment\`, ']', -1))  as \`Action(Adj)\`,
//       DATE_FORMAT(Created, '%H:%i') as \`Request time\`,
//       DATE_FORMAT(Started, '%H:%i') as \`Start time(Adj)\`,
//       DATE_FORMAT(Closed, '%H:%i') as \`Finished time(Adj)\`,
//       DATE_FORMAT(TIMEDIFF(DATE_FORMAT(Started, '%Y-%m-%d %H:%i'), DATE_FORMAT(Created, '%Y-%m-%d %H:%i')), '%H:%i') AS \`Total delay\`,
//       DATE_FORMAT(TIMEDIFF(DATE_FORMAT(Closed, '%Y-%m-%d %H:%i'), DATE_FORMAT(Started, '%Y-%m-%d %H:%i')), '%H:%i') AS \`Total downtime\`,
//       DATE_FORMAT(TIMEDIFF(DATE_FORMAT(Closed, '%Y-%m-%d %H:%i'), DATE_FORMAT( Created, '%Y-%m-%d %H:%i')), '%H:%i') AS \`Total time\`,
//       Author,
//       \`Work type\`,
//       Request,
//       Editor as \`Worker\`,
//       Priority,
//       \`Request description\` as \`Cause details\`,
//       \`Equipment type\`,
//       Editor as \`Worker\`,
//       Request,
//       TRIM(REGEXP_REPLACE(\`Cost Center\`, '^[0-9]+\\.\\s*', ''))  as \`Process\`
//    FROM mp_minebea_thai_2.view_requests_all
//    WHERE Created between '${startDate} 07:00' and '${finishDate} 06:59'
//      AND \`Cost Center\` like '%${process_pe}%'
//      AND
//       (
//         '${line}' IS NULL OR -- Check if Line parameter is NULL
//         '${line}' = '' OR -- Check if Line parameter is empty
//         TRIM(SUBSTRING_INDEX(\`Production line\`, '_', 1))  = '${line}' -- Check if Line parameter matches the Line column
//     )
//    ORDER BY \`Equipment no.\` `,);

//     var listRawData = [];
//     listRawData.push(result[0]);

//     res.json({
//       result: result[0],
//       listRawData,
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });
// router.get("/daily/:startDate/:finishDate/:process_pe/:line", async (req, res) => {
//   try {
//     let { startDate, finishDate, process_pe, line } = req.params;

//     // Convert 'undefined' string to empty string
//     if (line === 'undefined') {
//       line = '';
//     }

//     let result = await user1.sequelize.query(
//       `exec  [PE_maintenance].[dbo].[Downtime_daily]  '${startDate}', '${finishDate}','${process_pe}','${line}'`);

//     var listRawData2 = [];
//     listRawData2.push(result[0]);

//     res.json({
//       result: result[0],
//       listRawData2,
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });
// router.get("/Monthly/:monthnumber/:yearnumber/:process_pe/", async (req, res) => {
//   try {
//     const { monthnumber, yearnumber,process_pe} = req.params;
//     const resultGraph = await user1.sequelize.query(
//       `exec [PE_maintenance].[dbo].[Downtime_graph_daily_test]  '${monthnumber}', '${yearnumber}','${process_pe}'`);
//     console.log(resultGraph)
//     const result = resultGraph;
//       // แกน  y
//     let Downtime = [];
//     let Delay_Time = [];
//     let Day_txt=[];
//     let Total=[];

//     resultGraph[0].forEach( (item) => {
//       Downtime.push(item.Downtime);
//       Delay_Time.push(item.Delay_Time);
//       Day_txt.push(item.Day_txt);
//       Total.push(item.Total);
//     });
//       // console.log(LAR);
//       console.log(resultGraph[0]);
//       console.log(Downtime);
//       console.log(Delay_Time);
//       console.log(Day_txt);

//     var listRawData = [];
//     listRawData.push(result[0]);
//     res.json({

//       resultGraph: resultGraph[0],
//       result:result[0],
//       listRawData,
//       Downtime,
//       Delay_Time,
//       Day_txt,
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });
// //Select process PE
// router.get("/process", async (req, res) => {
//   try {
//     const { startDate, finishDate } = req.params;
//     let result = await user1.sequelize.query(
//       `SELECT distinct [Cost_cente] as 'Process' FROM [PE_maintenance].[dbo].[MaintPlan_Downtime] order by [Cost_cente] DESC`);

//     var listRawData2 = [];
//     listRawData2.push(result[0]);

//     res.json({
//       result: result[0],
//       listRawData2,
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });
// //Select line
// router.get("/line/:process/", async (req, res) => {
//   try {
//     const { process }  = req.params;
//     let result = await user1.sequelize.query(
//       `SELECT distinct [Line] FROM [PE_maintenance].[dbo].[MaintPlan_Downtime] where [Cost_cente] = '${process}' order by [Line] ASC`);

//     var listRawData2 = [];
//     listRawData2.push(result[0]);

//     res.json({
//       result: result[0],
//       listRawData2,
//       api_result: "ok",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error,
//       api_result: "nok",
//     });
//   }
// });

//Select request component_data
router.get("/component_data/:monumber/:IQC_number/:Part_name/:Item_no",
  async (req, res) => {
    try {
      const { monumber, IQC_number, Part_name, Item_no } = req.params;
      let result = await user.sequelize.query(
        `SELECT [Model],[Part_name] ,[Item_no] ,[Supplier]  ,[MO_number] ,[IQC_lot] ,[QTY] ,[Mold],[DateTime_KutupF4] FROM [Control_part].[dbo].[Issue_part_KitupF4] where MO_number ='${monumber}' and [IQC_lot] = '${IQC_number}' and [Part_name] = '${Part_name}' and [Item_no] = '${Item_no}'`
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
      const { model, supplier, part_name, item_no, mold, labeltray } =  req.params;
      // Replace "-" with "/" in the model parameter
      const sanitizedModel = model.replace(/-/g, "/");

      let sanitizedMold = mold === "Mix mold" ? "" : mold;

      let dara = `SELECT [Model],[Qty_per_pack],[Qty_per_bundle] FROM [Control_part].[dbo].[Master_finalPart] where [Model] = '${sanitizedModel}' and [Supplier] ='${supplier}' and [Part_name] = '${part_name}' and [Part_number_Seagate] = '${labeltray}' and [Part_number_NMB] ='${item_no}'`
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

//Find rack number emtry
router.get("/rack_number/:model/:supplier/:part_name/:item_no/:mold",
  async (req, res) => {
    try {
      const { model, supplier, part_name, item_no, mold } =  req.params;
      // Replace "-" with "/" in the model parameter
      const sanitizedModel = model.replace(/-/g, "/");

      // let sanitizedMold = mold === "Mix mold" ? "" : mold;
      
      
      let result = await user.sequelize.query(
        `SELECT TOP(1) [ESL_number],[Rack_number] FROM [Control_part].[dbo].[Matching_rack_number]  where [Model] = '${sanitizedModel}' and [Vendor] ='${supplier}' and [Part_name] = '${part_name}'  and [Part_number] ='${item_no}' and [Mold] = '${mold}' and [Status] is null order by [ID] `
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
router.patch("/esl_addItem", async (req, res) => {
  try {
    
    const {itemId,properties} = req.body;

    const itemDetails = {
      itemId: itemId,
      properties: {
        MO_DL:properties.MO_DL,
        Part: properties.Part,
        MO1: properties.MO1,
        // MO2: "LSP002",
        // MO3: "XXXXXXx",
        // MO4: "EVG004",
        QTY: properties.QTY,
        // MO5: "EVG005"
      }
    };
    console.log(itemDetails);
    
    const result_addItem = await axios.patch(
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

    console.log(result_addItem.data);
    res.json({
      result_addItem: result_addItem.data,
      api_result: constants.OK
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(error.response ? error.response.status : 500).json({
      error: error.message || 'An error occurred',
      api_result: constants.NOK
    });
  }
});
// router.patch("/esl_addItem", async (req, res) => {
//   try {
//     console.log("Start");
//     // get data and inset to data
    
//        // Create or modify itemDetails based on the incoming data
//        const itemDetails = {
//         itemId: "A1" || " ",  // Use incoming itemId or default value
//         properties: {
//           // itemName: itemName || "DefaultName",  // Use incoming itemName or default value
//           MO_DL: "DEFAULT_MO_DL",  // Use incoming or default value
//           Part: "DEFAULT_Part",  // Use incoming or default value
//           MO1: "DEFAULT_MO1",  // Use incoming or default value
//           QTY:"DEFAULT_MO_DL",  // Use incoming or default value
//           // Add more properties as needed
//         }
//       };
//     console.log(itemDetails);

    
//     let result_addItem = await axios.patch(
//       "http://192.168.101.119:3333/api/public/core/v1/items",
//       itemDetails,
//       {
//         headers: { "Content-Type": "application/json" },
//         auth: {
//           username: process.env.API_USERNAME || "config",
//           password: process.env.API_PASSWORD || "config"
//         }
//       }
//     );

//     console.log(result_addItem.data);
//     res.json({
//       result_addItem: result_addItem.data,
//       api_result: constants.OK
//     });
//   } catch (error) {
//     console.error('Error occurred:', error);
//     res.status(error.response ? error.response.status : 500).json({
//       error: error.message || 'An error occurred',
//       api_result: constants.NOK
//     });
//   }
// });




module.exports = router;
