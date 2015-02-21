var MongoClient = require('mongodb').MongoClient
       , format = require('util').format;
var ReleaseRetriever = new require('./releaseRetriever');

var releaseRetriever = ReleaseRetriever();

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  if(err) throw err;

  releaseRetriever.lastRelease(function(err, request, body) {
    var collection = db.collection('users');
    releaseData = JSON.parse(body);
    collection.insert(releaseData);
  });
});
