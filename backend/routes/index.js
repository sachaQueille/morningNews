var express = require('express');
var router = express.Router();

let userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async(req, res, next) => {

  let newUser = new userModel ({
    userName: req.body.usernameFromFront,
    mail: req.body.emailFromFront,
    pwd: req.body.passwordFromFront,

  })

  let result = false
  let userExist = await userModel.findOne({mail: req.body.emailFromFront});

  if(newUser.userName && newUser.mail && newUser.pwd  &&  !userExist){
     await newUser.save();
    result = true
  } 

  res.json({result});
});

router.post('/sign-in', async(req, res, next) => {

  let userExist = await userModel.findOne({mail: req.body.emailFromFront, pwd:req.body.passwordFromFront });

  let result = false

  if(req.body.emailFromFront && req.body.passwordFromFront && userExist) {
    result = true
  }
  res.json({result});
});

module.exports = router;
