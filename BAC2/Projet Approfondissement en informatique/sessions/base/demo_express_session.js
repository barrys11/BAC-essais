var express = require('express');
var consolidate = require('consolidate');
var session = require('express-session');
var app = express ();

app.engine ( 'html', consolidate.hogan );
app.set('views', 'templates');

app.use(session({
  secret: "propre123"
}));
app.get('/ident.html', function(req,res,next) {
  if ( req.query.username == "moimeme" && req.query.password == "secret" ) {
    // in this example we only recognize one user
    req.session.username = "moimeme";
    // password valid, store the username for this authorized session (server side)
    res.redirect('create_incident.html');
  }
  else
    res.redirect('reg.html');
});
app.get('/create_incident.html', function(req,res,next) {
  if(req.session.username==undefined){ // si la personne n'est pas connecter il le renvoie sur la page d'enregistrement.
    res.render('../static/reg.html');
  }
  res.render('create_incident.html', {username: req.session.username } );
  console.log(req.session.username);
});
app.get('/subm.html', function(req,res,next) {
  if ( req.session.username ) 
    // this session belongs to an authorized user, we should add the incident to the database
    res.render('add.html',{username: req.session.username, description: req.query.description });
  else
    // the session belongs to a user that was not authorized; refuse request.
    res.redirect('reg.html');
});
app.use(express.static('static'));
app.listen(8080);
