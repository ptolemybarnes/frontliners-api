var restify          = require('restify');
var releaseRetriever = require('./helpers/releaseRetriever')
var twit             = require('twit');

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

server.get('/scoreboard', function create(req, res, next) {
  releaseRetriever.lastRelease(function(err, req, body) {
    res.send(releaseRetriever.processRelease(JSON.parse(body)));
    //  res.send(body);
    //Produce Modified Json
  });
  return next();
});

var params = {screen_name: 'ozoesono', count: 1 }

twit.get('statuses/user_timeline', params, function(error, response) {
  console.log('twitter function hit');
  console.log(error);
  if(!error) {
    console.log(response);
  }
});
  

server.listen(8080);
