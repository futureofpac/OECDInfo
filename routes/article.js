var _ = require ('underscore');
var FeedParser = require('feedparser'), 
	request = require('request'),
	model = require('./feed');

var feed = function(feeds_theme, startDate, endDate, feeds, callback){
	datenotchecked = true;

	console.log(feeds_theme);

	request(feeds_theme.url)
	.pipe(new FeedParser())
	.on('error', function(error) {
	})
	.on('article', function (article) {
		if(article.pubDate != null && article.pubDate != ''){
			var articleDate = new Date(article.pubDate);

			if(feeds_theme.type == 'Publication'){
				if(endDate > articleDate){
					// var publication = {};
					// publication.id = -1;
					// publication.typeName = 'Publications';
					// publication.theme = feeds_theme.theme;
					// publication.title = article.title;
					// publication.content = article.description;
					// publication.pubDate = articleDate;
					// publication.link = article.link;
					// publication.provider = {
					// 	logo:'http://insightsblog.oecdcode.org/wp-content/uploads/2012/06/ilibrary_nameonly_small.jpeg',
					// 	name:'OECD iLibrary',
					// 	url:'http://www.oecd-ilibrary.org/',
					// 	description:'OECD iLibrary'
					// }

					var f = new model({
						theme: feeds_theme.theme,
						typeName: 'Publications',
						title: article.title,
						content: article.description,
						link: article.link,
						pubDate: articleDate,
						provider: {
							logo:'http://insightsblog.oecdcode.org/wp-content/uploads/2012/06/ilibrary_nameonly_small.jpeg',
							name:'OECD iLibrary',
							url:'http://www.oecd-ilibrary.org/',
							description:'OECD iLibrary'
						}
					});

					feeds.push(f);
				}
			}else if(feeds_theme.type == 'Blog'){
				if(endDate > articleDate){
					// var blog = {};
					// var providerName = feeds_theme.provider.name;
					// blog.id = -1;
					// blog.typeName = 'Articles';
					// blog.theme = feeds_theme.theme;
					// blog.title = article.title;
					// if(providerName == 'OECD Insights'){
					// 	blog.content = article.description;
					// }else{
					// 	blog.content = article.summary;
					// }
					// // article.content2 = article.description;
					// blog.pubDate = articleDate;
					// blog.link = article.link;
					// blog.provider = feeds_theme.provider;

					var f = new model({
						theme: feeds_theme.theme,
						typeName: 'Articles',
						title: article.title,
						content: (feeds_theme.provider.name  == 'OECD Insights' ? article.description : article.summary),
						link: article.link,
						pubDate: articleDate,
						provider: feeds_theme.provider
					});

					feeds.push(f);
				}
			}else if(feeds_theme.type == 'News'){
				if(datenotchecked){
					if(startDate < articleDate && endDate > articleDate){
						// var news = {};
						// var providerName = feeds_theme.provider.name;

						// news.id = -1;
						// news.typeName = feeds_theme.type;
						// news.theme = feeds_theme.theme;
						// news.title = article.title;

						// if(providerName == 'Observer' || providerName == 'Newsroom'){
						// 	news.content = article.description;
						// }else{
						// 	news.content = article.summary;
						// }
						// news.pubDate = articleDate;
						// news.link = article.link;
						// news.provider = feeds_theme.provider;

						var f = new model({
							theme: feeds_theme.theme,
							typeName: feeds_theme.type,
							title: article.title,
							content: ((feeds_theme.provider.name == 'Observer' || feeds_theme.provider.name == 'Newsroom') ? article.description : article.summary),
							link: article.link,
							pubDate: articleDate,
							provider: feeds_theme.provider
						});

						feeds.push(f);
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
}

module.exports.feed = feed;
				
