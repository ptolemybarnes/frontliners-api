var restify          = require('restify');
var releaseRetriever = require('./helpers/releaseRetriever');
var port             = process.env.PORT || 8080;
var getLastTweet     = require('./helpers/getLastTweet');



var server = restify.createServer({
  name: 'frontliners-api'
});

server.get('/', function create(req, res, next) {
  res.send("HELLO WORLD!");
  return next();
});

server.get('/scoreboard', function create(req, res, next) {
  releaseRetriever.getCurrentRelease(function(data) {
    console.log(data);
    res.send(data);
  });

  return next();
});

server.get('/tweets/:username', function create(req, res, next) { 
  getLastTweet(req.params.username, function(tweet) {
    res.send(tweet.text)
  });
});

server.listen(port);
