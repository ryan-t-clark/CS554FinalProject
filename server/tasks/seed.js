const connection = require('../config/mongoConnection');
const mongoCollections = require("../config/mongoCollections");
const GAMES = mongoCollections.games;
const USERS = mongoCollections.users;

const data = require('../data');
const { getGameById } = require('../data/games');
const users = data.users;
const games = data.games;
const picks = data.picks;
const admin = data.admin;

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
    if (!game) throw `could not find week ${week} game ${homeTeam} vs ${awayTeam}`;
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

        await admin.setup();

        //create some sample users
        await users.createUser('rclark','password', true);
        await users.createUser('evalentino','password', false);
        await users.createUser('rchin','password', false);
        await users.createUser('rnarma','password', false);
        await users.createUser('patrickhill','password', false);

        /*
            ========================
                    WEEK 1
            ========================
        */

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
            "pick9": {
                "gameId": await getGameId(1,"Monday Dec 12 8:15PM","Patriots","Cardinals",-1.5,1.5,null),
                "weight": 9,
                "selectedTeam": "Patriots",
                "selectedSpread": -1.5,
                "pickResult": null,
                "submitted": false
            },
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
            "pick3": {
                "gameId": await getGameId(1,"Sunday Dec 11 4:05PM","Broncos","Chiefs",8.5,-8.5,null),
                "weight": 1,
                "selectedTeam": "Broncos",
                "selectedSpread": 8.5,
                "pickResult": null,
                "submitted": false
            },
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

        //update final scores
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Titans","Jaguars",-3.5,3.5,null), 22, 36);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Bills","Jets",-9.5,9.5,null), 20, 12);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Bengals","Browns",-5.5,5.5,null), 23, 10);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Steelers","Ravens",2.5,-2.5,null), 14, 16);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Lions","Vikings",2.5,-2.5,null), 34, 23);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Cowboys","Texans",-16.5,16.5,null), 27, 23);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 1:00PM","Giants","Eagles",6.5,-6.5,null), 22, 48);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 4:05PM","Broncos","Chiefs",8.5,-8.5,null), 28, 34);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 4:25PM","Seahawks","Panthers",-3.5,3.5,null), 24, 30);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 4:25PM","49ers","Bucaneers",-3.5,3.5,null), 35, 7);
        await games.updateGameResult(await getGameId(1,"Sunday Dec 11 8:20PM","Chargers","Dolphins",1.5,-1.5,null), 23, 17);
        await games.updateGameResult(await getGameId(1,"Monday Dec 12 8:15PM","Patriots","Cardinals",-1.5,1.5,null), 27, 13);
        

        /*
            ========================
                    WEEK 2
            ========================
        */

        await games.addGame(2,"Sunday Dec 18 1:00PM","Texans","Chiefs",14.5,-14.5,null);
        await games.addGame(2,"Sunday Dec 18 1:00PM","Jaguars","Cowboys",4.5,-4.5,null);
        await games.addGame(2,"Sunday Dec 18 1:00PM","Panthers","Steelers",-3.5,3.5,null);
        await games.addGame(2,"Sunday Dec 18 1:00PM","Jets","Lions",-1.5,1.5,null);
        await games.addGame(2,"Sunday Dec 18 1:00PM","Saints","Falcons",-4.5,4.5,null);
        await games.addGame(2,"Sunday Dec 18 1:00PM","Bears","Eagles",8.5,-8.5,null);
        await games.addGame(2,"Sunday Dec 18 4:05pm","Raiders","Patriots",-1.5,1.5,null);
        await games.addGame(2,"Sunday Dec 18 4:05PM","Broncos","Cardinals",-1.5,1.5,null);
        await games.addGame(2,"Sunday Dec 18 4:25PM","Chargers","Titans",-3.5,3.5,null);
        await games.addGame(2,"Sunday Dec 18 4:25PM","Bucaneers","Bengals",3.5,-3.5,null);
        await games.addGame(2,"Sunday Dec 18 8:20PM","Commanders","Giants",-4.5,4.5,null);
        await games.addGame(2,"Monday Dec 19 8:15PM","Packers","Rams",-7.5,7.5,null);
        await games.addGame(2,"Thursday Dec 15 8:15PM","Seahawks","49ers",3.5,-3.5,null);
        await games.addGame(2,"Saturday Dec 17 12:00PM","Vikings","Colts",-3.5,3.5,null);
        await games.addGame(2,"Saturday Dec 17 4:30PM","Browns","Ravens",-3.5,3.5,null);
        await games.addGame(2,"Saturday Dec 17 8:15PM","Bills","Dolphins",-7.5,7.5,null);

        await picks.initPicksForWeek(2);

        await picks.submitPicks(2, await getUserId('rclark'),  
            {
            "pick10": {
                "gameId": await getGameId(2,"Sunday Dec 18 1:00PM","Texans","Chiefs",14.5,-14.5,null),
                "weight": 10,
                "selectedTeam": "Texans",
                "selectedSpread": 14.5,
                "pickResult": null,
                "submitted": false
            },
            "pick9": null,
            "pick8": {
                "gameId": await getGameId(2,"Sunday Dec 18 1:00PM","Jets","Lions",-1.5,1.5,null),
                "weight": 8,
                "selectedTeam": "Lions",
                "selectedSpread": 1.5,
                "pickResult": null,
                "submitted": false
            },
            "pick7": null,
            "pick6": null,
            "pick5": {
                "gameId": await getGameId(2,"Sunday Dec 18 1:00PM","Jaguars","Cowboys",4.5,-4.5,null),
                "weight": 5,
                "selectedTeam": "Cowboys",
                "selectedSpread": -4.5,
                "pickResult": null,
                "submitted": false
            },
            "pick4": null,
            "pick3": null,
            "pick2": null,
            "pick1": {
                "gameId": await getGameId(2,"Sunday Dec 18 1:00PM","Panthers","Steelers",-3.5,3.5,null),
                "weight": 1,
                "selectedTeam": "Steelers",
                "selectedSpread": 3.5,
                "pickResult": null,
                "submitted": false
            }
        });


        await picks.submitPicks(2, await getUserId('rnarma'),  
            {
            "pick10": {
                "gameId": await getGameId(2,"Sunday Dec 18 8:20PM","Commanders","Giants",-4.5,4.5,null),
                "weight": 10,
                "selectedTeam": "Commanders",
                "selectedSpread": -4.5,
                "pickResult": null,
                "submitted": false
            },
            "pick9": null,
            "pick8": {
                "gameId": await getGameId(2,"Sunday Dec 18 1:00PM","Saints","Falcons",-4.5,4.5,null),
                "weight": 8,
                "selectedTeam": "Falcons",
                "selectedSpread": 4.5,
                "pickResult": null,
                "submitted": false
            },
            "pick7": {
                "gameId": await getGameId(2,"Monday Dec 19 8:15PM","Packers","Rams",-7.5,7.5,null),
                "weight": 7,
                "selectedTeam": "Packers",
                "selectedSpread": -7.5,
                "pickResult": null,
                "submitted": false
            },
            "pick6": null,
            "pick5": {
                "gameId": await getGameId(2,"Saturday Dec 17 8:15PM","Bills","Dolphins",-7.5,7.5,null),
                "weight": 5,
                "selectedTeam": "Bills",
                "selectedSpread": -7.5,
                "pickResult": null,
                "submitted": false
            },
            "pick4": null,
            "pick3": {
                "gameId": await getGameId(2,"Thursday Dec 15 8:15PM","Seahawks","49ers",3.5,-3.5,null),
                "weight": 3,
                "selectedTeam": "49ers",
                "selectedSpread": -3.5,
                "pickResult": null,
                "submitted": false
            },
            "pick2": null,
            "pick1": {
                "gameId": await getGameId(2,"Sunday Dec 18 1:00PM","Bears","Eagles",8.5,-8.5,null),
                "weight": 1,
                "selectedTeam": "Bears",
                "selectedSpread": 8.5,
                "pickResult": null,
                "submitted": false
            }
        });


        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 1:00PM","Texans","Chiefs",14.5,-14.5,null), 24, 30);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 1:00PM","Jaguars","Cowboys",4.5,-4.5,null), 40, 34);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 1:00PM","Panthers","Steelers",-3.5,3.5,null), 16, 24);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 1:00PM","Jets","Lions",-1.5,1.5,null), 17, 20);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 1:00PM","Saints","Falcons",-4.5,4.5,null), 21, 18);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 1:00PM","Bears","Eagles",8.5,-8.5,null), 20, 25);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 4:05pm","Raiders","Patriots",-1.5,1.5,null), 30, 24);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 4:05PM","Broncos","Cardinals",-1.5,1.5,null), 24, 15);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 4:25PM","Chargers","Titans",-3.5,3.5,null), 17, 14);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 4:25PM","Bucaneers","Bengals",3.5,-3.5,null), 23, 34);
        await games.updateGameResult(await getGameId(2,"Sunday Dec 18 8:20PM","Commanders","Giants",-4.5,4.5,null), 12, 20);
        await games.updateGameResult(await getGameId(2,"Monday Dec 19 8:15PM","Packers","Rams",-7.5,7.5,null), 24, 12);
        await games.updateGameResult(await getGameId(2,"Thursday Dec 15 8:15PM","Seahawks","49ers",3.5,-3.5,null), 13, 21);
        await games.updateGameResult(await getGameId(2,"Saturday Dec 17 12:00PM","Vikings","Colts",-3.5,3.5,null), 39, 36);
        await games.updateGameResult(await getGameId(2,"Saturday Dec 17 4:30PM","Browns","Ravens",-3.5,3.5,null), 13, 3);
        await games.updateGameResult(await getGameId(2,"Saturday Dec 17 8:15PM","Bills","Dolphins",-7.5,7.5,null), 32, 29);


        /*
            ========================
                    WEEK 3
            ========================
        */

        await games.addGame(3,"Thursday Dec 21 8:15PM","Jets","Jaguars",-1.5,-1.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Ravens","Falcons",-7.5,7.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Panthers","Lions",2.5,-2.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Chiefs","Seahawks",-9.5,9.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Browns","Saints",-3.5,3.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Titans","Texans",-7.5,7.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Patriots","Bengals",3.5,-3.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Vikings","Giants",-3.5,3.5,null);
        await games.addGame(3,"Saturday Dec 24 1:00PM","Bears","Bills",8.5,-8.5,null);
        await games.addGame(3,"Saturday Dec 24 4:05PM","49ers","Commanders",-7.5,7.5,null);
        await games.addGame(3,"Saturday Dec 24 4:25PM","Cowboys","Eagles",-6.5,6.5,null);
        await games.addGame(3,"Saturday Dec 24 8:15PM","Steelers","Raiders",-3.5,3.5,null);
        await games.addGame(3,"Sunday Dec 25 1:00PM","Dolphins","Packers",-5.5,5.5,null);
        await games.addGame(3,"Sunday Dec 25 4:30PM","Rams","Broncos",1.5,-1.5,null);
        await games.addGame(3,"Sunday Dec 25 8:20PM","Cardinals","Buccaneers",6.5,-6.5,null);
        await games.addGame(3,"Sunday Dec 25 8:15PM","Colts","Chargers",4.5,-4.5,null);

        await picks.initPicksForWeek(3);

        await picks.submitPicks(3, await getUserId('rclark'),  
        {
        "pick10": {
            "gameId": await getGameId(3,"Thursday Dec 21 8:15PM","Jets","Jaguars",-1.5,-1.5,null),
            "weight": 10,
            "selectedTeam": "Jets",
            "selectedSpread": -1.5,
            "pickResult": null,
            "submitted": false
        },
        "pick9": {
            "gameId": await getGameId(3,"Saturday Dec 24 4:25PM","Cowboys","Eagles",-6.5,6.5,null),
            "weight": 9,
            "selectedTeam": "Cowboys",
            "selectedSpread": -6.5,
            "pickResult": null,
            "submitted": false
        },
        "pick8": {
            "gameId": await getGameId(3,"Saturday Dec 24 1:00PM","Ravens","Falcons",-7.5,7.5,null),
            "weight": 8, 
            "selectedTeam": "Ravens",
            "selectedSpread": -7.5,
            "pickResult": null,
            "submitted": false
        },
        "pick7": null,
        "pick6": null,
        "pick5": {
            "gameId": await getGameId(3,"Saturday Dec 24 1:00PM","Panthers","Lions",2.5,-2.5,null),
            "weight": 5,
            "selectedTeam": "Panthers",
            "selectedSpread": 2.5,
            "pickResult": null,
            "submitted": false
        },
        "pick4": null,
        "pick3": null,
        "pick2": null,
        "pick1": {
            "gameId": await getGameId(3,"Sunday Dec 25 8:15PM","Colts","Chargers",4.5,-4.5,null),
            "weight": 1,
            "selectedTeam": "Chargers",
            "selectedSpread": -4.5,
            "pickResult": null,
            "submitted": false
        }
    });



        console.log('seed complete');
    } catch (e) {
        console.log("error seeding",e);
    }

    await connection.closeConnection();
    return;
}

main();