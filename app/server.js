var restify          = require('restify');
var ReleaseRetriever = require('./helpers/releaseRetriever');
var port             = process.env.PORT || 8080;
var TwitWrapper      = require('./helpers/twitWrapper');
var _                = require('underscore');
var querystring      = require('querystring');
var twit             = require('twit');
var twitApi          = new twit({
  consumer_key: process.env.FL_TWIT_KEY, 
  consumer_secret: process.env.FL_TWIT_SECRET,
  access_token: process.env.FL_TWIT_TOKEN,
  access_token_secret: process.env.FL_TOKEN_SECRET
});

var releaseRetriever = new ReleaseRetriever();
var twitWrapper      = new TwitWrapper(twitApi);

var server = restify.createServer({
  name: 'frontliners-api'
});

server.get('/', function create(req, res, next) {
  return next();
});

server.get('/scoreboard', function create(req, res, next) {
  releaseRetriever.getCurrentRelease(function(users) {
    var keys      = _.keys(users);
    var users = users[keys[0]];


    twitWrapper.getMultipleLastTweets(users, function(data) {
     res.send(data); 
    });
  });
  return next();
});
 
server.get('/tweets/:username', function create(req, res, next) { 
  twitWrapper.getLastTweet(req.params.username, function(tweet) {
    res.send(tweet.text)
  });

  return next();
});

server.post('/challenge/:challengeID', function create(req, res, next) {
  var challenge = ["to feed a refuge in South Sudan for 1 month. http://donate.oxfam.org.uk/",
                   "to help provide shelter for Syrian refugees. http://donate.unhcr.org/gbr/syria",
                   "to give a mosquito net to a child exposed to malaria. http://nothingbutnets.net/"][parseInt(req.params.challengeID)];

  var query   = querystring.parse(req._url.query);
  twitWrapper.postChallengeTweet(query.users, challenge, query.challenger);
  return next();
});

server.listen(port, function() { 
  console.log("Frontliners API server is listening on port" + port ) });

