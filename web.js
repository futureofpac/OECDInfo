var _ = require ('underscore');

var video = require('./routes/video'),
	photo = require('./routes/photo'),
	twitter = require('./routes/twitter'),
	article = require('./routes/article'),
	option = require('./routes/option');

console.log('run web.js');

var express = require('express'),
	async = require('async'),
	app = express();

app.use(express.static(__dirname + '/public'));


app.get('/api/:themes/:days', function(req, res){

	var themes = req.params.themes.split(','),
		numberofdays = req.params.days;

		today = new Date(),
		todayCopy = new Date(),
		startDate = new Date(today.setDate(today.getDate() - numberofdays)),
		endDate = new Date(todayCopy.setDate(todayCopy.getDate() + 1)),
		datenotchecked = true,
		feeds = [];

	// feeds['tweets'] = [];
	// feeds['news'] = [];
	// feeds['article'] = [];
	// feeds['publication'] = [];
	// feeds['youtube'] = [];
	// feeds['flickr'] = [];
	// feeds['error'] = [];
	// feeds['called'] = [];

	var getUrl = function (themes, type) {
		var result = [];
		_.each(themes, function (theme, index) {
			if(option.themes[theme][type]){
				_.each(option.themes[theme][type], function (item) {
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

	async.parallel([
		function(callback) {
			var playlistkeys = [
			    'PL7D00C15B1EA60D89',
			    'PL96BBC83DFCD8447E'
			];
			if(_.indexOf(themes, 'Generic') > -1){
			    async.forEach(playlistkeys, function(key, callback) { //The second argument (callback) is the "task callback" for a specific messageId
			    	// video.feed(key, feeds['youtube'], callback);
			    	video.feed(key, feeds, callback);
			    }, callback);
			}else{
				callback();
			}
    	},		
		function(callback) {
			if(_.indexOf(themes, 'Generic') > -1){
				// photo.feed(feeds['flickr'], callback)
				photo.feed(feeds, callback)
			}else{
				callback();
			}
    	},	    	
    	function(callback) {
    		var screen_names = getUrl(themes, 'Twitter');

		    async.forEach(screen_names, function(screen_name, callback) { //The second argument (callback) is the "task callback" for a specific messageId
				// twitter.feed(screen_name, startDate, endDate, feeds['tweets'], callback)
				twitter.feed(screen_name, startDate, endDate, feeds, callback)
		    }, callback);
    	},
    	function(callback) {

    		var feeds_themes = getUrl(themes, 'News').concat(getUrl(themes, 'Blog')).concat(getUrl(themes, 'Publication'))

		    async.forEach(feeds_themes, function(feeds_theme, callback) { 
		    	// article.feed(feeds_theme, startDate, endDate, feeds['article'], callback);
		    	article.feed(feeds_theme, startDate, endDate, feeds, callback);
		    }, callback);
    	}],
		function(err) {
			console.log('end');
	        // if (err) return next(err);
	        if (err) {
				console.log(err);
				res.send(err);
	        }else{
	    //     	var resultFeeds = [];
	    //     	resultFeeds = 
					// feeds['article'].concat(
	    // 				feeds['tweets']).concat(
	    // 					feeds['youtube']).concat(
	    // 						feeds['flickr']
	    // 						);

	        	// resultFeeds = _.sortBy(resultFeeds, function(item){
	        	// 	return item.pubDate;
	        	// });
	        	// resultFeeds = resultFeeds.reverse();
	        	// _.each(resultFeeds, function(feed, index){
	        	// 	feed.id = index;
	        	// });
	        	feeds = _.sortBy(feeds, function(item){
	        		return item.pubDate;
	        	});
	        	feeds = feeds.reverse();
	        	_.each(feeds, function(feed, index){
	        		feed.id = index;
	        	});

	        	var result = {};
	        	result.feeds = feeds;
	        	// result.links = option.links();
	        	result.links = null;

				res.jsonp(result);
				// res.header("Content-Type", "application/javascri; charset=utf-8");
				// res.jsonp(feeds['called']);
				// res.setEncoding('utf8')
				// res.writeHead(200, {'Content-Type':'text/plain; charset=utf8'});
				// res.charset = 'utf-8';
				// res.jsonp(result);
	        }
	    }  
	);
});

app.get('/api/links', function(req, res, next){
	option.getLinks(function(links){
		res.jsonp(links);
	})
});


var port = process.env.PORT || 5000;
app.listen(port);


