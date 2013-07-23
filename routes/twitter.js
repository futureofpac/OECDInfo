var _ = require ('underscore'),
	twit = require('twit'),
	model = require('./feed');

var T = new twit({
    consumer_key:         process.env.twitter_consumer_key
  , consumer_secret:      process.env.twitter_consumer_secret
  , access_token:         process.env.twitter_access_token
  , access_token_secret:  process.env.twitter_access_token_secret
})

var feed = function(screen_name, startDate, endDate, feeds, callback){
	T.get('statuses/user_timeline', { screen_name: screen_name.url, exclude_replies: true, count: 20 },  function (err, data) {
		_.each(data, function (item, index) {
			if(item.created_at != null && item.created_at != ''){
				var articleDate = new Date(item.created_at);
				if(startDate < articleDate && endDate > articleDate){
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
		                
					var f = new model({
						theme: screen_name.theme,
						typeName: 'Twitter',
						title: item.text,
						link: 'https://www.twitter.com/' +  userData.screen_name + '/status/' + item.id_str,
						pubDate: new Date(item.created_at),
						image: item.user.profile_image_url,
						userInfo: userInfo
					});

					// f.title = ;
					// f.theme = screen_name.theme;
					// f.typeName = 'Twitter';


					// f.link = 'https://www.twitter.com/' +  userData.screen_name + '/status/' + item.id_str;
					// f.pubDate = new Date(item.created_at);
					// // tweet.image = data[i].user.profile_image_url;
					// f.image = item.user.profile_image_url;

					// f.userInfo = userInfo;
					// tweet.link = data[i].user.entities.urls.expanded_url
					feeds.push(f);
				}
			}
		})	
		callback();
	}) 	
}

module.exports.feed = feed;
