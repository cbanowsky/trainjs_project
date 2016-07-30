var Sequelize = require('sequelize');
var sequelize = CONFIG.database;

var userTest = sequelize.define('usertest', {
	
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = userTest;
