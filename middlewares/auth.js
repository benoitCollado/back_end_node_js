const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  Session.findOne({ session_token: req.body.session_token })
  .then((session) => {
    if (session) {
      if (!session.isExpired()) {
        session.expires = Date.now() + 300 * 1000;
        session.save();
        const decodedToken = jwt.verify(session.session_token, "RANDOM_TOKEN_SECRET");
        const userid = decodedToken.userId;
        req.user = userid;
        next();
      }
    }
  })
  .catch( (error) => {
    res.status(401).json({
      error: error,
  });
/*  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    console.log("decoded token : ", decodedToken);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }*/
};