var request = require('request')
  , qs      = require('querystring').stringify;


// Public: Find matching feeds.
// 
// Each feed url is an Object with properties "source", "link", and "title".
// 
// Examples
// 
//    google_feeds("Node.js blogs", function(err, feed_urls) {
//      
//    });
// 
var gfeeds = module.exports = function(query, callback) {
  if (!query) return callback(null, []);
  
  var google = "https://ajax.googleapis.com/ajax/services/feed/find"
    , opts   = {v: "1.0", q: query};
  
  request.get(google +"?"+ qs(opts), function(err, res, body) {
    if (err) return callback(err);
    var data    = JSON.parse(body)
      , entries = data && data.responseData && data.responseData.entries
      , feeds   = []
      , urls    = {};
    
    (entries || []).forEach(function(entry) {
      if (urls[entry.url]) return;
      urls[entry.url] = true;
      feeds.push(
        { link:   entry.link
        , source: entry.url
        , title:  entry.title
        });
    });
    callback(null, feeds);
  });
};
