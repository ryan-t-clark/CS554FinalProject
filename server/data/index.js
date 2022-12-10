const api = require('./api');
const userData = require('./users');
const gamesData = require('./games');
const picksData = require('./picks');

module.exports = {
    api   : api,
    users : userData,
    games : gamesData,
    picks : picksData
}