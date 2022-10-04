var express = require('express');
var consolidate = require('consolidate');
var app = express ()

app.engine ( 'html', consolidate.hogan )
app.set('views', 'private');

app.get('/display', function(req,res,next) {
  res.render('name.html', {firstname: req.query.firstname, lastname: req.query.lastname} );
});
app.use(express.static('nameapp'));
app.listen(8080);