const mongoCollections = require("../config/mongoCollections");
const GAMES = mongoCollections.games;
const PICKS = mongoCollections.picks;
const picksData = require('./picks');
const userData = require("./users");
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

    // determine who won this game based on the scores
    let gameResult = (game.homeFinalScore + game.homeSpread) - game.awayFinalScore;
    let winner = undefined;
    gameResult > 0 ? winner = game.homeTeam : winner = game.awayTeam;
    

    const picksList = await picksData.getAllPicksByWeek(game.week);

    const possiblePicks = ['pick10','pick9','pick8','pick7','pick6','pick5','pick4','pick3','pick2','pick1'];

    //iterate through all picks made and check
    for (pickWeek of picksList) {
        for (pickVal of possiblePicks) {
            if (pickWeek[pickVal]) { //non-null
                if (pickWeek[pickVal].gameId === gameId) { //if it is the game we are looking for
                    //if the user made the right pick
                    if (pickWeek[pickVal].selectedTeam === winner) {
                        pickWeek[pickVal].pickResult = true
                        pickWeek.totalCorrectPicks ++;
                        pickWeek.totalPoints += pickWeek[pickVal].weight;
                    } else {
                        pickWeek[pickVal].pickResult = false;
                        pickWeek.totalIncorrectPicks ++;
                        pickWeek.potentialPoints -= pickWeek[pickVal].weight;
                    }
                }
            }
        }
    }

    const picksCollection = await PICKS();

    for (pickWeek of picksList) {
        //can definitely be made more efficient by checking equality vs what existed previously -- will optimize later (maybe)
        const updatedInfo = await picksCollection.updateOne( 
            { _id: ObjectId(pickWeek._id)},
            { $set: pickWeek }
        );
    }

    await userData.refreshStandings();

    return { updated: true };
}


module.exports = {
    addGame,
    getGamesByWeek,
    getGameById,
    updateGameResult
}