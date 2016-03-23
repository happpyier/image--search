/*
https://developers.google.com/custom-search/docs/tutorial/introduction USING this as a reference;
https://developers.google.com/custom-search/docs/element#supported_attributes Also a reference;
http://google.github.io/google-api-nodejs-client/3.1.0/index.html Also a reference;
https://github.com/google/google-api-nodejs-client/ Also a reference;
example of an api call
https://www.googleapis.com/customsearch/v1?key=AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM&cx=012239477241375126935:swwmv-c4dsi&q=lectures
*/
var secretKey = 'AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM';
var cxId = '012239477241375126935:swwmv-c4dsi';
var pubURL = 'https://cse.google.com:443/cse/publicurl?cx=012239477241375126935:swwmv-c4dsi';
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(cxId, secretKey, pubURL);
google.options({ auth: oauth2Client }); // set auth as a global default
var plus = google.plus('v1');
var urlsearch = google.customsearch('v1');
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
  var API_KEY = secretKey; // specify your API key here
    /*
	plus.people.get({ auth: API_KEY, userId: '+RyuuLavitz' }, function(err, user) {
	  response.send('User<br/>'+Object.keys(user.image)+'<br/>Result: ' + (err ? err.message : user.displayName) + '<br/>Image:<br/><img src='+user.image.url+'>');
	});
	*/
	//response.sendFile(path.join(__dirname+'/searchresults.html'));
	

	urlsearch.cse.list({ cx: cxId, q: 'RyuuLavitz' }, function(err, user) {
	  response.send(err ? err : Object.keys(user));
	});
	//response.end('all done');
	
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
}); 