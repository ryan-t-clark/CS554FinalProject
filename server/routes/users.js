const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validation = require('../validation');
const data = require('../data');
const xss = require('xss');
const USERS = data.users;


router.post('/signup',async(req,res) => {
  const information = req.body;
  username = information["username"];
  password = information["password"];

  username = xss(username);
  password = xss(password);

  try{
    username = validation.checkUserName(username,"username");
    password = validation.checkString(password,"password");
    validation.checkPassword(password);
  }catch(e){
    res.status(400);
    res.json({"status":"error","error":e,"stack":e.stack})
    return;
  }
  try{
    const userresult = await USERS.createUser(username, password, false);
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

  username = xss(username);
  password = xss(password);

  try{
    username = validation.checkUserName(username,"username");
    password = validation.checkString(password,"password");
    validation.checkPassword(password);
  }catch(e){
    res.status(400);
    res.json({"status":"error","error":e,"stack":e.stack})
    return;
  }
  try{
    const userresult = await USERS.checkUser(username,password);
    if(userresult["authenticated"]){
      res.status(200);
      res.json({ "status":"ok", 'user': userresult })
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


router.get('/standings', async (req, res) => {

  try {
      let result = await USERS.getStandings();
      return res.json(result);
  } catch (e) {
      return res.status(404).json({error: e});
  }

});


router.get('/profile/:id', async (req, res) => {
  let id = req.params.id;

  id = xss(id);

  try {
    validation.checkId(id);
  } catch (e) {
      return res.status(400).json({error: e});
  }

  // const session = Cookies.get('userId');
  try {
      let result = await USERS.getUserById(id);
      return res.json(result);
  } catch (e) {
      return res.status(404).json({error: e});
  }
});

router.post("/updateImage/:id",async (req,res) =>{ //add error catching
  console.log(req.files);
  // let uploadFile = req.files.file
  // const fileName = req.files.file.name
  // uploadFile.mv(
  //   `${__dirname}/public/files/${fileName}`,
  //   function (err) {
  //     if (err) {
  //       return res.status(500).send(err)
  //     }
  //     res.json({
  //       file: `public/${req.files.file.name}`,
  //     })
  //   },
  // )
  // console.log(req+res);
  // let id = req.params.id;
  // try {
    // validation.checkId(id);
  // } catch (e) {
      // return res.status(400).json({error: e});
  // }
  // console.log(req);

  // try{
    // let result = await USERS.updateImage(id,req.body["image"]);
      // return res.json(result);
  // } catch(e){
    // return res.status(404).json({error: e});
  // }
})


module.exports = router;
