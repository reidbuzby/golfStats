const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID, MongoError } = require('mongodb'); // eslint-disable-line no-unused-vars

const server = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin'],
};

server.use(cors(corsOptions));
server.use(bodyParser.json());

// POST request to create new coach account
server.post('/coaches', (request, response, next) => {
  const newRequest = Object.assign(request.body);
  db.collection('coaches').insertOne(newRequest).then((result) => { // eslint-disable-line no-undef
    response.send(result.ops[0]);
  }, next);
});

// POST request to create a new player account
server.post('/players', (request, response, next) => {
  const newRequest = Object.assign(request.body);
  db.collection('players').insertOne(newRequest).then((result) => { // eslint-disable-line no-undef
    response.send(result.ops[0]);
  }, next);
});

// GET request to authenticate a player user for login. Route is by email
server.get('/players/:email/:password', (request, response, next) => {
  const query = { email: request.params.email };
  db.collection('players').find(query).toArray().then((documents) => { // eslint-disable-line no-undef
    let found = false;
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].password === request.params.password) {
        response.send(documents[i]);
        found = true;
      }
    }
    if (!found) {
      response.sendStatus(401);
    }
  }, next);
});

// GET request to authenticate a coach user for login. Route is by email
server.get('/coaches/:email/:password', (request, response, next) => {
  const query = { email: request.params.email };
  db.collection('coaches').find(query).toArray().then((documents) => { // eslint-disable-line no-undef
    let found = false;
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].password === request.params.password) {
        response.send(documents[i]);
        found = true;
      }
    }
    if (!found) {
      response.sendStatus(401);
    }
  }, next);
});




// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const path = require('path'); // eslint-disable-line global-require
  const buildPath = path.resolve(__dirname, '../client/build');

  server.use(express.static(buildPath));

  // Serve the HTML file included in the CRA client on the root path
  server.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = {
  server,
  setDb: (newDb) => { db = newDb; }, // eslint-disable-line no-undef
};
