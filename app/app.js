var restify = require('restify');

var server = restify.createServer({
  name: 'frontliners-api',
});

server.get('/', function create(req, res, next) {
  res.send(201, Math.random().toString(36).substr(3, 8));
  return next();
});

server.listen(8080);
