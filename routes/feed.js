var feed = function(record) {
	this.id = -1;
	this.typeName = record.typeName;
	this.theme = record.theme;
	this.title = record.title;
	this.content = record.content || '';
	this.pubDate = record.pubDate;
	this.link = record.link;
	this.provider = record.provider || '';
	// this.provider = record.provider || {
	// 	logo:'http://insightsblog.oecdcode.org/wp-content/uploads/2012/06/ilibrary_nameonly_small.jpeg',
	// 	name:'OECD iLibrary',
	// 	url:'http://www.oecd-ilibrary.org/',
	// 	description:'OECD iLibrary'
	// };
	this.userInfo = record.userInfo;
};
module.exports = feed;



