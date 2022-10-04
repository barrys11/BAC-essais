var express = require('express');
var app = express ();

app.use(express.static('nameapp'));
app.listen(8080);
