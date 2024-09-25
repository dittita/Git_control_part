const express = require("express");
const router = express.Router();
// const Db = require('./../select/dboperations');
router.get("/esl_Test", async (req, res) => {
    try {   
    var ItemId = "1";
    var ItemNo = "1";
    var ItemName ="1";
    var qty = "200";
      res.json([{ 
        itemId : ItemId,
        properties: {
            ITEM_NO: ItemNo,
            ITEM_NAME: ItemName,       
            QTY: qty

        }}]);
    } catch (error) {
        
    }
    
})
router.patch("/esl_addItem", async (req, res) => {
    try {
      const axios = require("axios");
      const fs = require("fs");
      const https = require("https");
      const http = require("http");
     
      
    //   var ItemId = req.body.ItemID;
    //   var ItemNo = req.body.ItemNo;
    //   var ItemName = req.body.ItemName;
    //   var Invoice = req.body.Invoice;
    //   var Location = req.body.Location;
    //   var Unit = req.body.Unit;
    //   var qty = req.body.Qty;
    //   var QR = req.body.QRCode;
    //   var IQCPassDate = req.body.IQCPassDate;

    var ItemId = "1";
    var ItemNo = "1";
    var ItemName ="1";
    var qty = "200";
  


      const json = ({
        itemId : ItemId,
      
        properties: {
            
            ITEM_NO: ItemNo,
            ITEM_NAME: ItemName,            
                
            QTY: qty
            // QRCODE: QR,
            // ITEMIPF: "N1",
            
        }
        })
  
      let result_addItem = await axios.patch(
        "http://192.168.101.166:3333/api/public/core/v1/items",
        json,
        {
          headers: { "Content-Type": "application/json" },
          auth: {username: "config", password: "config"},
        }
      );
  
      res.json({
        //result_addItem,
        result_addItem: result_addItem.data,
        api_result: constants.OK,
        
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
        api_result: constants.NOK,
        
      });
    }
  });

module.exports = router;