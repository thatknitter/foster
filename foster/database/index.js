var mongoose = require('mongoose');

var developmentDb = 'mongodb://localhost/test';
var usedDb;

//if we're in development
if (process.env.NODE_ENV === 'development') {
    usedDb = developmentDb;
    mongoose.connect(usedDb);
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
   console.log('Database connection successfully opened at:' + usedDb);
});