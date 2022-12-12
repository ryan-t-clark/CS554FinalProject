const mongoCollections = require("../config/mongoCollections");
const USERS = mongoCollections.users;
let { ObjectId } = require('mongodb');
const validation = require('../validation');
const bcrypt = require('bcrypt');
const saltRounds = 12;


/*
  Hashes a password
*/
const hashPwd = async (password) => {
    try {
      return await bcrypt.hash(password,saltRounds);
    } catch(e) {
      throw e
    }
}


/*
  Creates a user
*/
async function createUser(username, password, admin) {
  username = validation.checkUserName(username,"username");
  password = validation.checkString(password,"password");
  validation.checkPassword(password);

  const userCollection = await USERS();
    
  const users = await userCollection.find({}).toArray();
    
  for (item of users) {
    if(item.username.toUpperCase() === username.toUpperCase()) throw 'Username already in use'
  }
  
  //schema of new user
  const newUser = {
    username : username,
    password : await hashPwd(password),
    totalPoints : 0,
    admin: admin
  }
    
  const insertInfo = await userCollection.insertOne(newUser);
    
  if (insertInfo.insertedCount === 0) throw "Could not add user";
  return {userInserted:true}
}


/*
  Authenticates a user
*/
async function checkUser(username, password) {
  username = validation.checkUserName(username,"username");
  password = validation.checkString(password,"password");
  if(password.indexOf(' ')>=0 || password.length<6) throw 'password is not long enough or contains empty spaces'
    
  const userCollection = await USERS();
    
  const users = await userCollection.find({}).toArray();

  for (item of users) {
    if(item.username.toUpperCase() == username.toUpperCase()){
      if(!await bcrypt.compare(password,item.password)) throw 'Either the username or password is invalid'
      return {authenticated:true};
    }
  }
    
  throw 'Either the username or password is invalid.'
}


/*
  Gets all users 
*/
async function getAllUsers() {
  const userCollection = await USERS();

  const userList = await userCollection.find({}).toArray(); //NEED TO CHANGE THIS TO EXCLUDE PASSWORD IN RETURN VALUE
  if (!userList) throw 'could not get all users';
  return userList;
}

async function getUserById(id) {
  validation.checkId(id);

  const userCollection = await USERS();

  const user = await userCollection.findOne({ _id: ObjectId(id) }); //HAVENT TESTED THIS
  if(user === null) throw `No user found`;
  return user;
}


module.exports = {
  createUser,
  checkUser,
  getAllUsers,
  getUserById
}