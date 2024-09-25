//Update 2024/08/06
const express = require("express");
const router = express.Router();
const user = require("../database/models/user"); //10

router.get("/Model", async (req, res) => {
  try {
    let result = await user.sequelize.query(`SELECT  distinct [Model] FROM [Control_part].[dbo].[Master_finalPart] ORDER BY [Model] `);
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
    let result = await user.sequelize.query(`SELECT  distinct [Part_name] FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' ORDER BY [Part_name]  `);
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
    let { model,partname } = req.params;
    let result = await user.sequelize.query(`SELECT  distinct  [Part_number_NMB] FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' and  [Part_name]  = '${partname}' ORDER BY [Part_number_NMB] `);
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
    let { model,partname,partnumber } = req.params;
    let result = await user.sequelize.query(`SELECT  distinct  [Supplier] FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' and  [Part_name]  = '${partname}' and  [Part_number_NMB] = '${partnumber}' ORDER BY  [Supplier]`);
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
    let { model,partname,partnumber,vendor } = req.params;
    let result = await user.sequelize.query(`SELECT DISTINCT [Mold]  FROM [Control_part].[dbo].[Master_finalPart]  where Model = '${model}' and  [Part_name]  = '${partname}' and  [Part_number_NMB] = '${partnumber}' and [Supplier] = '${vendor}'  and Mold != '' UNION SELECT DISTINCT 'Mix mold' AS [Mold] `);
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
      `SELECT  [ESL_number],[Part_number],[Model],[Part_name],[Vendor],[Mold],[Mo_number] ,[IQC_number],[Rack_number] ,[Number],[QTY],[Updater] ,[Status],[ID] FROM [Control_part].[dbo].[Matching_rack_number] order by [Model],[Part_name]`);

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
router.post('/insert-data', async (req, res) => {
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
  if (!ESL_number || !Part_number || !Model || !Part_name || !Vendor || !Mold || !Rack_number || !Updater || !Timestamp || !Number_limit) {
    console.error("Missing required fields");
    return res.status(400).send('Missing required fields');
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
        Number_limit
      ]
    });
    console.log("Insert result:", result);
    // Send success response
    res.send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error); // Log the detailed error
    // Return a 500 status with the error message
    res.status(500).send('Error inserting data: ' + error.message);
  }
});

router.delete('/delete-data/:ID', async (req, res) => {
  const { ID } = req.params;
  console.log(ID);
  // Construct the SQL query to delete the record


  try {
    const result = await user.sequelize.query(`DELETE FROM [Control_part].[dbo].[Matching_rack_number] WHERE ID = '${ID}'`); // Adjust according to your database library
    res.send('Data deleted successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data');
  }
});





// router.get("/Model", async (req, res) => {
//   try {

//     let result = await user2.query(
//       `SELECT  distinct [Model]  [Control_part].[dbo].[Master_finalPart] ORDER BY [Model] `,);

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


router.patch("/esl_addItem", async (req, res) => {
  try {
    console.log("Start");
    // get data and inset to data
    const { itemId, itemName, properties } = req.body;  // Destructure the incoming payload
       // Create or modify itemDetails based on the incoming data
       const itemDetails = {
        itemId: itemId || "DefaultID",  // Use incoming itemId or default value
        properties: {
          itemName: itemName || "DefaultName",  // Use incoming itemName or default value
          MO_DL: properties?.MO_DL || "DEFAULT_MO_DL",  // Use incoming or default value
          Part: properties?.Part || "DEFAULT_Part",  // Use incoming or default value
          MO1: properties?.MO1 || "DEFAULT_MO1",  // Use incoming or default value
          QTY: properties?.QTY || "DEFAULT_MO_DL",  // Use incoming or default value
          // Add more properties as needed
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




module.exports = router;
