const express = require('express');
const jwt = require('jsonwebtoken');
const { applyForJob } = require('../controller/applyJob-controller');

const router = express.Router();

router.post('/:jobId', (req, res,next)=>{
        const token = req.cookies.token; 
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.createdBy = decodedToken;

        next();
    },
applyForJob);


module.exports = router;