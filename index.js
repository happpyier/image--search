/*
http://expressjs.com/en/guide/routing.html USING this as a reference;
http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js Also a reference;
*/
var google = require('googleapis');
var urlshortener = google.urlshortener('v1');
var params = { shortUrl: 'http://goo.gl/xKbRu3' };
// get the long url of a shortened url
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.get('/latest', function(request, response) {
  response.send('This is the latest query page.');
  //response.end('Its Over!'); 
});
app.get('/:id', function(request, response) {
  var parameters1 = JSON.stringify(request.params);
  var parameters2 = JSON.stringify(request.query);
  urlshortener.url.get(params, function (err, response), next {
    if (err) {
      response.send('Encountered error', err);
    } else {
      response.send('Long url is', response.longUrl);
    }
    next();
  });
  response.send('This is the search page.<br/>Your query is <br/>'+parameters1+' '+parameters2);
  //response.end('Its Over!'); 
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});