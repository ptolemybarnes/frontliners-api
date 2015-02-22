var twit             = require('twit');
var twit             = new twit({
  consumer_key: process.env.FL_TWIT_KEY, 
  consumer_secret: process.env.FL_TWIT_SECRET,
  access_token: process.env.FL_TWIT_TOKEN,
  access_token_secret: process.env.FL_TOKEN_SECRET
});

module.exports = function(username, callback) {
  twit.get('statuses/user_timeline', {screen_name:  username, count: 1}, function(err, data, response) {
    callback(data[0]);
  });
}





