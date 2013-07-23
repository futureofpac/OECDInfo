var mongodb = require('mongodb');
 
// function user (first, last, email) {
// 	this.first = first;
// 	this.last = last;
// 	this.email = email;
// }

// var user1 = new user('hoon', 'jung', 'daum');

function loadLinks(){
	// return db.links.find({}).limit(10)

	var record = [];

	mongodb.Db.connect('mongodb://heroku:cec3385d1e40aceb16bac14a350a6ceb@linus.mongohq.com:10049/app12453431', function(error, client) {
		client.collectionNames(function(error, names){
			names.forEach(function(colData){
				record.push(colData);
			});
		}
	}
	return record;
}

var themes = {
		'Generic' : {
			'Twitter' : [
				'OECDlive',
				'OECD_Stat',
				'OECD',
				'OECD_Pubs'
			],
			'News' : [
			    {provider:{name:'Observer', logo:'http://profile.ak.fbcdn.net/hprofile-ak-prn1/50250_160758993981155_1215480564_q.jpg', description:'An award-winning magazine to keep you ahead of today\'s economic and social policy challenges.', url:'http://www.oecdobserver.org/'}, url:'http://feeds.feedburner.com/OecdObserver'},
			    {provider:{name:'Newsroom', logo:'http://profile.ak.fbcdn.net/hprofile-ak-prn1/50250_160758993981155_1215480564_q.jpg', description:'OECD Newsroom', url:'http://www.oecd.org'}, url:'http://www.oecd.org/newsroom/index.xml'}
			],
			'Blog' : [
				{provider:{name:'OECD Insights',logo:'http://www.epha.org/local/cache-vignettes/L200xH104/arton5169-fd6c0.png', description:'The OECD Insights series explains the important issues facing society in a way that is clear and comprehensible.', url:'http://oecdinsights.org/'}, url:'http://oecdinsights.org/feed/'}
				// {url:'http://oecdinsights.org/feed/'}
			]
		},
		'Agriculture' : {
			'Twitter' : [
				'OECDagriculture',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/30/latest?fmt=rss'
			]
		},
		'Development' : {
			'Twitter' : [
				'OECD_Centre',
				'OECD_EVALNET',
				'OECD_INCAF',
				'OECDdev'
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/40/latest?fmt=rss'
			],
			'Blog' : [
				{provider:{name:'The progress blog', description:'Blogging for progress in Society', url:'http://feeds.feedburner.com/blogspot/theprogressblog?format=xml'}, url:'http://feeds.feedburner.com/blogspot/theprogressblog'}
			]
		},
		'Economics' : {
			'Twitter' : [
				'OECDeconomy',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/79/latest?fmt=rss'
			]
		},
		'Education' : {
			'Twitter' : [
				'oecd_edu',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/31/latest?fmt=rss'
			],
			'Blog' : [
				{provider:{name:'Educationtoday', description:'Global perspective on education', url:'http://oecdeducationtoday.blogspot.fr'}, url:'http://oecdeducationtoday.blogspot.com/feeds/posts/default'}
			]
		},
		'Employment' : {
			'Twitter' : [
				'OECD_leed',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/33/latest?fmt=rss'
			]
		},
		'Energy' : {
			'Twitter' : [
				'IEA',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/34/latest?fmt=rss'
			]
		},
		'Environment' : {
			'Twitter' : [
				'OECD_ENV',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/36/latest?fmt=rss'
			]
		},
		'Finance' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/37/latest?fmt=rss'
			]
		},
		'Governance' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/39/latest?fmt=rss'
			]
		},
		'Industry' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/77/latest?fmt=rss'
			]
		},
		'Nuclear' : {
			'Twitter' : [
				'OECD_NEA',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/41/latest?fmt=rss'
			]
		},
		'Science' : {
			'Twitter' : [
				'OECDinnovation',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/42/latest?fmt=rss'
			]
		},
		'Social' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/43/latest?fmt=rss'
			],
			'Blog' : [
				{provider:{name:'Better Life Index', description:'Your Better Life Index is designed to let you visualise and compare some of the key factors – like education, housing, environment, and so on – that contribute to well-being in OECD countries. It’s an interactive tool that allows you to see how countries perform according to the importance you give to each of 11 topics that make for a better life.', logo:'http://www.epha.org/local/cache-vignettes/L200xH104/arton5169-fd6c0.png', url:'http://www.oecdbetterlifeindex.org/'}, url:'http://www.oecdbetterlifeindex.org/feed/'}
			]
		},
		'Taxation' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/45/latest?fmt=rss'
			]
		},
		'Trade' : {
			'Twitter' : [
				'OECDtrade',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/78/latest?fmt=rss'
			]
		},
		'Transport' : {
			'Twitter' : [
				'ITF_Forum',
			],
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/48/latest?fmt=rss'
			]
		},
		'Urban' : {
			'Publication' : [
			    'http://www.oecd-ilibrary.org/rss/content/subject/46/latest?fmt=rss'
			]
		}
	}



var	links = [
	{
		typeName:'Links',
		title:'OECD Website',
		link:'http://www.oecd.org',
		image:'http://s3.timetoast.com/public/uploads/photos/2912365/OECD_globe_10cm_4c_small_square.png',
		content:''
	},
	{
		typeName:'Links',
		title:'Online Bookshop',
		link:'http://www.oecdbookshop.org/',
		image:'http://s3.timetoast.com/public/uploads/photos/2912365/OECD_globe_10cm_4c_small_square.png',
		content:''
	},
	{
		typeName:'Links',
		title:'iLibrary',
		link:'http://www.oecd-ilibrary.org/',
		image:'http://insightsblog.oecdcode.org/wp-content/uploads/2012/06/ilibrary_nameonly_small.jpeg',
		content:''
	},
	{
		typeName:'Links',
		title:'Better Life Index',
		link:'http://www.oecdbetterlifeindex.org',
		image:'http://www.epha.org/local/cache-vignettes/L200xH104/arton5169-fd6c0.png',
		content:''
	}
];

module.exports.themes = themes;
// module.exports.links = links;
module.exports.links = loadLinks;
