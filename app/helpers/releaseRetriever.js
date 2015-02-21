var request = require('request');

ReleaseRetriever = function() {
  this.board_id = 8299;
  this.url      = 'https://www.rise.global//api/releases/scores';
  this.api_key  = process.env.RISE_API_KEY;
}

ReleaseRetriever.prototype.lastRelease = function(callback) {
  var self = this;
  var options = {
    url: self.url,
    headers: { 'X-API-KEY': process.env.RISE_API_KEY }
  };
  request.post(options, callback).form({board_id: 8299})
}

module.exports = ReleaseRetriever;




