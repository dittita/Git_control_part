const express = require("express");
const router = express.Router(); 

router.get("/test", (req, res) => {
  res.json({ result: "ok" });
});

module.exports = router;



router.post('/study' , (req,res) => {
    const {hour, pay} = req.body
    // const hour = req.body.hour
    // const pay = req.boday.pay
    var total = hour * 350
    var change = pay - total
    res.json({total, change})
})

router.get('/study/:hour&:pay', (req, res) => {
    const { hour, pay } = req.params
    res.json({hour, pay}) 
})