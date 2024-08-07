const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");
const JobContract = require("../models/jobContract");

exports.getUsers = (req, res, next) => {
  JobContract.find({entity: req.body.entity})
  .then((users)=>{
    return res.status(200).json({
      users: users,
    });
  })
  .catch((error)=>{
    return res.status(500).json({
      error: error,
      message: "internal error",
    })
  });
};

exports.getUser = (req, res, next) => {
  JobContract.findOne({entity: req.body.entity, userid: req.body.userid})
  .then((user)=>{
    return res.status(200).json({
      user: user,
    });
  })
  .catch((error)=>{
    return res.status(500).json({
      error: error,
      message: "internal error",
    })
  });
};

exports.addUser = (req, res, next) => {
  const find = false;
  User.findOne({email: req.body.email})
  .then((user)=>{
    if (user) {
      find = true;
      let entity = null;
      Entity.findOne({name: req.body.entity})
      .then(entityObj => {
        entity = entityObj;
      })
      .catch((error)=>{
        return res.status(500).json({
          error: error,
          message: "internal error",
        })
      });
      const jobContract = new JobContract({
        userid: user._id,
        entity: entity._id,
        start: req.body.start,
        role: req.body.role,
        status: "waiting"
      });
      jobContract.save()
      //envoyer un email avec un code permettant d'accepter un email 
      return res.status(200).json({
        message: "invitation envoyée"
      });
    }else{
      //envoyer un message d'invitation à la creation d'un compte.
      return res.status(200).json({
        message: "invitation envoyée"
      });
    }
  })
  .catch((error)=>{
    return res.status(500).json({
      error: error,
      message: "internal error",
    })
  });
};