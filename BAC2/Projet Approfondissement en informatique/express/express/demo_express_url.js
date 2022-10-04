var express = require('express');
var app = express ()

app.get('/question', function(req,res,next) {
  res.send(`Year: ${req.query.year}` );
});
app.use(express.static('content'));
app.listen(8080);

