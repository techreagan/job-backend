const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const { Job } = require('../models')

// @desc    Get all jobs
// @route   GET /api/v1/jobs
// @access  Public
exports.getJobs = asyncHandler(async (req, res, next) => {
	// Pagination
	const page = parseInt(req.query.page, 10) || 1
	const limit = parseInt(req.query.limit, 10) || 10
	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const { count, rows } = await Job.findAndCountAll({
		limit,
		offset: startIndex,
	})

	const totalPage = Math.ceil(count / limit)

	// Pagination result
	const pagination = {}

	if (endIndex < count) {
		pagination.next = {
			page: page + 1,
			limit,
		}
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		}
	}

	return res
		.status(200)
		.json({ success: true, data: { count, pagination, totalPage, jobs: rows } })
})

// @desc    Get single job
// @route   GET /api/v1/jobs/:id
// @access  Public
exports.getJob = asyncHandler(async (req, res, next) => {
	const job = await Job.findByPk(req.params.id)

	if (!job)
		return next(new ErrorResponse(`No job with that id of ${req.params.id}`))

	res.status(200).json({ success: true, data: job })
})

// @desc    Create job
// @route   POST /api/v1/jobs
// @access  Public
exports.createJob = asyncHandler(async (req, res, next) => {
	const job = await Job.create(req.body)

	res.status(201).json({ success: true, data: job })
})

// @desc    Update job
// @route   PUT /api/v1/jobs/:id
// @access  Public
exports.updateJob = asyncHandler(async (req, res, next) => {
	let job = await Job.findByPk(req.params.id)

	if (!job)
		return next(new ErrorResponse(`No job with that id of ${req.params.id}`))

	job = await job.update(req.body)

	res.status(200).json({ success: true, data: job })
})

// @desc    Delete job
// @route   DELETE /api/v1/jobs/:id
// @access  Public
exports.deleteJob = asyncHandler(async (req, res, next) => {
	const job = await Job.findByPk(req.params.id)

	if (!job)
		return next(new ErrorResponse(`No job with that id of ${req.params.id}`))

	await Job.destroy({ where: { id: req.params.id } })

	res.status(200).json({ success: true, data: {} })
})
