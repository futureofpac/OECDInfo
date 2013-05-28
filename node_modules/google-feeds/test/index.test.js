var should = require('should')
  , gfeeds = require('../');


describe("google-feeds", function() {
  it("finds feeds", function(done) {
    gfeeds("node.js blogs", function(err, feeds) {
      if (err) return done(err);
      feeds[0].source.should.eql("http://blog.nodejs.org/feed/");
      feeds[0].title.should.include("node");
      feeds[0].link.should.eql("http://blog.nodejs.org/");
      done();
    });
  });
});
