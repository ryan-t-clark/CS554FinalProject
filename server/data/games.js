const mongoCollections = require("../config/mongoCollections");
const GAMES = mongoCollections.games;
const PICKS = mongoCollections.picks;
const picksData = require('./picks');
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
                        homeFinalScore,
                        awayFinalScore ) {
    validation.checkAddGameParams(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, homeFinalScore, awayFinalScore);

    const gamesCollection = await GAMES();

    let newGame = {
        week: week,
        gameStart: gameStart,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeSpread: homeSpread,
        awaySpread: awaySpread,
        homeFinalScore: homeFinalScore,
        awayFinalScore: awayFinalScore,
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
    if (!gamesList) throw `could not get games for week ${week}`;
    return gamesList;
}


async function getGameById(gameId) {
    validation.checkId(gameId);

    const gamesCollection = await GAMES();

    const game = await gamesCollection.findOne({_id: ObjectId(gameId)})
    if (!game) throw `no game found with id ${gameId}`;
    return game;
}

/*
    For entering win/loss of a game
*/
async function updateGameResult(gameId, homeScore, awayScore) {
    validation.checkId(gameId);
    validation.isValidScore(homeScore);
    validation.isValidScore(awayScore);

    //get game
    const game = await getGameById(gameId);

    //update score
    game.homeFinalScore = homeScore;
    game.awayFinalScore = awayScore;

    const gamesCollection = await GAMES();

    //update game in db
    const updatedInfo = await gamesCollection.updateOne( 
        { _id: ObjectId(gameId)},
        { $set: game }
    );

    if (updatedInfo.modifiedCount === 0) throw 'failed to update game';

    //
    // now have to go through user picks and update wins and losses
    //

    // INCOMPLETE

    const picksList = await picksData.getAllPicksByWeek(game.week);
    console.log(picksList);

    for (pickWeek of picksList) {
        for (keyVal of Object.keys(pickWeek)) {

        }
    }


}


module.exports = {
    addGame,
    getGamesByWeek,
    getGameById,
    updateGameResult
}