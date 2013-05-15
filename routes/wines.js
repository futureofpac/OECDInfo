var dburl = 'mongodb://dev:test@dharma.mongohq.com:10019/oecdinfo';
var collection = ['users'];
var db = require('mongojs').connect(dburl, collection);

function user (first, last, email) {
	this.first = first;
	this.last = last;
	this.email = email;
}

var user1 = new user('hoon', 'jung', 'daum');

db.users.save(user1, function(err, savedUser){
	if(err || !savedUser){
		console.log('err:' + err);
	}else{
		console.log('saved:' + savedUser.first);
	}
})

exports.fromMango = function(req, res){
	res.send('in mango')
	db.users.find(function(err, user){
		res.send('in find')
		if(err){
			console.log('err:' + err);
		}else{
			console.log('user:' + user);
			res.send(user);		
		}
	})
}


exports.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};