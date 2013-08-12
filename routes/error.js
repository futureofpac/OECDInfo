var dburl = process.env.mongodb_uri,
	collection = ['error'],
	fs = require('fs'),
	db = require('mongojs').connect(dburl, collection);

function saveError(param){
	db.error.save({
		stack:param.stack,
		createdat: (new Date())
	})
}

function writeError(param){
	var msg = 
  			'\r\n\r\n====================================================== \r\n' +
  			'Created at ' + (new Date()) + '\r\n' +
  			'====================================================== \r\n' + 
  			param.stack

	fs.appendFile('./errors/error.txt', msg, function (err) {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});  	
}

function readError(callback){
	fs.readFile('./errors/error.txt', function (err, data) {
	  if (err) throw err;
	  callback(data);
	});
}

module.exports.saveError = saveError;
module.exports.writeError = writeError;
module.exports.readError = readError;
