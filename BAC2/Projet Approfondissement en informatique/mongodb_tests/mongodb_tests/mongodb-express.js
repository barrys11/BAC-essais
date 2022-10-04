let express = require('express'),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

let app = express();
app.engine('html', engines.hogan);
app.set('view engine', 'html');
app.set('views', __dirname);

MongoClient.connect('mongodb://localhost:27017', (err, db) => {
	dbo = db.db("course");
    if (err) throw err;
    app.get('/', (req, res) => {
        dbo.collection('grades').findOne({},(err, doc) => {
            if (err) throw err;
            res.render('mongodb-express', doc);
        });
    });
    app.get('*', (req, res) => {
        res.status(404).send('Page Not Found');
    });
    app.listen(8080);
    console.log('Express server started on port 8080');
});