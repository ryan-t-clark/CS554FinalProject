const mongoCollections = require("../config/mongoCollections");
const GAMES = mongoCollections.games;
let { ObjectId } = require('mongodb');

const validation = require('../validation');


/*
    Add a game to the database
*/
async function addGame( week,
                        gameStart,
                        homeTeam,
                        awayTeam,
                        homeSpread,
                        awaySpread,
                        finalScore ) {
    validation.checkAddGameParams(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, finalScore);

    const gamesCollection = await GAMES();

    let newGame = {
        week: week,
        gameStart: gameStart,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeSpread: homeSpread,
        awaySpread: awaySpread,
        finalScore: finalScore
    }

    const insertInfo = await gamesCollection.insertOne(newGame);
    if (insertInfo.insertInfo === 0) throw 'Failed to add game';
    return { gameInserted: true };
}


/*
    Get all games for a given week
*/
async function getGamesByWeek(week) {
    validation.checkWeek(week);

    const gamesCollection = await GAMES();

    const gamesList = await gamesCollection.find({week: Number(week)}).toArray();
    if (!gamesList) throw 'Could not get games';
    return gamesList;
}



module.exports = {
    addGame,
    getGamesByWeek
}