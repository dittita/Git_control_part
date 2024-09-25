const express = require("express");
const router = express.Router();

const manpower_master = require('./../models/manpower_master')

router.get('/manpower/', async (req,res) =>{
    try {
        let result = await manpower_master.findOne({ where: { employee_number: 'abc123'} })
        res.json({ api_manpower: 'OK', result})
    } catch (error) {
        console.log(error);
        res.json({ api_manpower: 'NOK', error})
     }
})

router.post('/manpower/', async (req,res) =>{
    try {
        let result = await manpower_master.create(req.body)
        res.json({ api_manpower: 'OK', result })
    } catch (error) {
        console.log(error);
        res.json({ api_manpower: 'NOK', error})
    }
    
})

router.patch('/manpower/', async(req,res) =>{
    try {
        let result = await manpower_master.update(req.body, {where: { employee_number: req.body.employee_number}})
        res.json({ api_manpower: 'OK', result})
    } catch (error) {
        console.log(error);
        res.json({ api_manpower: 'NOK', error })
     }    
})

router.delete('/manpower/', async (req,res) =>{
    try {
        let result = await manpower_master.destroy({where: {employee_number: req.body.employee_number}})
        res.json({ api_manpower: 'OK', result})
    } catch (error) {
        console.log(error);
        res.json({ api_manpower: 'NOK', error })
     }    
})

module.exports = router ;