let { ObjectId } = require('mongodb');

const validation = require('../validation');

const mongoCollections = require("../config/mongoCollections");

const ADMIN = mongoCollections.admin;


async function changeWeek(week){
    validation.checkWeek(week);
    const adminCollection = await ADMIN();

    const result = await adminCollection.updateOne({},{$set:{week:week}})
    // console.log(result);
    return result;
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