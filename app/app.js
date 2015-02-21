var restify          = require('restify');
var releaseRetriever = require('./helpers/releaseRetriever')

var releaseRetriever = new releaseRetriever();

var server = restify.createServer({
  name: 'frontliners-api',
});

server.get('/scoreboard', function create(req, res, next) {
  releaseRetriever.lastRelease(function(err, req, body) {
    res.send(body);
  });
  return next();
});

server.listen(8080);
