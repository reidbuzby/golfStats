/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const { MongoClient } = require('mongodb');
const { server, setDb } = require('./server');

const mongoURL = 'mongodb://heroku_5cvwqv6q:ksghe2u05vt8ehv9t4k03avdhk@ds143778.mlab.com:43778/heroku_5cvwqv6q'

MongoClient.connect(mongoURL, (err, database) => {
  if (err) {
    console.error(err);
  } else {
    // Don't start server unless we have successfully connect to the database
    const db = database.db(url.parse(mongoURL).pathname.slice(1)); // Extract database name
    setDb(db);

    // We create the server explicitly (instead of using app.listen()) to
    // provide an example of how we would create a https server
    const golfServer = http.createServer(server).listen(process.env.PORT || 3001);
    console.log('Listening on port %d', golfServer.address().port);
  }
});
