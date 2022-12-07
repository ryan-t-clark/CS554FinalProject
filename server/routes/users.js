const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validation = require('../validation');
const data = require('../data');
const USERS = data.users;


router.post('/signup',async(req,res) => {
  const information = req.body;
  username = information["username"];
  password = information["password"];
  try{
    username = validation.checkUserName(username,"username");
    password = validation.checkString(password,"password");
    if(password.indexOf(' ')>=0 || password.length<6) throw 'password is not long enough or contains empty spaces'
  }catch(e){
    res.status(400);
    res.json({"status":"error","error":e,"stack":e.stack})
    return;
  }
  try{
    const userresult = await USERS.createUser(username,password);
    if(userresult["userInserted"]==true){
      res.status(200);
      res.json({"status":"ok","username":username})
    }
    else{
      res.status(500);
      res.json({"status":"error","result":userresult});
    }
  }catch(e){
    res.status(400);
    res.json({"status":"error","error":e,"stack":e.stack});
    return;
  }

});

//
router.post('/login',async(req,res) => {
  const information = req.body;
  username = information["username"];
  password = information["password"];
  try{
    username = validation.checkUserName(username,"username");
    password = validation.checkString(password,"password");
    if(password.indexOf(' ')>=0 || password.length<6) throw 'password is not long enough or contains empty spaces'
  }catch(e){
    res.status(400);
    res.json({"status":"error","error":e,"stack":e.stack})
    return;
  }
  try{
    const userresult = await USERS.checkUser(username,password);
    if(userresult["authenticated"]){
      res.status(200);
      res.json({"status":"ok","username":username})
      return;
    }else{
      res.status(500);
      res.json({"status":"error","error":e,"stack":e.stack});
      return;
    }
  }
  catch(e){
    res.status(400);
    res.json({"status":"error","error":e,"stack":e.stack});
    return;
  }

});





module.exports = router;
