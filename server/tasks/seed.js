const connection = require('../config/mongoConnection');
const mongoCollections = require("../config/mongoCollections");
const GAMES = mongoCollections.games;
const USERS = mongoCollections.users;

const data = require('../data');
const { getGameById } = require('../data/games');
const users = data.users;
const games = data.games;
const picks = data.picks;

//since game id's change with each seed, need this to make it work
async function getGameId(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, finalScore) {
    const gamesCollection = await GAMES();

    const game = await gamesCollection.findOne({
        week: week,
        gameStart: gameStart,
        homeTeam, homeTeam,
        awayTeam, awayTeam,
        homeSpread, homeSpread,
        awaySpread, awaySpread,
        finalScore, finalScore
    })
    if (!game) throw 'could not find game';
    return game._id.toString();
}

//since user id's change with each seed, need this to make it work
async function getUserId(username) {
    const userCollection = await USERS();

    const user = await userCollection.findOne({username: username});
    if (!username) throw 'could not find username';
    return user._id.toString();
}

async function main() {

    try {
        console.log('seeding database');
        const db = await connection.connectToDb();
        await db.dropDatabase();

        //create some sample users
        await users.createUser('rclark','password', true);
        await users.createUser('evalentino','password', false);
        await users.createUser('rchin','password', false);
        await users.createUser('rnarma','password', false);
        await users.createUser('patrickhill','password', false);

        //add games
        //                                             home      away     home,away
        await games.addGame(1,"Sunday Dec 11 1:00PM","Titans","Jaguars",-3.5,3.5,null);
        await games.addGame(1,"Sunday Dec 11 1:00PM","Bills","Jets",-9.5,9.5,null);
        await games.addGame(1,"Sunday Dec 11 1:00PM","Bengals","Browns",-5.5,5.5,null);
        await games.addGame(1,"Sunday Dec 11 1:00PM","Steelers","Ravens",2.5,-2.5,null);
        await games.addGame(1,"Sunday Dec 11 1:00PM","Lions","Vikings",2.5,-2.5,null);
        await games.addGame(1,"Sunday Dec 11 1:00PM","Cowboys","Texans",-16.5,16.5,null);
        await games.addGame(1,"Sunday Dec 11 1:00PM","Giants","Eagles",6.5,-6.5,null);
        await games.addGame(1,"Sunday Dec 11 4:05PM","Broncos","Chiefs",8.5,-8.5,null);
        await games.addGame(1,"Sunday Dec 11 4:25PM","Seahawks","Panthers",-3.5,3.5,null);
        await games.addGame(1,"Sunday Dec 11 4:25PM","49ers","Bucaneers",-3.5,3.5,null);
        await games.addGame(1,"Sunday Dec 11 8:20PM","Chargers","Dolphins",1.5,-1.5,null);
        await games.addGame(1,"Monday Dec 12 8:15PM","Patriots","Cardinals",-1.5,1.5,null);

        await picks.initPicksForWeek(1);

        //add picks for user rclark
        await picks.submitPicks(1, await getUserId('rclark'),  
            {
            "pick10": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Titans","Jaguars",-3.5,3.5,null),
                "weight": 10,
                "selectedTeam": "Titans",
                "selectedSpread": -3.5,
                "pickResult": null,
                "submitted": false
            },
            "pick9": null,
            "pick8": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Bills","Jets",-9.5,9.5,null),
                "weight": 8,
                "selectedTeam": "Jets",
                "selectedSpread": 9.5,
                "pickResult": null,
                "submitted": false
            },
            "pick7": null,
            "pick6": null,
            "pick5": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Cowboys","Texans",-16.5,16.5,null),
                "weight": 5,
                "selectedTeam": "Cowboys",
                "selectedSpread": -16.5,
                "pickResult": null,
                "submitted": false
            },
            "pick4": null,
            "pick3": null,
            "pick2": null,
            "pick1": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Giants","Eagles",6.5,-6.5,null),
                "weight": 1,
                "selectedTeam": "Eagles",
                "selectedSpread": -6.5,
                "pickResult": null,
                "submitted": false
            }
        });

        await picks.submitPicks(1, await getUserId('evalentino'),
        {
            "pick10": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Titans","Jaguars",-3.5,3.5,null),
                "weight": 10,
                "selectedTeam": "Jaguars",
                "selectedSpread": 3.5,
                "pickResult": null,
                "submitted": false
            },
            "pick9": null,
            "pick8": null,
            "pick7": null,
            "pick6": null,
            "pick5": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Bills","Jets",-9.5,9.5,null),
                "weight": 8,
                "selectedTeam": "Bills",
                "selectedSpread": -9.5,
                "pickResult": null,
                "submitted": false
            },
            "pick4": null,
            "pick3": null,
            "pick2": null,
            "pick1": null
        })

        await picks.submitPicks(1, await getUserId('patrickhill'),
        {
            "pick10": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Titans","Jaguars",-3.5,3.5,null),
                "weight": 10,
                "selectedTeam": "Jaguars",
                "selectedSpread": 3.5,
                "pickResult": null,
                "submitted": false
            },
            "pick9": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Bills","Jets",-9.5,9.5,null),
                "weight": 8,
                "selectedTeam": "Jets",
                "selectedSpread": 9.5,
                "pickResult": null,
                "submitted": false
            },
            "pick8": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Cowboys","Texans",-16.5,16.5,null),
                "weight": 8,
                "selectedTeam": "Texans",
                "selectedSpread": 16.5,
                "pickResult": null,
                "submitted": false
            },
            "pick7": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Giants","Eagles",6.5,-6.5,null),
                "weight": 8,
                "selectedTeam": "Eagles",
                "selectedSpread": -6.5,
                "pickResult": null,
                "submitted": false
            },
            "pick6": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Bengals","Browns",-5.5,5.5,null),
                "weight": 8,
                "selectedTeam": "Bengals",
                "selectedSpread": -5.5,
                "pickResult": null,
                "submitted": false
            },
            "pick5": {
                "gameId": await getGameId(1,"Sunday Dec 11 1:00PM","Steelers","Ravens",2.5,-2.5,null),
                "weight": 8,
                "selectedTeam": "Steelers",
                "selectedSpread": 2.5,
                "pickResult": null,
                "submitted": false
            },
            "pick4": null,
            "pick3": null,
            "pick2": null,
            "pick1": null
        })

        //update some final scores
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Titans","Jaguars",-3.5,3.5,null), 22, 36);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Bills","Jets",-9.5,9.5,null), 20, 12);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Bengals","Browns",-5.5,5.5,null), 23, 10);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Steelers","Ravens",2.5,-2.5,null), 14, 16);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Giants","Eagles",6.5,-6.5,null), 22, 48);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Cowboys","Texans",-16.5,16.5,null), 27, 23);



        console.log('seed complete');
    } catch (e) {
        console.log("error seeding",e);
    }

    await connection.closeConnection();
    return;
}

main();