const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
	let error = {
		...err,
	}

	error.message = err.message

	// console.log(err.stack.red);
	console.log(err)

	// Sequelize validation error
	if (err.name === 'SequelizeValidationError') {
		const message = []
		Object.values(err.errors).forEach((errr) => {
			message.push({
				field: errr.path,
				message: errr.message,
			})
		})
		error = new ErrorResponse(null, 400, message)
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.messageWithField || error.message || 'Server Error',
	})
}

module.exports = errorHandler
