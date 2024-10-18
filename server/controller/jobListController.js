const Job = require("../models/jobModel");

//fetch all jobs
const fetchAllJobs = async(req,res) => {
    try {
        const listOfJobs = await Job.find({});
        res.status(200).json({
            success: true,
            data: listOfJobs
        });
    } catch (error) {
        req.status(500).json({
            success: false,
            message: 'Error Occured'
        })
    }
}


module.exports = { fetchAllJobs };

