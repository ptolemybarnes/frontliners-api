var request = require('request');
var _       = require('underscore');

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

ReleaseRetriever.prototype.processRelease = function(releaseJSON) {
  var players = releaseJSON.players;
  var releaseID = this.getReleaseID(releaseJSON).toString();
  var output  = {};
  output[releaseID] = []

  for(var i = 0; i < players.length; i ++) {
    var player = players[i];
    var playerHash = {
      username: player.player_identifier,
      full_name: player.full_name,
      profile_picture_url: player.profile_picture_url,
      rank: player.releases[releaseID].rank }
    output[releaseID].push(playerHash);
  }

  return output;
}

ReleaseRetriever.prototype.getReleaseID = function(Json) {
  var releaseNums =  _.keys(Json.board.releases)
  return _.max(releaseNums);
}

module.exports = ReleaseRetriever;




