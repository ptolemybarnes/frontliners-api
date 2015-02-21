var request = require('request');

var options = {
  url: 'https://www.rise.global//api/releases/scores',
          headers: {
                    'X-API-KEY': process.env.RISE_API_KEY 
                          }
  
};

function callback(error, response, body) {
  console.log(response.statusCode)
      if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                        console.log(body);
                                    }
}

request.post(options, callback).form({board_id: 8299})

