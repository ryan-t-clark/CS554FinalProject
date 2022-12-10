const express = require('express');
const router = express.Router();
const validation = require('../validation');

const data = require('../data');
const PICKS = data.picks;

router.post('/submit', async (req, res) => {

    let {} = req.body; //WILL FILL IN PARAMS

    try {
        validation.checkPicks(); //WILL FILL IN PARAMS
    } catch (e) {
        return res.status(400).json({error: e});
    }

    try {
        const submitInfo = await PICKS.submitPicks(); //WILL FILL IN PARAMS
        if (submitInfo.submitted) {
            return res.status(200).json({status: 'picks inserted'});
        } else {
            return res.status(500).json({status: 'failed to submit picks'});
        }
    } catch (e) {
        return res.status(500).json({error: e});
    }

});


router.get('/user/:week/:id', async (req, res) => {
    let week = req.params.week;
    let id = req.params.id;
    
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


router.get('/all', async (req, res) => {

    try {
        let result = await PICKS.getAllUserPicks();
        return res.json(result);
    } catch (e) {
        return res.status(404).json({error: e});
    }

});




module.exports = router;