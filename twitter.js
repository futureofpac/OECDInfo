var Twit = require('twit')

var FeedParser = require('feedparser')
  , request = require('request');

var _ = require ('underscore');

var youtube = require('youtube-feeds')

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

app.get('/all/:screen_names', function(req, res){
	// console.log('Version: ' + process.version);


	var screen_names = req.params.screen_names.split(',');


	var feeds = {};

	feeds['tweets'] = [];
	feeds['news'] = [];
	feeds['youtube'] = [];
	feeds['error'] = [];
	feeds['called'] = [];

	async.parallel([
		function(callback) {
			var playlistkeys = [
			    'PL7D00C15B1EA60D89',
			    'PL96BBC83DFCD8447E'
			];
		    async.forEach(playlistkeys, function(key, callback) { //The second argument (callback) is the "task callback" for a specific messageId
				// PL7D00C15B1EA60D89
			 	youtube.feeds.playlist(key,{'max-results':10},function(err, videos){
			 		feeds['youtube'].push(videos);
			 		callback();
			 	})
		    }, callback);
    	},		
    	function(callback) {
		    async.forEach(screen_names, function(screen_name, callback) { //The second argument (callback) is the "task callback" for a specific messageId
				T.get('statuses/user_timeline', { screen_name: screen_name, exclude_replies: true, count: 10 },  function (err, data) {
					console.log('get user_timeline');
						// result = {};
					for(var i=0;i<data.length;i++){
						var tweet = {};
						tweet.title = data[i].text;
						tweet.pubDate = data[i].created_at;
						tweet.image = data[i].user.profile_image_url;
						tweet.typeName = data[i].user.name;
						// tweet.link = data[i].user.entities.urls.expanded_url
						feeds['tweets'].push(tweet);
					}
					callback();
				})
		    }, callback);
    	},
    	function(callback) {
    		var news_urls = [
			    'http://feeds.feedburner.com/OecdObserver'
			    ,
			    'http://www.oecd.org/newsroom/index.xml',
			    'http://oecdinsights.org/feed/'
			];


    		var topics = ['agriculture','corruption','chemicalsafety','competition','corporate','development','economy','education','employment','environment','finance','greengrowth','health','industry','innovation','insurance','migration','internet','investment','governance','regional','regreform','science','social','tax','trade'];
    		_.each(topics, function (item, index) {
    			news_urls.push('http://www.oecd.org/'+ item +'/index.xml');
    		});

    		var pub_keys = [30,40,79,31,33,34,36,37,39,77,41,42,43,45,78,48,46,];
    		_.each(pub_keys, function (item, index) {
    			news_urls.push('http://www.oecd-ilibrary.org/rss/content/subject/'+ item +'/latest?fmt=rss');
    		});
			var count = 0;

		    async.forEach(news_urls, function(url, callback) { 
				// feeds['called'].push(url);

				count = 0;
				request(url)
					.pipe(new FeedParser())
					.on('error', function(error) {
						// always handle errors
						feeds['error'].push(error);
					})
					// .on('meta', function (meta) {
					// feeds['called'].push(['meta']);
					// // do something
					// })
					.on('article', function (article) {
						if(count < 5){
							var news = {};
							news.title = article.title;
							news.pubDate = article.pubDate;
							news.link = article.link;

							feeds['news'].push(news);
						}
						count++;
					// do something else
					})
					.on('end', function () {
					// do the next thing
					// feeds['called'].push(['end']);
						count = 0;
						callback();
					});
		    }, callback);
    	}],
		function(err) {
			console.log('end');
	        // if (err) return next(err);
	        if (err) {
				console.log(err);
				res.send(err);
	        }else{
	        	// console.log(feeds['news']);
	        	// console.log(feeds['tweets']);
	        	// console.log(feeds['error']);
				res.jsonp(feeds['news'].concat(feeds['tweets']).concat(feeds['youtube']));
				// res.jsonp(feeds['called']);
	        }
	    }  
	);






});

app.get('/calltest', function(req, res){
	// res.jsonp(test1({ user: 'tobi' }))
	// 'http://www.oecd.org/newsroom/index.xml',
	// var url = 'http://oecdinsights.org/feed/';


			var news_urls = [
			    'http://feeds.feedburner.com/OecdObserver'
			    ,
			    'http://www.oecd.org/newsroom/index.xml',
			    'http://oecdinsights.org/feed/'
			];


    		// var topics = ['agriculture','corruption','chemicalsafety','competition','corporate','development','economy','education','employment','environment','finance','greengrowth','health','industry','innovation','insurance','migration','internet','investment','governance','regional','regreform','science','social','tax','trade'];
    		// _.each(topics, function (item, index) {
    		// 	news_urls.push('http://www.oecd.org/'+ item +'/index.xml');
    		// });

    		// var pub_keys = [30,40,79,31,33,34,36,37,39,77,41,42,43,45,78,48,46,];
    		// _.each(pub_keys, function (item, index) {
    		// 	news_urls.push('http://www.oecd-ilibrary.org/rss/content/subject/'+ item +'/latest?fmt=rss');
    		// });

			var result = [];
			var feeds = {};

			feeds['tweets'] = [];
			feeds['news'] = [];
			feeds['error'] = [];
			feeds['called'] = [];

		    async.forEach(news_urls, function(url, callback) { 
				// feeds['called'].push(url);

					request(url)
					.pipe(new FeedParser())
					.on('error', function(error) {
					// always handle errors
						// feeds['error'].push(error);
					})
					.on('meta', function (meta) {
						result.push(['meta']);
					// do something
					})
					.on('article', function (article) {
						var news = {};
						news.title = article.title;
						news.pubDate = article.pubDate;
						news.link = article.link;

						result.push(news);
					// do something else
					})
					.on('end', function () {
					// do the next thing
						result.push(['end']);
											callback();

					});


				// request(url, function(error, response, body){
				// 	if(!error && response.statusCode == 200){
				// 		result.push(body);	
				// 	}
				// })
			}, function(err){
				res.jsonp(result);
			});


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
