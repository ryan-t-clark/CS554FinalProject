const mongoCollections = require("../config/mongoCollections");
const PICKS = mongoCollections.picks;
const { ObjectId } = require('mongodb');
const userData = require('./users');

const validation = require('../validation');

/*
    when the user submits picks
*/
async function submitPicks(week, userId, picks) {
    //validation
    validation.checkWeek(week);
    validation.checkId(userId);
    validation.isValidPicksParameter(picks);

    let picksToSubmit = new Map();

    //check the picks that came in are valid
    for (pickKey of Object.keys(picks)) {
        let current = picks[pickKey];
        if (!current) continue; //if this pick is blank
        validation.isValidPickSchema(current);
        current.submitted = true;
        picksToSubmit.set(pickKey, current);
        //maybe add these validated picks to a list
    }

    //get picks for week/id
    let userPicks = await getWeekPicksById(week, userId);

    //insert picks into the retrieved object
    for (pickKey of picksToSubmit.keys()) {
        if (userPicks[pickKey] === null) { //if there is no existing pick
            userPicks[pickKey] = picksToSubmit.get(pickKey);
        }
    }
    // userPicks["totalCorrectPicks"]=0;
    // userPicks["totalIncorrectPicks"]=0;


    //overwrite the picks for week/id
    const picksCollection = await PICKS();

    const updatedInfo = await picksCollection.updateOne(
        { _id: ObjectId(userPicks._id)},
        { $set: userPicks }
    );

    if (updatedInfo.modifiedCount === 0) return {submitted: false};

    return {submitted: true}
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
        totalCorrectPicks:0,
        totalIncorrectPicks:0
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

    const pickWeek = await picksCollection.findOne({week: Number(week), userId: ObjectId(id)});
    if (!pickWeek) throw 'Could not get picks';
    return pickWeek;
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

// async function getAllPicksbyID(id){
//     validation.checkId(id);

//     const picksCollection = await PICKS();

//     const picksList = await picksCollection.find({userId: ObjectId(id)}).toArray();
//     if (!picksList) throw 'Could not get picks';
//     return picksList;
// }


async function getAllPickArraysByWeek(week) {
    let picksList = await getAllPicksByWeek(week);
    
    let result = [];
    for (pickWeek of picksList) {
        let current = []
        current.push(pickWeek.pick10);
        current.push(pickWeek.pick9);
        current.push(pickWeek.pick8);
        current.push(pickWeek.pick7);
        current.push(pickWeek.pick6);
        current.push(pickWeek.pick5);
        current.push(pickWeek.pick4);
        current.push(pickWeek.pick3);
        current.push(pickWeek.pick2);
        current.push(pickWeek.pick1);
        result.push({username: pickWeek.username, picks: current})
    }

    return result;
}


async function getWeekPickArraysById(week, id) {
    let pickWeek = await getWeekPicksById(week, id);

    let result = [];

    result.push(pickWeek.pick10);
    result.push(pickWeek.pick9);
    result.push(pickWeek.pick8);
    result.push(pickWeek.pick7);
    result.push(pickWeek.pick6);
    result.push(pickWeek.pick5);
    result.push(pickWeek.pick4);
    result.push(pickWeek.pick3);
    result.push(pickWeek.pick2);
    result.push(pickWeek.pick1);

    return result;
}

module.exports = {
    submitPicks,
    getWeekPicksById,
    getAllPicksByWeek,
    initPicksForWeek,
    initPicksById,
    getAllPickArraysByWeek,
    getWeekPickArraysById
}