const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
    company: String,
    position: String,
    contract: String,
    location: String,
},   
    { timestamps: true }
);

const Job = model('job', jobSchema);

module.exports = Job;