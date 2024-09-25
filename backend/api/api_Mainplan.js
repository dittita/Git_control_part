//Update 2024/08/06
const express = require("express");
const router = express.Router();
const user = require("../database/models/user");  //10
const user1 = require("../database/models/user_216"); //9
const user2 = require('../database/icx_connection_mysql'); // Adjust the path as needed

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

router.get("/process_mainplan", async (req, res) => {
  try {

    let result = await user2.query(
      `SELECT 
      distinct \`Cost Center\`
   FROM mp_minebea_thai_2.view_requests_all 
   ORDER BY \`Cost Center\` `,);

    var listRawData2 = [];
    listRawData2.push(result[0]);

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
router.get("/daily/:startDate/:finishDate", async (req, res) => {
  try {
    const { startDate, finishDate } = req.params;
    let result = await user1.sequelize.query(
      `exec [PE_maintenance].[dbo].[Downtime_daily]  '${startDate}', '${finishDate}'`);

    var listRawData2 = [];
    listRawData2.push(result[0]);

    res.json({
      result: result[0],
      listRawData2,
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
router.get("/all_report/:startDate/:finishDate/:process_pe/:line", async (req, res) => {
  try {
    let { startDate, finishDate, process_pe, line } = req.params;
    if (line === 'undefined') {
      line = '';
    }
    let result = await user2.query(
      `SELECT 
      DATE_FORMAT(Created, '%Y-%m-%d') as \`Date\`,
      \`Equipment no.\`,
      Equipment,
      TRIM(SUBSTRING_INDEX(\`Production line\`, '_', 1))  as \`Line\`, TRIM(SUBSTRING_INDEX(\`Production line\`, '_', -1)) as \`Model\`,
      TRIM(SUBSTRING_INDEX(\`Technician comment\`, ']', -1))  as \`Action(Adj)\`,
      DATE_FORMAT(Created, '%H:%i') as \`Request time\`,
      DATE_FORMAT(Started, '%H:%i') as \`Start time(Adj)\`,
      DATE_FORMAT(Closed, '%H:%i') as \`Finished time(Adj)\`,
      DATE_FORMAT(TIMEDIFF(DATE_FORMAT(Started, '%Y-%m-%d %H:%i'), DATE_FORMAT(Created, '%Y-%m-%d %H:%i')), '%H:%i') AS \`Total delay\`,
      DATE_FORMAT(TIMEDIFF(DATE_FORMAT(Closed, '%Y-%m-%d %H:%i'), DATE_FORMAT(Started, '%Y-%m-%d %H:%i')), '%H:%i') AS \`Total downtime\`,
      DATE_FORMAT(TIMEDIFF(DATE_FORMAT(Closed, '%Y-%m-%d %H:%i'), DATE_FORMAT( Created, '%Y-%m-%d %H:%i')), '%H:%i') AS \`Total time\`,
      Author,
      \`Work type\`,
      Request,
      Editor as \`Worker\`,
      Priority,
      \`Request description\` as \`Cause details\`,
      \`Equipment type\`,
      Editor as \`Worker\`,
      Request,
      TRIM(REGEXP_REPLACE(\`Cost Center\`, '^[0-9]+\\.\\s*', ''))  as \`Process\`
   FROM mp_minebea_thai_2.view_requests_all 
   WHERE Created between '${startDate} 07:00' and '${finishDate} 06:59'
     AND \`Cost Center\` like '%${process_pe}%'
     AND 
      (
        '${line}' IS NULL OR -- Check if Line parameter is NULL
        '${line}' = '' OR -- Check if Line parameter is empty
        TRIM(SUBSTRING_INDEX(\`Production line\`, '_', 1))  = '${line}' -- Check if Line parameter matches the Line column
    )
   ORDER BY \`Equipment no.\` `,);

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
router.get("/daily/:startDate/:finishDate/:process_pe/:line", async (req, res) => {
  try {
    let { startDate, finishDate, process_pe, line } = req.params;

    // Convert 'undefined' string to empty string
    if (line === 'undefined') {
      line = '';
    }

    let result = await user1.sequelize.query(
      `exec  [PE_maintenance].[dbo].[Downtime_daily]  '${startDate}', '${finishDate}','${process_pe}','${line}'`);

    var listRawData2 = [];
    listRawData2.push(result[0]);

    res.json({
      result: result[0],
      listRawData2,
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
router.get("/Monthly/:monthnumber/:yearnumber/:process_pe/", async (req, res) => {
  try {
    const { monthnumber, yearnumber,process_pe} = req.params;
    const resultGraph = await user1.sequelize.query(
      `exec [PE_maintenance].[dbo].[Downtime_graph_daily_test]  '${monthnumber}', '${yearnumber}','${process_pe}'`);
    console.log(resultGraph)  
    const result = resultGraph;
      // แกน  y
    let Downtime = [];
    let Delay_Time = [];
    let Day_txt=[];
    let Total=[];

    resultGraph[0].forEach( (item) => {
      Downtime.push(item.Downtime);
      Delay_Time.push(item.Delay_Time);
      Day_txt.push(item.Day_txt);
      Total.push(item.Total);
    });
      // console.log(LAR);
      console.log(resultGraph[0]);
      console.log(Downtime);
      console.log(Delay_Time);
      console.log(Day_txt);
    
      

    var listRawData = [];
    listRawData.push(result[0]);
    res.json({
      
      resultGraph: resultGraph[0],
      result:result[0],
      listRawData,
      Downtime,
      Delay_Time,
      Day_txt,
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
//Select process PE 
router.get("/process", async (req, res) => {
  try {
    const { startDate, finishDate } = req.params;
    let result = await user1.sequelize.query(
      `SELECT distinct [Cost_cente] as 'Process' FROM [PE_maintenance].[dbo].[MaintPlan_Downtime] order by [Cost_cente] DESC`);

    var listRawData2 = [];
    listRawData2.push(result[0]);

    res.json({
      result: result[0],
      listRawData2,
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
//Select line
router.get("/line/:process/", async (req, res) => {
  try {
    const { process }  = req.params;
    let result = await user1.sequelize.query(
      `SELECT distinct [Line] FROM [PE_maintenance].[dbo].[MaintPlan_Downtime] where [Cost_cente] = '${process}' order by [Line] ASC`);

    var listRawData2 = [];
    listRawData2.push(result[0]);

    res.json({
      result: result[0],
      listRawData2,
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
//Select request type
router.get("/request_type", async (req, res) => {
  try {

    let result = await user2.query(
      `SELECT distinct TRIM(SUBSTRING_INDEX(Request, '-', 1)) AS Request FROM mp_minebea_thai_2.view_requests_all order by Request ASC`);

    var listRawData2 = [];
    listRawData2.push(result[0]);

    res.json({
      result: result[0],
      listRawData2,
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

module.exports = router;
