const { ObjectId } = require("mongodb");

const regex = new RegExp(/[^0-9a-z]/i);

//general function for checking if a parameter is a string
function checkString(strVal, varName) {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}

//general function for checking if a parameter is a number
function checkIsNumber(num, varName) {
  if (!num) throw `must provide ${varName}`;
  num = Number(num);
  if (typeof num !== 'number') throw `${varName} must be a number`;
  if (isNaN(num)) throw `${varName} must be a number`;
}

//parameters of the addGame function
function checkAddGameParams(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, homeFinalScore, awayFinalScore) {
  checkWeek(week);
  checkString(gameStart, "game start");
  checkString(homeTeam, "home team");
  checkString(awayTeam, "away team");
  checkIsNumber(homeSpread, "home spread");
  checkIsNumber(awaySpread, "away spread");
}

//make sure pick contains required fields
function isValidPickSchema(pick) {
  /*
    interface Pick {
        gameId: any,
        weight: number,
        selectedTeam: string,
        selectedSpread: number,
        pickResult: boolean | null,
        submitted: boolean
    }
  */
  checkId(pick.gameId);
  checkIsNumber(pick.weight);
  checkString(pick.selectedTeam);
  checkIsNumber(pick.selectedSpread);
}

//validation for week
function checkWeek(week) {
  if (!week) throw 'must provide week';
  //check that this is a valid week i.e. non-negative integer 1-18
  week = Number(week);
  if (typeof week !== 'number') throw 'week must be of type number';
  if (!Number.isInteger(week) || isNaN(week) || week < 1 || week > 18) throw 'week must be integer 1-18';
}

//validates final scores
function isValidScore(score) {
  if (!score) throw 'must provide score';
  //check that these are valid numbers i.e. non-negative integers
  score = Number(score);
  if (typeof score !== 'number') throw ' score must be of type number';
  if (!Number.isInteger(score) || isNaN(score) || score < 0) throw 'score must be a positive integer';
}

//validation function for the input parameter of submitPicks
function isValidPicksParameter(picks) {
  if (!picks) throw 'must provide picks object';
  if (typeof picks !== 'object') throw 'picks parameter must be an object';
  const actual = Object.keys(picks);
  const expected = ['pick10','pick9','pick8','pick7','pick6','pick5','pick4','pick3','pick2','pick1'];
  let actualString = JSON.stringify(actual.sort())
  let expectedString = JSON.stringify(expected.sort())
  if (actualString !== expectedString) throw 'invalid schema of picks object';
}

//checks validity of objectid
function checkId(id) {
  if(!id) throw 'must provide a valid id';
  if(typeof id !== 'string') throw 'id must be of type string';
  if(id.length < 1) throw 'id is an empty string';
  if(id.trim().length < 1) throw 'id consists of only spaces';
  if(!ObjectId.isValid(id)) throw 'id must be a valid ObjectId';
}

//checks username
function checkUserName(strVal, varName) {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  if(strVal.indexOf(' ')>=0 || strVal.length<4) throw `${varName} is not long enough or contains empty spaces`;
  if(regex.test(strVal)) throw `${varName} does not contain only AlphaNumeric Character`

  return strVal;
}

//checks password
function checkPassword(password) {
  if(password.indexOf(' ')>=0 || password.length<6) throw 'password is not long enough or contains empty spaces'
}


module.exports = {
  checkPassword,
  checkString,
  checkUserName,
  checkAddGameParams,
  checkWeek,
  checkId,
  isValidPicksParameter,
  isValidScore,
  isValidPickSchema
}