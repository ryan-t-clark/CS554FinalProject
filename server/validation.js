const { ObjectId } = require("mongodb");

const regex = new RegExp(/[^0-9a-z]/i);

function checkAddGameParams(week, gameStart, homeTeam, awayTeam, homeSpread, awaySpread, finalScore) {
  checkWeek(week);
  if (!gameStart) throw 'must provide gameStart';
  if (!homeTeam) throw 'must provide homeTeam';
  if (!awayTeam) throw 'must provide awayTeam';
  if (!homeSpread) throw 'must provide homeSpread';
  if (!awaySpread) throw 'must provide awaySpread';
  //will be more in depth later
}

function checkWeek(week) {
  if (!week) throw 'must provide week';
}

function checkPicks() {
  //TODO
}

function checkId(id) {
  if(!id) throw 'must provide a valid id';
  if(typeof id !== 'string') throw 'id must be of type string';
  if(id.length < 1) throw 'id is an empty string';
  if(id.trim().length < 1) throw 'id consists of only spaces';
  if(!ObjectId.isValid(id)) throw 'id must be a valid ObjectId';
}


module.exports = {
  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkUserName(strVal, varName) {
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
    },

  checkPassword(password) {
    if(password.indexOf(' ')>=0 || password.length<6) throw 'password is not long enough or contains empty spaces'
  },
  checkAddGameParams,
  checkWeek,
  checkPicks,
  checkId

  
}