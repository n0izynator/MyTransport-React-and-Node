const router = require('express').Router();
let Job = require('../models/job.model');

router.route('/').get((req, res) => {
    const jobs = Job.list();
    res.json(jobs);
});

module.exports = router;