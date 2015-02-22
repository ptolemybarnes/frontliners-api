var TwitWrapper = require('../app/helpers/getLastTweet');

describe('get last tweet', function() {
  var twitWrapper = new TwitWrapper();

  it('gets last tweet of a given user', function(done) {
  
    twitWrapper.getLastTweet('guacamolay', function(tweet) {
      expect(tweet.text).toEqual("Cats cats cats");
      done();
    });
  });

  it('processes a string of usernames into an array of twitter usernames', function(done) {
    var string = 'guacamolay,ozoesono';

    expect(twitWrapper.processUsernameString(string)).toEqual(['@guacamolay', '@ozoesono']);
    done();
  });

  it('appends a message to an array of twitter usernames', function(done) {
    var usernameArr = ['@guacamolay', '@ozoesono'];

    expect(twitWrapper.composeTweet(usernameArr, "You're a star!")).toEqual(
      ["@guacamolay You're a star!", "@ozoesono You're a star!"]);
    done();
  });
  console.log("TING");
});
