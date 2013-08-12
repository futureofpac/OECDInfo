var dburl = process.env.mongodb_uri;

var collection = ['logInit', 'logTheme', 'logItem'];
var db = require('mongojs').connect(dburl, collection);

function saveLogInit(param){
	db.logInit.save({
		ip:param.ip,
	    deviceType:param.deviceType,
	    os:param.os,
	    osversion:param.osversion,
	    country:param.country,
	    countryCode:param.countryCode,
	    city:param.city,
	    createdat:param.createdat		
	})
}

function saveLogTheme(param){
	db.logTheme.save({
		theme:param.theme,
	    createdat:param.createdat		
	})
}

function saveLogItem(param){
	db.logItem.save({
		typeName:param.typeName,
		title:param.title,
		image:param.image,
		pubdate:param.pubdate,
		createdat:param.createdat
	})
}

function getLogTheme(next, callback){
	db.logTheme.group({
		key: { theme: 1},
		// cond: { ord_dt: { $gt: new Date( '01/01/2012' ) } },
		reduce: function ( curr, result ) {
			result.count++;
		},
		initial: { count : 0 }
	}, function(err, items) {
		if(err) next({stack:err.stack, isdb:true})
		else {		
			callback(items);
		}
	})
}

function getLogItem(next, callback){
	db.logItem.group({
		key: { title: 1, image: 1, pubdate:1, typeName:1},
		// cond: { ord_dt: { $gt: new Date( '01/01/2012' ) } },
		reduce: function ( curr, result ) {
			result.count++;
		},
		initial: { count : 0 }
	}, function(err, items) {
		if(err) next({stack:err.stack, isdb:true})
		else {		
			callback(items);
		}
	})
}


module.exports.saveLogInit = saveLogInit;
module.exports.saveLogTheme = saveLogTheme;
module.exports.saveLogItem = saveLogItem;

module.exports.getLogTheme = getLogTheme;
module.exports.getLogItem = getLogItem;
