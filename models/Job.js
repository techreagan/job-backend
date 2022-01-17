'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Job extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Job.init(
		{
			title: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [5],
						msg: 'Title must be five(5) characters long',
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [5],
						msg: 'Description must be five(5) characters long',
					},
				},
			},
			type: {
				type: DataTypes.STRING,
				validate: {
					isIn: {
						args: [
							['full time', 'part time', 'internship', 'contract', 'remote'],
						],
						msg: 'Please choose a valid job type',
					},
				},
			},
			country: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'Country is required',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Job',
		}
	)
	return Job
}
