const jobContract = require("../models/jobContract");

module.exports = (req, res, next) =>{
  jobContract.findOne({entity: req.params.entity, userid: req.user, status: "waiting"})
  .then((contract)=>{
    if(contract){
      if(contract.role == "admin"){
        next();
      }
      else{
        return res.status(401).json({
          message:"non autorisé"
        });
      }
    }.else{
      return res.status(401).json({
        message:"non autorisé"
      });
    }
  })
  .catch((error)=>{
    return res.status(500).json({
      error: error,
      message: "internal error"
    });
  })  
};