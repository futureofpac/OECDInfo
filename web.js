var _ = require ('underscore'),
	fs = require('fs');

var video = require('./routes/video'),
	photo = require('./routes/photo'),
	twitter = require('./routes/twitter'),
	article = require('./routes/article'),
	option = require('./routes/option'),
	errlog = require('./routes/error'),
	weblog = require('./routes/log');

console.log('run web.js');

var express = require('express'),
	async = require('async'),
	app = express(),
	glbThemes = null;

app.use(express.static(__dirname + process.env.publicpath));
app.use(express.bodyParser());
app.use(app.router);

app.use(function(err, req, res, next){
  console.log('error catched!');
  if(err.isdb){
  	// save in file when there is an error in db.
  	var msg = 
  			'\r\n\r\n====================================================== \r\n' +
  			'Created at ' + (new Date()) + '\r\n' +
  			'====================================================== \r\n' + 
  			err.stack

	fs.appendFile('./errors/error.txt', msg, function (err) {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});  	
  }else{
  	// save in db for normal errors.
  	errlog.saveError(err);
  }
  res.send(500, 'Something Wrong!');
});
// app.use(express.errorHandler());

function getFeed(req, res, next){

	var themes = req.params.themes.split(','),
		search = req.params.search,
		numberofdays = req.params.days,

		today = new Date(),
		todayCopy = new Date(),
		startDate = new Date(today.setDate(today.getDate() - numberofdays)),
		endDate = new Date(todayCopy.setDate(todayCopy.getDate() + 1)),
		datenotchecked = true,
		feeds = [];
		// ,
		// themesDB = null;

	var getUrl = function (themes, type) {
		var result = [];
		_.each(themes, function (theme, index) {
			// if(option.themes[theme][type]){
			// 	_.each(option.themes[theme][type], function (item) {
			if(glbThemes[theme][type]){
				_.each(glbThemes[theme][type], function (item) {
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
	async.series([
		function(callback){
			if(glbThemes != null){
				console.log('already got it!');
				callback();
			}else{
				option.getThemes(next, function(result){
					glbThemes = result;
					callback();
				})
			}
		},
		function(callback){
			async.parallel([
				function(callback) {
					var playlistkeys = [
					    'PL7D00C15B1EA60D89qqqqqq',
					    'PL96BBC83DFCD8447Eqqqqq'
					];
					if(_.indexOf(themes, 'Generic') > -1){
					    async.forEach(playlistkeys, function(key, callback) { //The second argument (callback) is the "task callback" for a specific messageId
					    	// video.feed(key, feeds['youtube'], callback);
					    	video.feed(key, feeds, next, callback);
					    }, callback);
					}else{
						callback();
					}
		    	},		
				function(callback) {
					if(_.indexOf(themes, 'Generic') > -1){
						// photo.feed(feeds['flickr'], callback)
						photo.feed(feeds, next, callback)
					}else{
						callback();
					}
		    	},	    	
		    	function(callback) {
		    		var screen_names = getUrl(themes, 'Twitter');

				    async.forEach(screen_names, function(screen_name, callback) { //The second argument (callback) is the "task callback" for a specific messageId
						// twitter.feed(screen_name, startDate, endDate, feeds['tweets'], callback)
						twitter.feed(screen_name, startDate, endDate, feeds, next, callback)
				    }, callback);
		    	},
		    	function(callback) {

		    		var feeds_themes = getUrl(themes, 'News').concat(getUrl(themes, 'Blog')).concat(getUrl(themes, 'Publication'))

				    async.forEach(feeds_themes, function(feeds_theme, callback) { 
				    	// article.feed(feeds_theme, startDate, endDate, feeds['article'], callback);
				    	article.feed(feeds_theme, startDate, endDate, feeds, next, callback);
				    }, callback);
		    	}],
				function(err) {
					console.log('end');
			        // if (err) return next(err);
					if(err) {
						next({stack:err.stack, isdb:false});
			        }else{
			        	if(search && search != ''){
			        		feeds = _.filter(feeds, function(item){
			        			return (item.title.indexOf(search) > 0 || item.content.indexOf(search) > 0)
			        			// return (item.title.indexOf(search) > 0)
			        		})
			        	}

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

						// option.addUserLog(req);
			        }
			    }  
			);
		}
	]);

}

app.get('/api/:themes/:days', function(req, res, next){
	console.log('not search');
	getFeed(req, res, next);
});

app.get('/api/:themes/:days/:search', function(req, res){
	console.log('search');
	getFeed(req, res);
});

app.get('/api/links', function(req, res){
	option.getLinks(function(err, links){
		res.jsonp(links);
	})
});

app.get('/api/themes', function(req, res){
	option.getThemes(function(err, result){
		console.log(result);
		glbThemes = result;
		// res.jsonp(result);
	})
});

app.post('/log/init', function(req, res){
	var param = req.body;

	weblog.saveLogInit({
		ip:param.ip,
	    deviceType:param.deviceType,
	    os:param.os,
	    osversion:param.osversion,
	    country:param.country,
	    countryCode:param.countryCode,
	    city:param.city,
	    createdat:(new Date())		
	})

	res.jsonp({
		result:'saved!'
	});
});


app.post('/log/theme', function(req, res){
	var param = req.body;

	var themes = param.themes;
	// console.log('themes in log:');
	// console.log(themes);
	var a_themes = themes.toString().split(',');

	for(var i=0;i<a_themes.length;i++){
		weblog.saveLogTheme({
			theme:a_themes[i],
		    createdat:(new Date())
		})
	}

	res.jsonp({
		result:'saved!'
	});
});

app.post('/log/item', function(req, res){
	var param = req.body;

	weblog.saveLogItem({
		typeName:param.typeName,
		title:param.title,
		image:param.image,
		pubdate:param.pubdate,
		createdat:(new Date())
	})

	res.jsonp({
		result:'saved!'
	});
});

app.get('/log/init', function(req, res){
	var param = req.body;

	weblog.saveLogInit({
		ip:param.ip,
	    deviceType:param.deviceType,
	    os:param.os,
	    osversion:param.osversion,
	    country:param.country,
	    countryCode:param.countryCode,
	    city:param.city,
	    createdat:(new Date())		
	})

	res.jsonp({
		result:'saved!'
	});
});


app.get('/log/theme', function(req, res){
	weblog.getLogTheme(function(items){
		res.jsonp(items);
	});
});

app.get('/log/item', function(req, res){
	weblog.getLogItem(function(items){
		res.jsonp(items);
	});
});


app.get('/testlog/:ip', function(req, res, next){
	option.testLog(req, function(geo, ip){
		res.jsonp([geo, ip]);
	}, req.params.ip)
});

app.get('/testip', function(req, res, next){
	res.jsonp(req);
});

app.get('/api/clearthemes', function(req, res){
	glbThemes = null;
	res.jsonp({
		result:'cleared!'
	});
});


var port = process.env.PORT || 5000;
app.listen(port);


