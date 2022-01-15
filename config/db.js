const { sequelize } = require('../models')

const DBconnection = async () => {
	const conn = await sequelize.authenticate().catch((err) => {
		console.log(`For some reasons we couldn't connect to the DB`.red, err)
	})

	console.log(`MYSQL Connected: ${sequelize.config.host}`.cyan.underline.bold)
}

module.exports = DBconnection
