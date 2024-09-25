//Update 2024/08/06
const express = require("express");
const router = express.Router();
const user = require("../database/models/user");  //10
const user1 = require("../database/models/user_216"); //9


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
router.get("/test", async (req, res) => {
  try {
    const { startDate, finishDate } = req.params;
    let result = await user2.sequelize.query(
      `SELECT 
      \`Equipment no.\`,
      Equipment,
      \`Production line\`,
      TRIM(SUBSTRING_INDEX(\`Technician comment\`, ']', -1))  as \`Action(Adj)\`,
      Created as \`Request time\`,
      Started as \`Start time(Adj)\`,
      Closed as \`Finished time(Adj)\`,
      Author,
      \`Work type\`,
      Request,
      Editor as \`Worker\`,
      Reason,
      Solution,
      Component,
      Priority,
      \`Request description\` as \`Cause details\`,
      \`Equipment type\`,
      Editor as \`Worker\`,
      Request,
      TRIM(REGEXP_REPLACE(\`Cost Center\`, '^[0-9]+\\.\\s*', ''))  as \`Process\`
   FROM mp_minebea_thai_2.view_requests_all 
   WHERE DATE(Created) = '2024-06-11' 
     AND \`Cost Center\` = '2. Clean room_(AOI)' 
   ORDER BY Created DESC`,);

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

router.get("/daily/:startDate/:finishDate/:line", async (req, res) => {
  try {
    const { startDate, finishDate,line} = req.params;
    const resultGraph = await user1.sequelize.query(
      `SELECT [Date],ISNULL([Diverter catch miss], 0 ) as [Diverter_catch_miss], 
      ISNULL([Crash stop catch miss], 0 ) as [Crash_stop_catch_miss], ISNULL([Ramp catch miss], 0 ) as [Ramp_catch_miss] 
      FROM  (SELECT   [Date], [Component], [Counter]  FROM   [PE_maintenance].[dbo].[Missing_components] 
        WHERE  [Date] BETWEEN '${startDate}' AND '${finishDate}'  AND [Line] = '${line}') AS SourceTable 
        PIVOT ( SUM([Counter])  FOR [Component] IN ([Diverter catch miss], [Crash stop catch miss], 
          [Ramp catch miss])) AS PivotTable ORDER BY  [Date];
      `);
    console.log(resultGraph)  
    const result = resultGraph;
      // แกน  y
    let Diverter_catch_miss = [];
    let Crash_stop_catch_miss = [];
    let Ramp_catch_miss=[];
    let Date = []; 
 

    resultGraph[0].forEach( (item) => {
      Diverter_catch_miss.push(item.Diverter_catch_miss);
      Crash_stop_catch_miss.push(item.Crash_stop_catch_miss);
      Ramp_catch_miss.push(item.Ramp_catch_miss);
      Date.push(item.Date);
 
    });
      // console.log(LAR);
      console.log(resultGraph[0]);
      console.log(Diverter_catch_miss);
      console.log(Crash_stop_catch_miss);
      console.log(Ramp_catch_miss);
      console.log(Date);
      

    var listRawData = [];
    listRawData.push(result[0]);
    res.json({
      
      resultGraph: resultGraph[0],
      result:result[0],
      listRawData,
      Diverter_catch_miss,
      Crash_stop_catch_miss,
      Ramp_catch_miss,
      Date,
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
router.get("/component/:line", async (req, res) => {
  try {
    const { line }  = req.params;
    let result = await user1.sequelize.query(
      `
      Select distinct [Component]  FROM [PE_maintenance].[dbo].[Missing_components] where Line  = '${line}'`);

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

// //Select line
router.get("/line", async (req, res) => {
  try {
    // const { process }  = req.params;
    let result = await user1.sequelize.query(
      ` Select distinct Line FROM [PE_maintenance].[dbo].[Missing_components]`);

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
