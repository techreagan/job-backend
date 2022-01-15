const express = require('express')
const {
	getJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
} = require('../controllers/jobs')

const router = express.Router()

router.route('/').get(getJobs).post(createJob)

router.route('/:id').get(getJob).put(updateJob).delete(deleteJob)

module.exports = router
