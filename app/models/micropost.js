var Sequelize = require('sequelize');
var sequelize = CONFIG.database;

var Micropost = sequelize.define('micropost', {
	content: {
		type: Sequelize.TEXT,
	},
	user_id: {
		type: Sequelize.INTEGER,
	},

}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

Micropost.associations = [
	{ belongsTo: 'User' }
];

module.exports = Micropost;
