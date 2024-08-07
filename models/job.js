const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jobSchema = new mongoose.Schema({
idUser : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
idEntity : {type: mongoose.Schema.Types.ObjectId, ref: "Entity", required: true},
startdate : {type: Dates, required: true},
enddate : {type: Dates},
});

jobSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Job', jobSchema);