const mongoCollections = require("../config/mongoCollections");
const PICKS = mongoCollections.picks;
const { ObjectId } = require('mongodb');
const userData = require('./users');

const validation = require('../validation');

/**
 * 
 * STILL FIGURING OUT SCHEMA --- WILL DO SOON
 * 
 */


/*
    when the user submits picks
*/
async function submitPicks() {
    //TODO
    return {submitted: false}
}


/*
    schema of individual picks
*/
function createPickObject() {
    //TODO
    // need to figure out good schema for this
}


/*
    schema of pickWeek object
*/
function createPickWeekObject(week, username, id) {
    const pick = {
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
    return pick;
}


/*
    Creates a pick object for every currently registered user
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
    Creates a pick object for a user 
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