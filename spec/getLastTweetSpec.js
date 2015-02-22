var getLastTweet = require('../app/helpers/getLastTweet');

describe('get last tweet', function(done) {
  getLastTweet('guacamolay', function(tweet) {
    expect(tweet).toEqual("Cats cats cats");
  });
});
