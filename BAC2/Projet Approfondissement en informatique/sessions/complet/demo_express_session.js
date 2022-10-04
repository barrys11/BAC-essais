var express = require('express');
var consolidate = require('consolidate');
var session = require('express-session');
var app = express ();
var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');


app.engine ( 'html', consolidate.hogan );
app.set('views', 'templates');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
  secret: "propre123",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/', 
    httpOnly: true, 
    maxAge: 3600000
  }
}));
app.post('/ident.html', function(req,res,next) {
  if ( req.body.username == "moimeme" && req.body.password == "secret" ) {
    // in this example we only recognize one user
    req.session.username = "moimeme";
    // password valid, store the username for this authorized session (server side)
    res.redirect('create_incident.html');
  }
  else
    res.redirect('reg.html');
});
app.get('/create_incident.html', function(req,res,next) {
  res.render('create_incident.html', {username: req.session.username } );
});
app.post('/subm.html', function(req,res,next) {
  if ( req.session.username ) 
    // this session belongs to an authorized user, we should add the incident to the database
    res.render('add.html',{username: req.session.username, description: req.body.description });
  else
    // the session belongs to a user that was not authorized; refuse request.
    res.redirect('reg.html');
});
app.use(express.static('static'));

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'ingi'
}, app).listen(8080);


/*
faire une des com ;
faire des croqis des pages(comme le projet_p);
fonction recherche : plus chanp textuel;
specification de la db(explication);
Faire comme mini immoweb;
*/