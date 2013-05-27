var Twit = require('twit')

// Consumer key	YESBKjjb6RtIsDfKJbf1Q
// Consumer secret	ottkkdctP55j0VcDrG41nuLXD51FB9ab7KcnWLs
// Request token URL	https://api.twitter.com/oauth/request_token
// Authorize URL	https://api.twitter.com/oauth/authorize
// Access token URL	https://api.twitter.com/oauth/access_token
// Callback URL	http://pariscafe.herokuapp.com

console.log('run twit');

var T = new Twit({
    consumer_key:         'YESBKjjb6RtIsDfKJbf1Q'
  , consumer_secret:      'ottkkdctP55j0VcDrG41nuLXD51FB9ab7KcnWLs'
  , access_token:         '92711180-XKHDV6E0yFfjk92NHmR6c9nllUAq4pwcLTU27WA'
  , access_token_secret:  'yQLc0KEEurMlT78xO4MjztUIekpjCGCwaP8XGXoSsbk'
})

var express = require('express'),
	async = require('async'),
	wines = require('./routes/wines');
var app = express();

// app.set('jsonp callback name', 'callback');

app.get('/user_timeline/:screen_names', function(req, res){
	// console.log('Version: ' + process.version);


	var screen_names = req.params.screen_names.split(',');
	var tweets = [];

	async.parallel([
    	function(callback) {
		    async.forEach(screen_names, function(screen_name, callback) { //The second argument (callback) is the "task callback" for a specific messageId
				T.get('statuses/user_timeline', { screen_name: screen_name, exclude_replies: true },  function (err, data) {
					console.log('get user_timeline');
						// result = {};
					for(var i=0;i<data.length;i++){
						var tweet = {};
						tweet.title = data[i].text;
						tweet.pubDate = data[i].created_at;
						tweet.image = data[i].user.profile_image_url;
						// tweet.typeName = data[i].user.name;
						// tweet.link = data[i].user.entities.urls.expanded_url
						tweets.push(tweet);
					}
					callback();
				})
		    }, callback);
    	},
    	function(callback) {
				T.get('statuses/user_timeline', { screen_name: 'OCDE_francais', exclude_replies: true },  function (err, data) {
					console.log('get user_timeline');
						// result = {};
					for(var i=0;i<data.length;i++){
						var tweet = {};
						tweet.title = data[i].text;
						tweet.pubDate = data[i].created_at;
						tweet.image = data[i].user.profile_image_url;
						// tweet.typeName = data[i].user.name;
						// tweet.link = data[i].user.entities.urls.expanded_url
						tweets.push(tweet);
					}
					callback();
				})
    	}],
		function(err) {
			console.log('end');
	        // if (err) return next(err);
	        if (err) {
			console.log(err);

				res.send(err);
	        }else{
				res.jsonp(tweets);
	        }
	    }  
	);






});

app.get('/calltest', function(req, res){
	res.jsonp(test1({ user: 'tobi' }))
});


app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.get('/mango', wines.fromMango);
app.get('/register', wines.register);

// app.listen(3000);

var port = process.env.PORT || 5000;
app.listen(port);


//
//  tweet 'hello world!'
//
// T.post('statuses/update', { status: 'hello world!' }, function(err, reply) {
//   //  ...
// })

//
//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
//
// T.get('search/tweets', { q: 'banana since:2011-11-11' }, function(err, reply) {
// 	// console.log('search/tweets:');
// 	// console.log(reply);
//   //  ...
// })

//
//  get the list of user id's that follow @tolga_tezel
//

//
//  stream a sample of public statuses

// var stream = T.stream('statuses/sample')

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

// //
// //  filter the twitter public stream by the word 'mango'. 
// //
// var stream = T.stream('statuses/filter', { track: 'mango' })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

// //
// // filter the public stream by the latitude/longitude bounded box of San Francisco
// //
// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

// var stream = T.stream('statuses/filter', { locations: sanFrancisco })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })
