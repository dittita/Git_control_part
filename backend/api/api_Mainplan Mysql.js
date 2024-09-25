//Update 2024/08/06
const express = require("express");
const router = express.Router();

const user2 = require('../database/icx_connection_mysql'); // Adjust the path as needed



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
