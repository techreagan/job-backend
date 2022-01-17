const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({ path: './config/.env' })

const jobRoutes = require('./routes/jobs')

const app = express()

app.use(express.json())

app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100, // 100 request per 10 mins
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// app.use((req, res, next) => {
// 	setTimeout(() => {
// 		next()
// 	}, 1000)
// })

const versionOne = (routeName) => `/api/v1/${routeName}`

app.use(versionOne('jobs'), jobRoutes)

app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
	DBConnection()
	console.log(
		`We are live on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red)
	// Close server & exit process
	server.close(() => process.exit(1))
})
