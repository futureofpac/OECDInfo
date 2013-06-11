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

app.get('/api/:themes/:days', function(req, res){

	var themes = req.params.themes.split(',');
	var numberofdays = req.params.days;

	var today = new Date();
	var today2 = new Date();
	var startDate = new Date(today.setDate(today.getDate() - numberofdays));
	var endDate = new Date(today2.setDate(today2.getDate() + 1));
	var datenotchecked = true;

	var feeds = {};

	feeds['tweets'] = [];
	feeds['news'] = [];
	feeds['article'] = [];
	feeds['publication'] = [];
	feeds['youtube'] = [];
	feeds['flickr'] = [];
	feeds['error'] = [];
	feeds['called'] = [];

	var getUrl = function (themes, type) {
		var result = [];
		_.each(themes, function (theme, index) {
			if(themeUrls[theme][type]){
				_.each(themeUrls[theme][type], function (item) {
					var item = {
						'type':type,
						'theme':theme,
						'url':(item.url ? item.url : item),
						'provider':(item.provider ? item.provider : '')
					}
					result.push(item);
				})
			}
		});
		return result;
	} 

    		// var pub_keys = [30,40,79,31,33,34,36,37,39,77,41,42,43,45,78,48,46,];
    		// _.each(pub_keys, function (item, index) {
    		// 	news_urls.push('http://www.oecd-ilibrary.org/rss/content/subject/'+ item +'/latest?fmt=rss');
    		// });

	var themeUrls = {
		'Generic' : {
			'Twitter' : [
				'OECDlive',
				'OECD_Stat',
				'OECD',
				'OECD_Pubs'
			],
			'News' : [
			    {provider:{name:'Observer', logo:'http://profile.ak.fbcdn.net/hprofile-ak-prn1/50250_160758993981155_1215480564_q.jpg', description:'An award-winning magazine to keep you ahead of today\'s economic and social policy challenges.', url:'http://www.oecdobserver.org/'}, url:'http://feeds.feedburner.com/OecdObserver'},
			    {provider:{name:'Newsroom', logo:'http://profile.ak.fbcdn.net/hprofile-ak-prn1/50250_160758993981155_1215480564_q.jpg', description:'OECD Newsroom', url:'http://www.oecd.org'}, url:'http://www.oecd.org/newsroom/index.xml'}
			],
			'Blog' : [
				{provider:{name:'OECD Insights',logo:'http://www.epha.org/local/cache-vignettes/L200xH104/arton5169-fd6c0.png', description:'The OECD Insights series explains the important issues facing society in a way that is clear and comprehensible.', url:'http://oecdinsights.org/'}, url:'http://oecdinsights.org/feed/'}
				// {url:'http://oecdinsights.org/feed/'}
			]
		},
		'Agriculture' : {
			'Twitter' : [
				'OECDagriculture',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/30/latest?fmt=rss'
			]
		},
		'Development' : {
			'Twitter' : [
				'OECD_Centre',
				'OECD_EVALNET',
				'OECD_INCAF',
				'OECDdev'
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/40/latest?fmt=rss'
			],
			'Blog' : [
				{provider:{name:'The progress blog', description:'Blogging for progress in Society', url:'http://theblogprogress.blogspot.fr/'}, url:'http://feeds.feedburner.com/blogspot/theprogressblog'}
			]
		},
		'Economics' : {
			'Twitter' : [
				'OECDeconomy',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/79/latest?fmt=rss'
			]
		},
		'Education' : {
			'Twitter' : [
				'oecd_edu',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/31/latest?fmt=rss'
			],
			'Blog' : [
				{provider:{name:'Educationtoday', description:'Global perspective on education', url:'http://oecdeducationtoday.blogspot.fr'}, url:'http://oecdeducationtoday.blogspot.com/feeds/posts/default'}
			]
		},
		'Employment' : {
			'Twitter' : [
				'OECD_leed',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/33/latest?fmt=rss'
			]
		},
		'Energy' : {
			'Twitter' : [
				'IEA',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/34/latest?fmt=rss'
			]
		},
		'Environment' : {
			'Twitter' : [
				'OECD_ENV',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/36/latest?fmt=rss'
			]
		},
		'Finance' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/37/latest?fmt=rss'
			]
		},
		'Governance' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/39/latest?fmt=rss'
			]
		},
		'Industry' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/77/latest?fmt=rss'
			]
		},
		'Nuclear' : {
			'Twitter' : [
				'OECD_NEA',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/41/latest?fmt=rss'
			]
		},
		'Science' : {
			'Twitter' : [
				'OECDinnovation',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/42/latest?fmt=rss'
			]
		},
		'Social' : {
			'Twitter' : [
				'',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/43/latest?fmt=rss'
			],
			'Blog' : [
				{provider:{name:'Better Life Index', description:'Your Better Life Index is designed to let you visualise and compare some of the key factors – like education, housing, environment, and so on', logo:'http://www.epha.org/local/cache-vignettes/L200xH104/arton5169-fd6c0.png', url:'http://www.oecdbetterlifeindex.org/'}, url:'http://www.oecdbetterlifeindex.org/feed/'}
			]
		},
		'Taxation' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/45/latest?fmt=rss'
			]
		},
		'Trade' : {
			'Twitter' : [
				'OECDtrade',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/78/latest?fmt=rss'
			]
		},
		'Transport' : {
			'Twitter' : [
				'ITF_Forum',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/48/latest?fmt=rss'
			]
		},
		'Urban' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/46/latest?fmt=rss'
			]
		}
	}

	async.parallel([
		function(callback) {
			var playlistkeys = [
			    'PL7D00C15B1EA60D89',
			    'PL96BBC83DFCD8447E'
			];
		    async.forEach(playlistkeys, function(key, callback) { //The second argument (callback) is the "task callback" for a specific messageId
			 	youtube.feeds.playlist(key,{'max-results':20},function(err, videos){
			 		_.each(videos.items, function(item, index){
				 		var video = {};
			 			video.typeName = 'Youtube';
			 			video.theme = 'generic';
			 			video.title = item.video.title;
			 			video.image = "http://i.ytimg.com/vi/" + item.video.id + "/default.jpg";
			 			video.content = item.video.description;
			 			video.pubDate = new Date(item.video.uploaded);
			 			// video.link = item.video.player.default;

				 		feeds['youtube'].push(video);
			 		})
			 		callback();
			 	})
		    }, callback);
    	},		
		function(callback) {
			flickrApi.executeAPIRequest('flickr.people.getPublicPhotos', {'user_id':'32771300@N02', 'extras':'date_taken,description','page':1,'per_page':80}, true, function(err, data){
		 		_.each(data.photos.photo, function(item, index){

					var flickr = {};
					flickr.typeName = 'Flickr';
					flickr.theme = 'generic';
					flickr.title = item.title;
					flickr.image = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret, 
					flickr.content = item.description._content;
					flickr.pubDate = new Date(item.datetaken);

					feeds['flickr'].push(flickr);
		 		});
				callback();
			}); 
    	},	    	
    	function(callback) {
    		var screen_names = getUrl(themes, 'Twitter');

		    async.forEach(screen_names, function(screen_name, callback) { //The second argument (callback) is the "task callback" for a specific messageId
				T.get('statuses/user_timeline', { screen_name: screen_name.url, exclude_replies: true, count: 20 },  function (err, data) {
					_.each(data, function (item, index) {
						if(item.created_at != null && item.created_at != ''){
							var articleDate = new Date(item.created_at);
							if(startDate < articleDate && endDate > articleDate){
								var tweet = {};
								tweet.title = item.text;
								tweet.pubDate = new Date(item.created_at);
								// tweet.image = data[i].user.profile_image_url;
								tweet.image = item.user.profile_image_url;
								tweet.typeName = 'Twitter';

			                    var userData = item.user,
			                        userInfo = {
			                            name:               userData.name,
			                            screen_name:        userData.screen_name,
			                            description:        userData.description,
			                            url:                userData.url,
			                            profile_banner_url: userData.profile_banner_url,
			                            statuses_count:     userData.statuses_count,
			                            friends_count:      userData.friends_count,
			                            followers_count:    userData.followers_count 
			                        };

								tweet.userInfo = userInfo;
								// tweet.link = data[i].user.entities.urls.expanded_url
								feeds['tweets'].push(tweet);
							}
						}
					})	
					callback();
				})
		    }, callback);
    	},
    	function(callback) {

    		var feeds_themes = getUrl(themes, 'News').concat(getUrl(themes, 'Blog')).concat(getUrl(themes, 'Publication'))


    		// var topics = ['agriculture','corruption','chemicalsafety','competition','corporate','development','economy','education','employment','environment','finance','greengrowth','health','industry','innovation','insurance','migration','internet','investment','governance','regional','regreform','science','social','tax','trade'];
    		// _.each(topics, function (item, index) {
    		// 	news_urls.push('http://www.oecd.org/'+ item +'/index.xml');
    		// });

    		// var pub_keys = [30,40,79,31,33,34,36,37,39,77,41,42,43,45,78,48,46,];
    		// _.each(pub_keys, function (item, index) {
    		// 	news_urls.push('http://www.oecd-ilibrary.org/rss/content/subject/'+ item +'/latest?fmt=rss');
    		// });
			console.log(feeds_themes);

		    async.forEach(feeds_themes, function(feeds_theme, callback) { 
				// feeds['called'].push(url);
				datenotchecked = true;

				console.log(feeds_theme);

				request(feeds_theme.url)
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

						if(article.pubDate != null && article.pubDate != ''){
							var articleDate = new Date(article.pubDate);

							if(feeds_theme.type == 'Publication'){
								var publication = {};
								publication.typeName = feeds_theme.type;
								publication.theme = feeds_theme.theme;
								publication.title = article.title;
								publication.content = article.description;
								publication.pubDate = articleDate;
								publication.link = article.link;
								publication.provider = {
									logo:'http://insightsblog.oecdcode.org/wp-content/uploads/2012/06/ilibrary_nameonly_small.jpeg',
									name:'OECD iLibrary',
									url:'http://www.oecd-ilibrary.org/',
									description:'OECD iLibrary'
								}

								feeds['publication'].push(publication);
							}else if(feeds_theme.type == 'Blog'){
								var blog = {};
								blog.typeName = feeds_theme.type;
								blog.theme = feeds_theme.theme;
								blog.title = article.title;
								blog.content = article.summary;
								// article.content2 = article.description;
								blog.pubDate = articleDate;
								blog.link = article.link;
								blog.provider = feeds_theme.provider;

								feeds['article'].push(blog);

							}else if(feeds_theme.type == 'News'){
								if(datenotchecked){
									if(startDate < articleDate && endDate > articleDate){
										var news = {};
										var providerName = feeds_theme.provider.name;

										news.typeName = feeds_theme.type;
										news.theme = feeds_theme.theme;
										news.title = article.title;

										if(providerName == 'Observer' || providerName == 'Newsroom'){
											news.content = article.description;
										}else{
											news.content = article.summary;
										}
										news.pubDate = articleDate;
										news.link = article.link;
										news.provider = feeds_theme.provider;

										feeds['news'].push(news);
									}
								}	
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
	        	result = feeds['news'].concat(
	        				feeds['article']).concat(
		        				feeds['publication']).concat(
			        				feeds['tweets']).concat(
			        					feeds['youtube']).concat(
			        						feeds['flickr']
			        						);

	        	// console.log('result.length: ');
	        	// console.log(result.length);
	   //      	result = _.sortBy(result, function(item){
	   //      		return item.pubDate;
	   //      	});

				// res.jsonp(result.reverse());
				res.jsonp(result);
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


