var twit             = require('twit');
var twit             = new twit({
  consumer_key: process.env.FL_TWIT_KEY, 
  consumer_secret: process.env.FL_TWIT_SECRET,
  access_token: process.env.FL_TWIT_TOKEN,
  access_token_secret: process.env.FL_TOKEN_SECRET
});

var TwitWrapper = function() { }

TwitWrapper.prototype.getLastTweet = function(username, callback) {
  twit.get('statuses/user_timeline', {screen_name:  username, count: 1}, function(err, data, response) {
    callback(data[0]);
  });
}

TwitWrapper.prototype.processUsernameString = function(string) {
  return string.split(",").map(function(username) { return '@' + username });
}

TwitWrapper.prototype.composeTweet = function(usernameArr, message, challenger) {
  return usernameArr.map(function(username) { return username + " " + challenger
    + "has challenged you to " + message});
}

TwitWrapper.prototype.postChallengeTweet = function(usernameString, message, challenger) {
  var usernameArr    = this.processUsernameString(usernameString);
  var tweets         = this.composeTweet(usernameArr, message, challenger);
  console.log(tweets);
  for(var i = 0; i < tweets.length; i ++) {
    twit.post('statuses/update', { status: tweets[i] }, function(err, data, response) {
      if(err) { console.log(err) }
    });
  }
}

module.exports = TwitWrapper;
