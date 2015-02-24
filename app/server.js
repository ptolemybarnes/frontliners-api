var restify          = require('restify');
var ReleaseRetriever = require('./helpers/releaseRetriever');
var port             = process.env.PORT || 8080;
var TwitWrapper      = require('./helpers/twitWrapper');
var _                = require('underscore');
var querystring      = require('querystring');

var releaseRetriever = new ReleaseRetriever();
var twitWrapper      = new TwitWrapper();

var server = restify.createServer({
  name: 'frontliners-api'
});

server.get('/', function create(req, res, next) {
  res.send("HELLO WORLD!");
  return next();
});

server.get('/scoreboard', function create(req, res, next) {
  releaseRetriever.getCurrentRelease(function(data) {
    var keys      = _.keys(data);
    var releaseID = keys[0];
    res.send(data[releaseID]);
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
                   "to give a mosquito net to a child exposed to malaria. http://nothingbutnets.net/"][parseInt(req.params.challengeID) - 1];

  var query   = querystring.parse(req._url.query);
  twitWrapper.postChallengeTweet(query.users, challenge, query.challenger);
  return next();
});

server.listen(port, function() { 
  console.log("Frontliners API server is listening on port" + port ) });

