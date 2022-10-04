var express = require('express');
var app = express ()

app.use(function(req,res,next) {
  console.log ( req.url );
  next();
});
app.get('/question', function(req,res,next) {
  res.send(`Year: ${req.query.year}` );
});
app.use(express.static('content'));
app.listen(8080);

