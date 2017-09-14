const sql = require("../util/sql");
const Sequelize = require("sequelize");

module.exports = sql.define("post", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING(155),
		notNull: true,
	},
	date: {
		type: Sequelize.STRING(100),
		notNull: true,
	},
	body: {
		type: Sequelize.STRING(1000),
		notNull: true,
	}
});
