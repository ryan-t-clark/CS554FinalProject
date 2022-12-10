const connection = require('../config/mongoConnection');

const data = require('../data');
const users = data.users;
const games = data.games;
const picks = data.picks;

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

        console.log('seed complete');
    } catch (e) {
        console.log("error seeding",e);
    }

    await connection.closeConnection();
    return;
}

main();