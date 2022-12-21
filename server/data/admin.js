let { ObjectId } = require('mongodb');

const validation = require('../validation');

const mongoCollections = require("../config/mongoCollections");

const ADMIN = mongoCollections.admin;
const USERS = mongoCollections.users;
const PICKS = mongoCollections.picks;


async function changeWeek(week){
    validation.checkWeek(week);
    const adminCollection = await ADMIN();

    const result = await adminCollection.updateOne({},{$set:{week:week}})
    // console.log(result);

    initPicksForWeek(week);

    return result;
}

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
    const userCollection = await USERS();

    const usersList = await userCollection.find({}, {projection: {password: 0}}).toArray();
    if (!usersList) throw 'could not get all users';
    const picksCollection = await PICKS();
    const picksList = await picksCollection.find({week: Number(week)}, {projection: {userId: 1}}).toArray();
    console.log(picksList);
    let weekPicks = [];

    for (user of usersList) {
        if(picksList.find(pick => pick.userId.equals(user._id)))
            continue;
        weekPicks.push(createPickWeekObject(week, user.username, user._id,));
    }

    const insertInfo = await picksCollection.insertMany(weekPicks);
    if (insertInfo.insertedCount === 0) throw "Could not add pick week";
    return {inserted: true}
}

async function getWeek(){
    const adminCollection = await ADMIN();

    const result = await adminCollection.findOne({});
    return result
}

async function setup(){
    const adminCollection = await ADMIN();
    
    const result = await adminCollection.insertOne({week:1});
    return result

}

module.exports = {
    changeWeek,
    getWeek,
    setup
}