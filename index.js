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
var pg = require('pg');
var path = require("path");
var url = require("url");
var secretKey = 'AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM';
var cxId = '012239477241375126935:swwmv-c4dsi';
var pubURL = 'https://cse.google.com:443/cse/publicurl?cx=012239477241375126935:swwmv-c4dsi';
var google = require('googleapis');
var urlsearch = google.customsearch('v1');
var resultsidSQL = '';
var failMarker = 0;
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  failMarker = 1;
});
app.get('/latest', function(request, response) {
  failMarker = 2;
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM image_search ORDER BY search_date DESC LIMIT 10', function(err, result) {
      if (err)
       //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
	   { resultsidSQL = ("Error term" + err); }
      else
       //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
	   { resultsidSQL = JSON.stringify(result.rows); }
	   
	   done();
    });
  });
  //resultsidSQL = 'Debugging';
  
  response.send(resultsidSQL);

});
app.get('/:id', function(request, response) {
  failMarker = 3;
  var parameters1 = JSON.stringify(request.params);
  var parametersSQL = JSON.stringify(request.params.id);
  if (parameters2)
  {
	  var parameters2 = parseInt(request.query.offset);
	  if (parameters2 < 2)
	  {
		parameters2 = 1;
	  }
	  if (parameters2 > 9)
	  {
		parameters2 = 90;
	  }
  }
  else
  {
	parameters2 = 1;
  }
	var dateNowVal = new Date();
	var dd = dateNowVal.getDate();
	var mm = dateNowVal.getMonth()+1; //January is 0!
	var yyyy = dateNowVal.getFullYear();
	var hour = dateNowVal.getHours();
	var min = dateNowVal.getMinutes();
	var dateNowVal = hour+'-'+min+'   '+mm+'-'+dd+'-'+yyyy;
	response.send
	if (parametersSQL != '\"favicon.ico\"')
	{	
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("INSERT INTO image_search VALUES ('"+parametersSQL+"', '"+dateNowVal+"')", function(err, result) {
		  if (err)
		   //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
		   { resultsidSQL = ("Error " + err); }
		  else
		   //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
		   { /*resultsidSQL = JSON.stringify(result.rows[0].id);*/ }
		   done();
		});
		
	  });
	}
    var API_KEY = secretKey; // specify your API key here
	urlsearch.cse.list({ cx: cxId, q: parameters1, num: 10, searchType: 'image', fields: 'items(image/contextLink,link,snippet)', start: parameters2, key: 'AIzaSyBO5IZ8i0lpF9I0eMwZ9E4nNV3jXkyUuHM' }, function(err, user) 
	{
	  response.send(err ? '<br/>Sorry<br/>'+err : JSON.stringify(user.items));
	});

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port')); 
});  