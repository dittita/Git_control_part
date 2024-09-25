const express = require("express");
const bodyParser = require("body-parser"); //add
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const { log } = require("console");

app.use(cors());

// const corsOptions = {
//   origin: 'http://10.120.122.28:2017', 
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(bodyParser.json()); //add
app.use(bodyParser.urlencoded({ extended: false })); //add
app.get("/", (req, res) => {
  res.json({ result: "hello", test: 1 });
});
app.get("/api/test", (req, res) => {
  res.json({ result: "hello", test: 1 });
});
//app.get คือ http method /api/test จะเป็น path ที่นำไปหน้าเว็บ ใช้ของตัวเองได้เลย


// app.use("/api/mainplan", require("./api/api_Mainplan"));



app.use("/api/component_part", require("./api/api_control_part"));
app.use("/api/master", require("./api/api_master"));

//NAS
const Url = "192.168.101.13";
// const MailUrl = "192.168.101.120"


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, `\\\\${Url}\\Public\\Datacleanliness`);  // Update the destination path
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});



// Serve files statically
app.use('/cleanliness-files', express.static(`\\\\${Url}\\Public\\Datacleanliness`));


app.listen(2011, () => {
  console.log("Backend is running...");
});