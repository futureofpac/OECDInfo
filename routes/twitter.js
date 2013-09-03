var _ = require ('underscore'),
	twit = require('twit'),
	model = require('./feed');

var T = new twit({
    consumer_key:         process.env.twitter_consumer_key
    // consumer_key:         'asfasdf'
  , consumer_secret:      process.env.twitter_consumer_secret
  , access_token:         process.env.twitter_access_token
  , access_token_secret:  process.env.twitter_access_token_secret
})

function getLink(html){
        if(html == null) {
            return '';
        }
        
        html = html.replace(/(http:\/\/[^\s]*)/g, "<span class=\"link\" name=\"$1\">$1</span>");
        // html = html.replace(/(www.[^\s]*)/g, "<span class=\"link\" name=\"http://$1\">$1</span>");
        // html = html.replace(/(@[^\s]*)/g, "<span class=\"at\" name=\"http://$1\">$1</span>");
        // html = html.replace(/(#[^\s]*)/g, "<span class=\"shap\" name=\"http://$1\">$1</span>");
        return html;
}

var feed = function(screen_name, startDate, endDate, feeds, next, callback){
	T.get('statuses/user_timeline', { screen_name: screen_name.url, exclude_replies: true, count: 20 },  function (err, data) {
		if(err) {
			next({stack:err, isdb:false})	
		}else{
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
							title: getLink(item.text),
							link: 'https://www.twitter.com/' +  userData.screen_name + '/status/' + item.id_str,
							pubDate: new Date(item.created_at),
							image: item.user.profile_image_url,
							userInfo: userInfo
						});
						feeds.push(f);
					}
				}
			})	
			callback();
		}
	}) 	
}

module.exports.feed = feed;
