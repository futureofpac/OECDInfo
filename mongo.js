var dburl = 'localhost/mongoapp';
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