const express = require('express');
const router = express.Router();
const validation = require('../validation');
const data = require('../data');
const GAMES = data.games;

// const flat = require('flat');
// const unflatten = flat.unflatten;
// const redis = require('redis');
// const client = redis.createClient();
// client.connect().then(() => {});

router.post('/addgame', async (req, res) => {

    let {week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, homeFinalScore, awayFinalScore} = req.body;

    try {
        validation.checkAddGameParams(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, homeFinalScore, awayFinalScore);
    } catch (e) {
        return res.status(400).json({error: e});
    }

    try {
        const gameInfo = await GAMES.addGame(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, homeFinalScore, awayFinalScore);
        if (gameInfo.gameInserted) {
            return res.status(200).json({status: 'game inserted'});
        } else {
            return res.status(500).json({status: 'failed to insert game'});
        }
    } catch (e) {
        return res.status(500).json({error: e});
    }

});


router.get('/getweek/:week', async (req, res) => {
    let week = req.params.week;
    
    try {
        validation.checkWeek(week);
    } catch (e) {
        return res.status(400).json({error: e});
    }

    try {
        let result = await GAMES.getGamesByWeek(week);
        return res.json(result);
    } catch (e) {
        return res.status(404).json({error: e});
    }

});


router.post('/update', async (req, res) => {

    const {gameId, homeScore, awayScore} = req.body;

    try {
        validation.checkId(gameId);
        validation.isValidScore(homeScore);
        validation.isValidScore(awayScore);
    } catch (e) {
        return res.status(400).json(e);
    }

    try {
        let result = await GAMES.updateGameResult(gameId, homeScore, awayScore);
        return res.status(200).json(result)
    } catch (e) {
        return res.status(404).json(e);
    }

});


module.exports = router;