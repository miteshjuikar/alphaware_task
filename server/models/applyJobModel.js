const { Schema, model } = require("mongoose");

const appliedJobSchema = new Schema({
    jobs: { // Renamed to jobs to indicate it's an array
        type: [Schema.Types.ObjectId], // Array of ObjectId
        ref: "job",
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

const ApplyJob = model("applyJob", appliedJobSchema);

module.exports = ApplyJob;
