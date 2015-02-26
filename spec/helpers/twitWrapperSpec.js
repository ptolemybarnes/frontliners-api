var TwitWrapper = require('../../app/helpers/twitWrapper');

describe('get last tweet', function() {
  var TwitApiDouble = function() {};

  TwitApiDouble.prototype.get = function(user, request, callback) {
    callback(null, [{text: "Cats cats cats"}]);
  }
  var twitWrapper = new TwitWrapper(new TwitApiDouble());
 
  it('gets last tweet of a given user', function(done) {
  
    twitWrapper.getLastTweet('guacamolay', function(tweet) {
      expect(tweet.text).toEqual("Cats cats cats");
      done();
    });
  });

  it('gets the last tweets of a number of users', function(done) {
    var users = [{username: '@guacamolay'}, {username: '@ozoesono'}];

    twitWrapper.getMultipleLastTweets(users, function(output) {
      expect(output).toEqual([{username: '@guacamolay', tweet: 'Cats cats cats'},
        {username: '@ozoesono', tweet: 'Cats cats cats'}]);
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

    expect(twitWrapper.composeTweet(usernameArr, "donate to a charity!", 'john')
      ).toEqual(
      ["@guacamolay @john has challenged you to donate to a charity!",
      "@ozoesono @john has challenged you to donate to a charity!"]);
    done();
  });
});


