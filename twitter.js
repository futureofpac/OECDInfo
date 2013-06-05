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

app.use(express.static(__dirname + '/public'));

// asfas



var Flickr = require('flickr').Flickr;
var flickrApi = new Flickr('1051127fe1d2ccd24525bee93ffd4129', '73d19cf2007d389e');

// app.set('jsonp callback name', 'callback');

app.get('/all/:screen_names/:numberofdays', function(req, res){
	// console.log('Version: ' + process.version);


	var screen_names = req.params.screen_names.split(',');
	var numberofdays = req.params.numberofdays

	var today = new Date();
	var today2 = new Date();
	// var numberofdays = 7;
	var startDate = new Date(today.setDate(today.getDate() - numberofdays));
	var endDate = new Date(today2.setDate(today2.getDate() + 1));
	var datenotchecked = true;

	var feeds = {};

	feeds['tweets'] = [];
	feeds['news'] = [];
	feeds['youtube'] = [];
	feeds['flickr'] = [];
	feeds['error'] = [];
	feeds['called'] = [];

	async.parallel([
		function(callback) {
			var playlistkeys = [
			    'PL7D00C15B1EA60D89',
			    'PL96BBC83DFCD8447E'
			];
		    async.forEach(playlistkeys, function(key, callback) { //The second argument (callback) is the "task callback" for a specific messageId
			 	youtube.feeds.playlist(key,{'max-results':7},function(err, videos){
			 		_.each(videos.items, function(item, index){
				 		var video = {};
			 			video.title = item.video.title;
			 			video.pubDate = new Date(item.video.uploaded);
			 			video.link = item.video.player.default;
			 			video.content = item.video.description;
			 			video.typeName = 'Youtube';
			 			video.image = "http://i.ytimg.com/vi/" + item.video.id + "/default.jpg";

				 		feeds['youtube'].push(video);
			 		})
			 		callback();
			 	})
		    }, callback);
    	},		
		function(callback) {
			flickrApi.executeAPIRequest('flickr.people.getPublicPhotos', {'user_id':'32771300@N02', 'extras':'date_taken,description','page':1,'per_page':50}, true, function(err, data){
		 		_.each(data.photos.photo, function(item, index){

					var flickr = {};
					flickr.title = item.title;
					flickr.content = item.description._content;
					flickr.pubDate = new Date(item.datetaken);
					flickr.image = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret, 
					flickr.typeName = 'Flickr';

					feeds['flickr'].push(flickr);
		 		});
				callback();
			}); 
    	},	    	
    	function(callback) {
		    async.forEach(screen_names, function(screen_name, callback) { //The second argument (callback) is the "task callback" for a specific messageId
				T.get('statuses/user_timeline', { screen_name: screen_name, exclude_replies: true, count: 20 },  function (err, data) {
					console.log('get user_timeline');
						// result = {};
					for(var i=0;i<data.length;i++){
						var tweet = {};
						tweet.title = data[i].text;
						tweet.pubDate = new Date(data[i].created_at);
						// tweet.image = data[i].user.profile_image_url;
						tweet.image = data[i].user.profile_image_url;
						tweet.typeName = 'Twitter';
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


    		// var topics = ['agriculture','corruption','chemicalsafety','competition','corporate','development','economy','education','employment','environment','finance','greengrowth','health','industry','innovation','insurance','migration','internet','investment','governance','regional','regreform','science','social','tax','trade'];
    		// _.each(topics, function (item, index) {
    		// 	news_urls.push('http://www.oecd.org/'+ item +'/index.xml');
    		// });

    		var pub_keys = [30,40,79,31,33,34,36,37,39,77,41,42,43,45,78,48,46,];
    		_.each(pub_keys, function (item, index) {
    			news_urls.push('http://www.oecd-ilibrary.org/rss/content/subject/'+ item +'/latest?fmt=rss');
    		});
			var count = 0;

			console.log('how many time?');

		    async.forEach(news_urls, function(url, callback) { 
				// feeds['called'].push(url);
				datenotchecked = true;

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
						// if(count < 10){

						if(datenotchecked && article.pubDate != null && article.pubDate != ''){
							var articleDate = new Date(article.pubDate);


							if(startDate < articleDate && endDate > articleDate){
								var news = {};
								news.title = article.title;
								news.pubDate = articleDate;
								news.link = article.link;
								news.content = article.summary;
								news.typeName = 'News';

								feeds['news'].push(news);
							}else{
							// console.log(articleDate);
								// datenotchecked = false;
							}
						}	
					// do something else
					})
					.on('end', function () {
					// do the next thing
					// feeds['called'].push(['end']);
						datenotchecked = true;
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
	        	var result = [];
	        	result = feeds['news'].concat(feeds['tweets']).concat(feeds['youtube']).concat(feeds['flickr']);

	        	console.log('result.length: ');
	        	console.log(result.length);
	        	result = _.sortBy(result, function(item){
	        		return item.pubDate;
	        	});

				res.jsonp(result.reverse());
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


