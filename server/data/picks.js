const mongoCollections = require("../config/mongoCollections");
const PICKS = mongoCollections.picks;
let { ObjectId } = require('mongodb');

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
    gets the picks of a single user
*/
async function getPicksById(id) {
    //TODO
}


/*
    get picks of all users
*/
async function getAllUserPicks() {
    //TODO
}


module.exports = {
    submitPicks,
    getPicksById,
    getAllUserPicks
}