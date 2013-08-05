var dburl = process.env.mongodb_uri;

var collection = ['logInit', 'logTheme', 'logItem'];
var db = require('mongojs').connect(dburl, collection),
	geoip = require('geoip-lite');

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
		type:param.type,
		title:param.title,
		image:param.image,
		pubdate:param.pubdate,
		createdat:param.createdat
	})
}

function addUserLog(req){
	var geo = geoip.lookup(req.ip),
		log;
	if(geo == null){
		log = {
			themes: req.params.themes,
			country: '',
			city: '',
			createdat: (new Date())
		}
	}else{
		log = {
			themes: req.params.themes,
			country: geo.country,
			city: geo.city,
			createdat: (new Date())
		}
	}

	db.usagelog.save(log)
}
function testLog(req, callback, ip){
	var geo = geoip.lookup((ip === undefined) ? req.ip : ip),
		log;
	callback(geo, req.ip)
}

// function addUserLog(ip){
// 	var geo = geoip.lookup('110.47.51.146');
// 	console.log(geo);
// 	var country = geo.country,
// 		city = geo.city;

// 	db.usagelog.save({
// 		themes: 'test',
// 		country: country,
// 		city: city,
// 		createdat: (new Date())
// 	})
// }

module.exports.addUserLog = addUserLog;
module.exports.testLog = testLog;

module.exports.saveLogInit = saveLogInit;
module.exports.saveLogTheme = saveLogTheme;
module.exports.saveLogItem = saveLogItem;
