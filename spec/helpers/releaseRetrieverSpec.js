var fs = require('fs');
var releaseRetriever = require('../app/helpers/releaseRetriever');

describe('ReleaseRetriever', function() {

  var rT;

  it('processes release JSON into form we want', function() {
    rT                  = new releaseRetriever;
    var exampleJSON     = JSON.parse(fs.readFileSync('./spec/example_release.txt').toString());
    var processedObject = rT.processRelease(exampleJSON) 

    expect(processedObject).toEqual({ '2330718': [
      { username: 'ozoesono',
        full_name: 'Ozo',
        profile_picture_url: "https://pbs.twimg.com/profile_images/422441705833369602/gRrKy7D3_normal.png",
        rank: '1' },
      { username: 'guacamolay',
        full_name: 'Ptolemy',
        profile_picture_url: 'https://pbs.twimg.com/profile_images/1743558449/jf28_normal.jpg',
        rank: '2' }
      ]});
  })
 
  it('retrieves the release id from the JSON', function() {
    rt = new releaseRetriever;
    var exampleJSON = JSON.parse(fs.readFileSync('./spec/example_release.txt').toString());
    expect(rt.getReleaseID(exampleJSON)).toEqual('2330718');
  });
})
