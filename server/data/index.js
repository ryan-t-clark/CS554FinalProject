const userData = require('./users');
const gamesData = require('./games');
const picksData = require('./picks');
const adminData = require("./admin")

module.exports = {
    users : userData,
    games : gamesData,
    picks : picksData,
    admin : adminData
}