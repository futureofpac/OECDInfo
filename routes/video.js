var _ = require ('underscore');
	youtube = require('youtube-feeds'),
	model = require('./feed');

var feed = function(key, feeds, callback){
 	youtube.feeds.playlist(key,{'max-results':20},function(err, videos){
 		_.each(videos.items, function(item, index){
			var f = new model({
				theme: 'generic',
				typeName: 'Videos',
				title: item.video.title,
				content: item.video.description,
				link: 'http://www.youtube.com/embed/' + item.video.id + '?autoplay=1',
				pubDate: new Date(item.video.uploaded),
				image: item.video.thumbnail.sqDefault
			});

	 		feeds.push(f);
 		})
 		callback();
 	})
}

module.exports.feed = feed;
