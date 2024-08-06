const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sessionSchema = new mongoose.Schema({
  userid: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  session_token: { type: String, required: true, unique: true },
  start: { type: Number, required: true },
  expires: { type: Number, required: true },
});

sessionSchema.plugin(uniqueValidator);

sessionSchema.methods.isExpired = function () {
  return this.expires < Date.now();
};

sessionSchema;

module.exports = mongoose.model("Session", sessionSchema);
