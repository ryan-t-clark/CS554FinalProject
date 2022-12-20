const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const validation = require('../validation');
const data = require('../data');
const ADMIN = data.admin;
client.connect().then(() => {});


router.post("/changeWeek/:week",async (req,res) => {
    let week = req.params.week;
    try {
        validation.checkWeek(week);
    } catch (e) {
        res.status(400).json(e);
    }
    
    try{
        let result = await ADMIN.changeWeek(Number(week));

        // flush cache so new week is put into the cache upon next call to the /getweek route
        client.flushAll();

        return res.json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

router.get("/getWeek", async (req,res) => {
    try{
        let result = await ADMIN.getWeek();
        return res.json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

module.exports = router;