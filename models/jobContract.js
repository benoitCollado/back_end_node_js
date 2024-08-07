const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jobContractSchema = new mongoose.Schema({
  startDate: {type: Date, required: true},
  endDate: {type: Date},
  hourCost: {type:Number, required:true},
  role: {type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true},
});

jobContractSchema.plugin(uniqueValidator);

module.exports = mongoose.model('JobContract', jobContractSchema);