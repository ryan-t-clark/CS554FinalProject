const express = require('express');
const router = express.Router();
const validation = require('../validation');
const xss = require('xss');

const data = require('../data');
const PICKS = data.picks;

router.post('/submit', async (req, res) => {

    let {week, userId, picks} = req.body;

    week = xss(week);
    userId = xss(userId);

    try {
        validation.checkWeek(week);
        validation.checkId(userId);
        validation.isValidPicksParameter(picks);
    } catch (e) {
        return res.status(400).json({error: e});
    }

    try {
        const submitInfo = await PICKS.submitPicks(week, userId, picks);

        if (submitInfo.submitted) {
            return res.status(200).json({status: 'picks inserted'});
        } else {
            return res.status(500).json({status: 'failed to submit picks'});
        }
    } catch (e) {
        return res.status(500).json(e);
    }

});


router.get('/user/pickarray/:week/:id', async (req, res) => {
    let week = req.params.week;
    let id = req.params.id;

    week = xss(week);
    id = xss(id);
    
    try {
        validation.checkId(id);
        validation.checkWeek(week);
    } catch (e) {
        return res.status(400).json({error: e});
    }

    try {
        let result = await PICKS.getWeekPickArraysById(week, id);
        return res.json(result);
    } catch (e) {
        return res.status(404).json({error: e});
    }

});


router.get('/user/:week/:id', async (req, res) => {
    let week = req.params.week;
    let id = req.params.id;

    week = xss(week);
    id = xss(id);
    
    try {
        validation.checkId(id);
        validation.checkWeek(week);
    } catch (e) {
        return res.status(400).json({error: e});
    }

    try {
        let result = await PICKS.getWeekPicksById(week, id);
        return res.json(result);
    } catch (e) {
        return res.status(404).json({error: e});
    }

});


router.get('/all/pickarray/:week', async (req, res) => {

    let week = req.params.week;

    week = xss(week);

    try {
        validation.checkWeek(week);
    } catch (e) {
        res.status(400).json(e);
    }

    try {
        let result = await PICKS.getAllPickArraysByWeek(week);
        return res.json(result);
    } catch (e) {
        return res.status(404).json(e);
    }

});


router.get('/all/:week', async (req, res) => {

    let week = req.params.week;

    week = xss(week);

    try {
        validation.checkWeek(week);
    } catch (e) {
        res.status(400).json(e);
    }

    try {
        let result = await PICKS.getAllPicksByWeek(week);
        return res.json(result);
    } catch (e) {
        return res.status(404).json(e);
    }

});


module.exports = router;