const express = require('express');
const { applyForJob, getAppliedJob } = require('../controller/applyJob-controller');
const { setUserMiddleware } = require('../controller/authController');

const router = express.Router();

router.get('/getAppliedJob', setUserMiddleware, getAppliedJob);
router.post('/:jobId', setUserMiddleware, applyForJob);


module.exports = router;