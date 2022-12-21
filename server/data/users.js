const mongoCollections = require("../config/mongoCollections");
const USERS = mongoCollections.users;
const PICKS = mongoCollections.picks;

let { ObjectId } = require('mongodb');
const validation = require('../validation');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const fs = require('fs');
var im = require('imagemagick');
const { default: axios } = require('axios');

var FileSaver = require('file-saver');

// const picksData = require("./picks")


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
    _id : ObjectId(),
    username : username,
    password : await hashPwd(password),
    totalPoints : 0,
    totalCorrectPicks: 0,
    totalIncorrectPicks: 0,
    admin: admin
  }
    
  const insertInfo = await userCollection.insertOne(newUser);
    
  if (insertInfo.insertedCount === 0) throw "Could not add user";

  // create default profile pic
  await axios({
    method: 'get',
    url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    responseType: 'stream'
  }).then(function (res) {
    let stream = res.data.pipe(fs.createWriteStream(`${__dirname}/../images/${newUser._id}_profile_pic.jpg`));
    
    // wait for file to be written
    stream.on('finish', async () => {
      // resize file for proper profile picture formatting
      im.resize({
        srcPath: `${__dirname}/../images/${newUser._id}_profile_pic.jpg`,
        dstPath: `${__dirname}/../images/${newUser._id}_profile_pic.jpg`,
        width: 400,
        height: 400,
        quality: 1
      }, function (err, stdout, stderr) {
        if (err) console.log(err);
      });
    });
  });

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
      return {userId: item._id, username: item.username, admin: item.admin, authenticated: true };
    }
  }
    
  throw 'Either the username or password is invalid.'
}


/*
  Gets all users 
*/
async function getAllUsers() {
  const userCollection = await USERS();

  const userList = await userCollection.find({}, {projection: {password: 0}}).toArray();
  if (!userList) throw 'could not get all users';
  return userList;
}


/*
  Gets a user by id
*/
async function getUserById(id) {
  validation.checkId(id);

  const userCollection = await USERS();

  const user = await userCollection.findOne({ _id: ObjectId(id) }, {projection: {password: 0}}); //HAVENT TESTED THIS
  if(user === null) throw `No user found`;
  return user;
}

// const blobToImage = (blob) => {
//   return new Promise(resolve => {
//     const url = URL.createObjectURL(blob)
//     let img = new Image()
//     img.onload = () => {
//       URL.revokeObjectURL(url)
//       resolve(img)
//     }
//     img.src = url
//   })
// }

// function saveImageToDisk(url, localPath) {
//   var fullUrl = url;
//   var file = fs.createWriteStream(localPath);
//   var request = https.get(url, function(response) {
//   response.pipe(file);
//   });
// }

async function updateImage(id,image){ //add validation
  validation.checkId(id);
  console.log(__dirname+`/${id}.png`);
  console.log(__dirname+"/image.png");
  console.log(image);
  // x = FileSaver.saveAs("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",__dirname+"/image.png")
  // x = FileSaver.saveAs(image,"image.png")
  img = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
  console.log(`${__dirname}/public/files/${id}.png`);
  x = FileSaver.saveAs(img,`${__dirname}/public/files/${id}.png`)
  console.log(x);
  // saveImageToDisk(image,`${id}.png`)
  // console.log(image);

  // console.log(blobToImage(image));
  // im.resize(image, function(err, metadata){
  //     if (err) throw err;
  //     console.log('Shot at '+metadata.exif.dateTimeOriginal);
  //   })

  const userCollection = await USERS();
  const user = await userCollection.updateOne({ _id: ObjectId(id) },{$set:{"profileImage":image}})
}


/*
  Gets the current standings
*/
async function getStandings() {
  const userCollection = await USERS();

  const standings = await userCollection.find({}, {projection: {_id: 0, username: 1, totalPoints: 1, totalCorrectPicks: 1, totalIncorrectPicks: 1}}).toArray();
  if (!standings) throw 'could not get standings';
  return standings;
}

async function refreshStandings(){
  const userList = await getAllUsers();
  const userCollection = await USERS();
  
  for (user of userList) {
    user.totalCorrectPicks = 0;
    user.totalIncorrectPicks = 0;
    user.totalPoints = 0;
    const picksCollection = await PICKS();

    const picksList = await picksCollection.find({userId: user._id}).toArray();
    for(pick of picksList){
      user.totalCorrectPicks += pick.totalCorrectPicks;
      user.totalIncorrectPicks += pick.totalIncorrectPicks;
      user.totalPoints += pick.totalPoints;
    }
    // console.log(user);
    
    const response = await userCollection.updateOne(
      { _id: ObjectId(user._id)},
      { $set: user });
    // console.log(response);


  }

}



module.exports = {
  createUser,
  checkUser,
  getAllUsers,
  getUserById,
  getStandings,
  refreshStandings,
  updateImage
}