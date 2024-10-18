const Job = require("../models/jobModel");

//add new job
const addJob = async(req,res) => {
    try {
        const { company, position, contract, location } = req.body;
  
        const createNewJob = new Job({
            company,
            position,
            contract,
            location
        });

        await createNewJob.save();
        res.status(200).json({
            success: true,
            data: "New Job Created",
        });

    } catch (error) {
        req.status(500).json({
            success: false,
            message: 'Error Occured'
        })
    }
}


module.exports = { addJob };

