var _ = require ('underscore');
var youtube = require('youtube-feeds')

var feed = function(key, feeds, callback){
 	youtube.feeds.playlist(key,{'max-results':20},function(err, videos){
 		_.each(videos.items, function(item, index){
	 		var video = {};
	 		video.id = -1;
 			video.typeName = 'Videos';
 			video.theme = 'generic';
 			video.title = item.video.title;
 			// video.image = "http://i.ytimg.com/vi/" + item.video.id + "/default.jpg";
 			video.image = item.video.thumbnail.sqDefault;
 			video.content = item.video.description;
 			video.pubDate = new Date(item.video.uploaded);
 			// video.link = item.video.player.mobile;
 			video.link = 'http://www.youtube.com/embed/' + item.video.id + '?autoplay=1';

	 		feeds.push(video);
 		})
 		callback();
 	})
}

module.exports.feed = feed;
