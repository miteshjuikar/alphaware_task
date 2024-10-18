const express = require('express');

const { addJob } = require('../../controller/admin-controller');

const router = express.Router();

router.post('/add', addJob);


module.exports = router;