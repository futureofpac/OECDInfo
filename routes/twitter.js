var _ = require ('underscore');
var Twit = require('twit')

var T = new Twit({
    consumer_key:         'YESBKjjb6RtIsDfKJbf1Q'
  , consumer_secret:      'ottkkdctP55j0VcDrG41nuLXD51FB9ab7KcnWLs'
  , access_token:         '92711180-XKHDV6E0yFfjk92NHmR6c9nllUAq4pwcLTU27WA'
  , access_token_secret:  'yQLc0KEEurMlT78xO4MjztUIekpjCGCwaP8XGXoSsbk'
})

var feed = function(screen_name, startDate, endDate, feeds, callback){
	T.get('statuses/user_timeline', { screen_name: screen_name.url, exclude_replies: true, count: 20 },  function (err, data) {
		_.each(data, function (item, index) {
			if(item.created_at != null && item.created_at != ''){
				var articleDate = new Date(item.created_at);
				if(startDate < articleDate && endDate > articleDate){
					var tweet = {};
					tweet.id = -1;
					tweet.title = item.text;
					tweet.theme = screen_name.theme;
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

					tweet.link = 'https://www.twitter.com/' +  userData.screen_name + '/status/' + item.id_str;
					tweet.pubDate = new Date(item.created_at);
					// tweet.image = data[i].user.profile_image_url;
					tweet.image = item.user.profile_image_url;

					tweet.userInfo = userInfo;
					// tweet.link = data[i].user.entities.urls.expanded_url
					feeds.push(tweet);
				}
			}
		})	
		callback();
	}) 	
}

module.exports.feed = feed;
