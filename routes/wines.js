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

exports.register = function(req, res){
   	res.send("Register hit")
   	db.users.findOne({first:'hoon'}, function(err, users) {
   		console.log(res);
   		console.log('reg2');
   		console.log(err);
   		console.log(users);
	   	// res.send("Register hit2")
    	// res.send(err)
    	// res.send(users);
 	})
 }


exports.fromMango = function(req, res){
	res.send('in mango')
	console.log(db);
	console.log(db.users);

	db.users.find().forEach(function(err, user) {
		res.send('in find')
		if(err){
			console.log('err:' + err);
		}else{
			console.log('user:' + user);
			res.send(user);		
		}
	})
}

// 	db.users.find(function(err, user){
// 		res.send('in find')
// 		if(err){
// 			console.log('err:' + err);
// 		}else{
// 			console.log('user:' + user);
// 			res.send(user);		
// 		}
// 	})
// }


exports.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};