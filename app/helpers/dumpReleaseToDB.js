var MongoClient = require('mongodb').MongoClient
       , format = require('util').format;
var ReleaseRetriever = require('./releaseRetriever.js');

var releaseRetriever = new ReleaseRetriever();

MongoClient.connect('mongodb://127.0.0.1:27017/pttest', function(err, db) {
  if(err) throw err;

  releaseRetriever.lastRelease(function(err, request, body) {
    var collection = db.collection('users');
    releaseData    = releaseRetriever.processRelease(JSON.parse(body));
    collection.insert(releaseData, function(err, doc) {
      if(err) { console.log(err) }
      console.log("USERS ADDED");
      db.close;
    });
  });
});
