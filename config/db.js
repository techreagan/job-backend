const { sequelize } = require('../models')

const DBconnection = async () => {
	sequelize
		.authenticate()
		.then(() => {
			console.log(
				`MYSQL Connected: ${sequelize.config.host}`.cyan.underline.bold
			)
		})
		.catch((err) => {
			console.log(`For some reasons we couldn't connect to the DB`.red, err)
			return
		})
}

module.exports = DBconnection
