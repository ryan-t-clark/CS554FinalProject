const mongoCollections = require("../config/mongoCollections");
const PICKS = mongoCollections.picks;
const { ObjectId } = require('mongodb');
const userData = require('./users');

const validation = require('../validation');

/*
    validates that incoming pick object is valid
*/
function isValidPickSchema(pick) {
    if (!pick.gameId) throw 'must provide gameId';
    if (!pick.weight) throw 'must provide weight';
    if (!pick.selectedTeam) throw 'must provide selected team';
    //pickResult can be undefined

    //need to fix this so that false doesn't throw an error
    //if (!pick.submitted) throw 'must provide boolean value for submitted'

    //TODO
    //will add type checking -- need to figure out what the types will be

}


/*
    when the user submits picks
*/
async function submitPicks(week, id, picks) {
    //validation
    validation.checkWeek(week);
    validation.checkId(id);
    validation.isValidPicksParameter(picks);

    //check the picks that came in are valid
    for (pickKey of Object.keys(picks)) {
        let current = picks[pickKey];
        if (!current) continue; //if this pick is blank
        isValidPickSchema(current);
        //maybe add these validated picks to a list
    }

    //get picks for week/id

    //insert picks into the retrieved object

    //overwrite the picks for week/id

    return {submitted: true}
}


/*
    schema of individual picks -- i don't know if i will even need this
*/
function createPickObject(gameId, weight, selectedTeam, pickResult, submitted) {
    const pick = {
        gameId: gameId,
        weight: weight,
        selectedTeam: selectedTeam,
        pickResult: pickResult,
        submitted: submitted
    }
    return pick;
}


/*
    schema of pickWeek object
*/
function createPickWeekObject(week, username, id) {
    const pickWeek = {
        week: week,
        userId: id,
        username: username,
        totalPoints: 0,
        potentialPoints: 55,
        pick10: null,
        pick9: null,
        pick8: null,
        pick7: null,
        pick6: null,
        pick5: null,
        pick4: null,
        pick3: null,
        pick2: null,
        pick1: null,
    }
    return pickWeek;
}


/*
    creates a pick object for every currently registered user
*/
async function initPicksForWeek(week) {
    const usersList = await userData.getAllUsers();
    const picksCollection = await PICKS();

    let weekPicks = [];

    for (user of usersList) {
        weekPicks.push(createPickWeekObject(week, user.username, user._id,));
    }

    const insertInfo = await picksCollection.insertMany(weekPicks);
    if (insertInfo.insertedCount === 0) throw "Could not add pick week";
    return {inserted: true}
}


/*
    creates a pick object for a user 
    -- to also be used if they sign up after initPicksForWeek() has been run
*/
async function initPicksById(week, username, id) {
    const picksCollection = await PICKS();

    const pickWeek = createPickWeekObject(week,username,id);

    const insertInfo = await picksCollection.insertOne(pickWeek);
    if (insertInfo.insertedCount === 0) throw 'Could not add pick week';
    return {inserted: true};
}


/*
    gets the picks of a single user
*/
async function getWeekPicksById(week, id) {
    validation.checkWeek(week);
    validation.checkId(id);

    const picksCollection = await PICKS();

    const picksList = await picksCollection.find({week: Number(week), _id: ObjectId(id)}).toArray();
    if (!picksList) throw 'Could not get picks';
    return picksList;
}


/*
    get picks of all users per week
*/
async function getAllPicksByWeek(week) {
    validation.checkWeek(week);

    const picksCollection = await PICKS();

    const picksList = await picksCollection.find({week: Number(week)}).toArray();
    if (!picksList) throw 'Could not get picks';
    return picksList;
}


module.exports = {
    submitPicks,
    getWeekPicksById,
    getAllPicksByWeek,
    initPicksForWeek,
    initPicksById
}