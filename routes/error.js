var dburl = process.env.mongodb_uri;

var collection = ['error'];
var db = require('mongojs').connect(dburl, collection);

function saveError(param){
	db.error.save({
		stack:param.stack,
		createdat: (new Date())
	})
}

module.exports.saveError = saveError;
