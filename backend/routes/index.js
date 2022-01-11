var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var uid2 = require("uid2");

let userModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sign-up", async (req, res, next) => {
  let hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

  let newUser = new userModel({
    userName: req.body.usernameFromFront,
    mail: req.body.emailFromFront,
    pwd: hash,
    token: uid2(32),
  });

  let result = false;
  let userExist = await userModel.findOne({ mail: req.body.emailFromFront });

  if (newUser.userName && newUser.mail && newUser.pwd && !userExist) {
    await newUser.save();
    result = true;
    res.json({ result, token: newUser.token });
  } else {
    result = false;
    res.json({});
  }
});

router.post("/sign-in", async (req, res, next) => {
  let userExist = await userModel.findOne({
    mail: req.body.emailFromFront,
  });

  let password = req.body.passwordFromFront;

  let result = false;

  if (userExist) {
    if (bcrypt.compareSync(password, userExist.pwd)) {
      result = true;
      res.json({ result, token: userExist.token });
    } else {
      result = false;
      res.json({ result });
    }
  } else {
    result = false;
    res.json({ result });
  }
});

module.exports = router;
