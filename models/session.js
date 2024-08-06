const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sessionSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  session_token: { type: String, required: true, unique: true },
  start: { type: Date, required: true },
  expires: { type: Date, required: true },
});

sessionSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Session", sessionSchema);
