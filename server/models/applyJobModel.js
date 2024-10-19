const { Schema, model } = require("mongoose");

const appliedJobSchema = new Schema({
    jobs: {
        type: [Schema.Types.ObjectId], 
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
