// const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' })

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	production: {
		username: process.env.PROD_DB_USER,
		password: process.env.PROD_DB_PASS,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOST,
		port: process.env.PROD_DB_PORT,
		dialect: process.env.PROD_DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
}
