const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        //username: req.body.username,
        //entity: req.body.entity || "vide",
        email: req.body.email,
        password: hash,
      });
      console.log(user);
      user
        .save()
        .then(() => {
          res.status(201).json({
            message: "User created successfully",
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: err,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        sup: "signup function",
      });
    });
};

exports.login = (req, res, next) => {
  console.log(req.socket.remoteAddress);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Authentication failed. Wrong user, password combinaison.",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "pair login/mot de pass incorrecte",
            });
          }
          const userid = user._id;
          const date = Date.now();
          const validityDate = date + 3600 * 1000;
          const expires = { expiresIn: "1h" };
          const token = jwt.sign({ userId: userid }, date.toString(), {
            expiresIn: "1h",
          });
          const session = new Session({
            userid: userid,
            session_token: token,
            start: date,
            expires: validityDate,
          });
          session.save();
          console.log("userid : " + userid);
          return res.status(200).json({
            userId: userid,
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
            status: "stop not in time",
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        status: "stop in time",
      });
    });
};
