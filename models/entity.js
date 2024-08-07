const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const entitySchema = new mongoose.Schema({
  name:{type:String, required:true, unique:true},
  siret: {type: Number, required: true},
  streetNumber: {type: String, required: true},
  streetName: {type: String, required: true},
  postalCode:{type: Number, required: true},
  city: {type: String, required: true},
  contry: {type: String, required: true},
  legalFormat: {type: String, required: true}
});

entitySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Entity', entitySchema);