var _ = require ('underscore');
var Flickr = require('flickr').Flickr;
var flickrApi = new Flickr('1051127fe1d2ccd24525bee93ffd4129', '73d19cf2007d389e');

var feed = function(feeds, callback){
	flickrApi.executeAPIRequest('flickr.people.getPublicPhotos', {'user_id':'32771300@N02', 'extras':'date_taken,description','page':1,'per_page':80}, true, function(err, data){
 		_.each(data.photos.photo, function(item, index){

			var flickr = {};
	 		flickr.id = -1;
			flickr.typeName = 'Photos';
			flickr.theme = 'generic';
			flickr.title = item.title;
			flickr.image = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret, 
			flickr.content = item.description._content;
			flickr.link = 'http://www.flickr.com/photos/OECD/' + item.id;
			flickr.pubDate = new Date(item.datetaken);

			feeds.push(flickr);
 		});
		callback();
	}); 
}

module.exports.feed = feed;



