/*
https://developers.google.com/custom-search/docs/tutorial/introduction USING this as a reference;
https://developers.google.com/custom-search/docs/element#supported_attributes Also a reference;
http://google.github.io/google-api-nodejs-client/3.1.0/index.html Also a reference;
https://github.com/google/google-api-nodejs-client/ Also a reference;
example of an api call
https://www.googleapis.com/customsearch/v1?key=AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM&cx=012239477241375126935:swwmv-c4dsi&q=lectures
*/
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
var secretKey = 'AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM';
var cxId = '012239477241375126935:swwmv-c4dsi';
var pubURL = 'https://cse.google.com:443/cse/publicurl?cx=012239477241375126935:swwmv-c4dsi';
var google = require('googleapis');
var urlsearch = google.customsearch('v1');
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
  
  var parameters2 = request.query.offset;
  if (parameters2 < 2)
  {
	parameters2 = 1;
  }
  var API_KEY = secretKey; // specify your API key here
	urlsearch.cse.list({ cx: cxId, fields: 'items(image/contextLink,link,snippet)', searchType: 'image', q: parameters1, num: 10, key: secretKey }, function(err, user) 
	{
	  response.send(err ? '<br/>Fail Line<br/>'+err : JSON.stringify(user.items));
	});	
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
}); 