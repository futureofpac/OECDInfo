var _ = require ('underscore'),
	Flickr = require('flickr').Flickr,
	flickrApi = new Flickr(process.env.flickr_consumer_key, process.env.flickr_consumer_secret),
	model = require('./feed');

var feed = function(feeds, next, callback){
	flickrApi.executeAPIRequest('flickr.people.getPublicPhotos', {'user_id':'32771300@N02', 'extras':'date_taken,description','page':1,'per_page':80}, true, function(err, data){
		if(err) {
			next({stack:err.stack, isdb:false})	
		}else{
	 		_.each(data.photos.photo, function(item, index){

				// var flickr = {};
			 	// 	flickr.id = -1;
				// flickr.typeName = 'Photos';
				// flickr.theme = 'generic';
				// flickr.title = item.title;
				// flickr.image = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret, 
				// flickr.content = item.description._content;
				// flickr.link = 'http://www.flickr.com/photos/OECD/' + item.id;
				// flickr.pubDate = new Date(item.datetaken);

				var f = new model({
					theme: 'generic',
					typeName: 'Photos',
					title: item.title,
					content: item.description._content,
					link: 'http://www.flickr.com/photos/OECD/' + item.id,
					pubDate: new Date(item.datetaken),
					image: 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret
				});

				feeds.push(f);
	 		});
			callback();
		}
	}); 
}

module.exports.feed = feed;



