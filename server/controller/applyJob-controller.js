const ApplyJob = require('../models/applyJobModel');
const Job = require('../models/jobModel');
const User = require('../models/user');

const applyForJob = async (req, res) => {
    const jobId = req.params.jobId;
    const createdBy = req.createdBy;

    try {
        if (!jobId || !createdBy) {
            return res.json({ 
                success: true,
                message: "Job ID and creator ID are required." 
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.json({success: true, message: "Job not found." });
        }
        
        // Check if the user exists
        const userExists = await User.findById(createdBy.id);
        if (!userExists) {
            return res.json({ success: true, message: "User not found." });
        }

        // Check if an application already exists for the user
        let application = await ApplyJob.findOne({ createdBy: createdBy.id });

        if (application) {
            // Check jobId in  array
            if (application.jobs.includes(jobId)) {
                return res.json({ 
                    success: false,
                    message: "You have already applied for this job." 
                });
            } else {
                // Push Job object in array
                application.jobs.push(jobId);
                await application.save();
            }
        } else {
            // create a new one
            application = new ApplyJob({
                jobs: [jobId],
                createdBy: createdBy.id,
            });
            await application.save();
        }

        res.status(201).json({
            success: true,
            message: "Job application submitted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Apply job error." });
    }
};

const getAppliedJob = async (req, res) => {
    try {
        const userId = req.createdBy.id; 

        const appliedJobs = await ApplyJob.findOne({ createdBy: userId }).populate('jobs');

        if (!appliedJobs) {
            return res.status(201).json({ success: false, message: "No applied jobs found for this user."});
        }

        res.status(201).json({ success: true, message: "Applied Job List", data: appliedJobs});

    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json({ success:false, message: "Server error"});
    }
}

module.exports = { applyForJob, getAppliedJob };
