'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' })
const db = {}

let sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.password,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	}
)

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		)
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		)
		db[model.name] = model
	})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
// db.Sequelize = Sequelize

module.exports = db
