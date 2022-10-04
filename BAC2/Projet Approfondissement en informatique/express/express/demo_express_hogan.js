var express = require('express');
var consolidate = require('consolidate');
var app = express ()

app.engine ( 'html', consolidate.hogan )
app.set('views', 'private');

app.get('/question', function(req,res,next) {
  res.render('year.html', {year: req.query.year} );
});
app.use(express.static('content'));
app.listen(8080);

