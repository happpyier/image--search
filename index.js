/*
https://developers.google.com/custom-search/docs/tutorial/introduction USING this as a reference;
http://google.github.io/google-api-nodejs-client/3.1.0/index.html Also a reference;
https://github.com/google/google-api-nodejs-client/ Also a reference;
*/
var google = require('googleapis');
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/latest', function(request, response) {
  response.send('This is the latest query page.');
});
app.get('/:id', function(request, response) {
  var parameters1 = JSON.stringify(request.params);
  var parameters2 = JSON.stringify(request.query);
  response.sendFile(path.join(__dirname+'/searchresults.html'));
  //response.send('This is the search page.<br/>Your query is <br/>'+parameters1+' '+parameters2);
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});