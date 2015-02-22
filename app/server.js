var restify          = require('restify');
var releaseRetriever = require('./helpers/releaseRetriever')
var twit             = require('twit');
var port             = process.env.PORT || 8080;

var releaseRetriever = new releaseRetriever();
var twit             = new twit({
  consumer_key: process.env.FL_TWIT_KEY, 
  consumer_secret: process.env.FL_TWIT_SECRET,
  access_token: process.env.FL_TWIT_TOKEN,
  access_token_secret: process.env.FL_TOKEN_SECRET
});

var server = restify.createServer({
  name: 'frontliners-api'
});

server.get('/', function create(req, res, next) {
  res.send("HELLO WORLD!");
  return next();
});

server.get('/scoreboard', function create(req, res, next) {
  releaseRetriever.lastRelease(function(err, req, body) {

    releaseRetriever.getCurrentRelease(function(data) {
        res.send(JSON.stringify(data));
    });
  });
  return next();
});

server.listen(port);
