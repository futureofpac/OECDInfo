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
	wines = require('./routes/wines');
var app = express();

app.get('/', function(req, res){
	// console.log('Version: ' + process.version);
  // res.send('hello world11');

 //  var test = {
	//   "name": "hello-world",
	//   "description": "hello world test app",
	//   "version": "0.0.1",
	//   "dependencies": {
	//     "express": "3.x"
	//   }
	// }

	// res.send(test);

	T.get('statuses/user_timeline', { screen_name: 'oecd' },  function (err, reply) {
		console.log('oecd start');
		console.log(reply);
		res.send(reply);
	  //  ...    
	})


});

app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.get('/mango', wines.fromMango);
app.get('/register', wines.register);

app.listen(3000);

// var port = process.env.PORT || 5000;
// app.listen(port);


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
