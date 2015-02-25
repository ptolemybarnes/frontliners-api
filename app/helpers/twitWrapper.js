ar TwitWrapper = function(api) {
  this.api = api;
}

TwitWrapper.prototype.getLastTweet = function(username, callback) {
  this.api.get('statuses/user_timeline', {screen_name:  username, count: 1}, function(err, data, response) {
    callback(data[0]);
  });
}

TwitWrapper.prototype.processUsernameString = function(string) {
  return string.split(",").map(function(username) { return '@' + username });
}

TwitWrapper.prototype.composeTweet = function(usernameArr, message, challenger) {
  return usernameArr.map(function(username) { return username + " @" + challenger
    + " has challenged you to " + message});
}

TwitWrapper.prototype.postChallengeTweet = function(usernameString, message, challenger) {
  var usernameArr    = this.processUsernameString(usernameString);
  usernameArr        = usernameArr.filter(function(name) { return name.length > 1 });
  var tweets         = this.composeTweet(usernameArr, message, challenger);
  console.log(tweets);
  for(var i = 0; i < tweets.length; i ++) {
    this.api.post('statuses/update', { status: tweets[i] }, function(err, data, response) {
      if(err) { console.log(err) }
    });
  }
}

module.exports = TwitWrapper;
