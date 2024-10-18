const express = require('express');

const { fetchAllJobs } = require('../controller/jobListController');

const router = express.Router();

router.get('/get', fetchAllJobs);


module.exports = router;