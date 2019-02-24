const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID, MongoError } = require('mongodb'); // eslint-disable-line no-unused-vars
const mandrill = require('node-mandrill')('f9c138ed55c4636f0100129ae4711173-us20');

const server = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin'],
};

server.use(cors(corsOptions));
server.use(bodyParser.json());

// POST request to create new course
server.post('/courses', (request, response, next) => {
  const newCourse = Object.assign(request.body);
  db.collection('courses').insertOne(newCourse).then((result) => { // eslint-disable-line no-undef
    response.send(result.ops[0]);
  }, next);
});

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

// POST request to create a new team
server.post('/teams', (request, response, next) => {
  const newRequest = Object.assign(request.body);
  db.collection('teams').insertOne(newRequest).then((result) => {
    response.send(result.ops[0]);
  }, next);
});

// PUT request to add a new coach announcement
server.put('/:coachID/announcement', (request, response, next) => {
  const newAnnouncement = Object.assign(request.body);
  db.collection('teams').findOne({ coachID: request.params.coachID }).then((result) => {
    const announcements = result.announcements;
    announcements.push(newAnnouncement);

    db.collection('teams').findOneAndUpdate(
      { coachID: request.params.coachID },
      { $set: { announcements: announcements }},
      { returnOriginal: false },
    )
    .then((result) => {
      response.send(result.value);
    }, next);
  }, next);
});

// PUT request to add a new coach log
server.put('/:coachID/log', (request, response, next) => {
  const oid = ObjectID(request.params.coachID);
  const query = { _id: oid };
  const newLog = Object.assign(request.body);
  db.collection('coaches').findOne(query).then((result) => {
    const logs = result.logs;
    logs.push(newLog);

    db.collection('coaches').findOneAndUpdate(
      { _id: oid },
      { $set: { logs: logs }},
      { returnOriginal: false },
    )
    .then((result) => {
      response.send(result.value);
    }, next);
  }, next);
});

// PUT request to add a new player journal entry
server.put('/:playerID/journal', (request, response, next) => {
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };
  const newLog = Object.assign(request.body);
  db.collection('players').findOne(query).then((result) => {
    const entries = result.journal;
    entries.push(newLog);

    db.collection('players').findOneAndUpdate(
      { _id: oid },
      { $set: { journal: entries }},
      { returnOriginal: false },
    )
    .then((result) => {
      response.send(result.value);
    }, next);
  }, next);
});

// PUT request to add round data to a player Object
server.put('/:playerID/newRound', (request, response, next) => {
  const newRound = Object.assign(request.body);
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };
  db.collection('players').findOne(query).then((result) => {
    const rounds = result.rounds;
    rounds.push(newRound);

    db.collection('players').findOneAndUpdate(
      { _id: oid },
      { $set: { rounds: rounds }},
      { returnOriginal: false },
    )
    .then((result) => {
      response.send(result.value);
    }, next);
  }, next);
});

// PUT request to add player id to linked team
server.put('/teams/:teamName', (request, response, next) => {
  const newPlayer = Object.assign(request.body);
  db.collection('teams').findOne({ teamName: request.params.teamName })
    .then((result) => {
      const playersList = result.players;
      playersList.push(newPlayer.playerID);

      const playerEmails = result.playerEmails;
      playerEmails.push(newPlayer.email);

      const namesAndIds = result.namesAndIds;
      namesAndIds.push({ name: newPlayer.name, id: newPlayer.playerID });

      db.collection('teams') // eslint-disable-line no-undef
        .findOneAndUpdate(
          { teamName: request.params.teamName },
          { $set: { players: playersList, playerEmails: playerEmails, namesAndIds: namesAndIds } },
          { returnOriginal: false },
        )
        .then((result) => {
          response.send(result.value);
        }, next);
    }, next);
});

// GET request to pull team email list
server.get('/:coachID/team/emails', (request, response, next) => {
  const query = { coachID: request.params.coachID };
  db.collection('teams').findOne(query).then((result) => {
    if (result) {
      response.send({ emails: result.playerEmails, teamName: result.teamName });
    }
    else {
      response.sendStatus(403);
    }
  });
});

// GET request to pull all team names
server.get('/teams', (request, response, next) => {
  db.collection('teams').find({}).toArray().then((documents) => {
    let teamNames = [];
    for (let i=0;i<documents.length;i++) {
      teamNames.push(documents[i].teamName);
    }
    response.send(teamNames);
  });
});


// GET request to pull all coach logs
server.get('/:coachID/logs', (request, response, next) => {
  const oid = ObjectID(request.params.coachID);
  const query = { _id: oid };

  db.collection('coaches').findOne(query).then((result) => {
    if (result) {
      response.send(result.logs);
    }
    else {
      response.sendStatus(403);
    }
  })
});

// GET request to pull player journal entries
server.get('/:playerID/journal', (request, response, next) => {
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };

  db.collection('players').findOne(query).then((result) => {
    if (result) {
      response.send(result.journal);
    }
    else {
      response.sendStatus(403);
    }
  })
});

// GET request to pull all team announcements
server.get('/:playerID/announcements', (request, response, next) => {
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };

  db.collection('players').findOne(query).then((result) => {
    if (result) {
      const teamName = result.playerTeam;
      const overallStats = [];

      db.collection('teams').findOne({ teamName: teamName }).then((result2) => {
        if (result2) {
          response.send(result2.announcements);
        }
        else {
          response.sendStatus(403);
        }
      })
    }
    else {
      response.sendStatus(403);
    }
  })
});

// GET request to pull all player ID's for a team based on coach ID
server.get('/teams/:coachID', (request, response, next) => {
  const query = { coachID: request.params.coachID };
  db.collection('teams').findOne(query).then((result) => {
    if (result) {
      response.send(result.players);
    }
    else {
      response.sendStatus(403);
    }
  });
});

// GET request to return all stats for a given player's team
server.get('/players/:playerID/allStats', (request, response, next) => {
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };

  db.collection('players').findOne(query).then((result) => {
    if (result) {
      const teamName = result.playerTeam;
      const overallStats = [];

      db.collection('teams').findOne({ teamName: teamName }).then((result2) => {
        if (result2) {
          const playerIDs = result2.players;
          let playerQuery = [];
          for (let i=0;i<playerIDs.length;i++) {
            const oid2 = ObjectID(playerIDs[i]);
            playerQuery.push( { _id: oid2 } );
          }

          const query2 = { $or: playerQuery };

          db.collection('players').find(query2).toArray().then((documents) => {
            for (let i=0;i<documents.length;i++) {
              for (let j=0;j<documents[i].rounds.length;j++) {
                overallStats.push(documents[i].rounds[j]);
              }
            }
            response.send(overallStats);
          });
        }
        else {
          response.sendStatus(403);
        }
      });
    }
    else {
      response.sendStatus(403);
    }
  });
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
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].password === request.params.password) {
        response.send(documents[i]);
      }
    }
    response.sendStatus(401);
  }, next);
});

// GET request to pull a users stats
server.get('/:playerID/stats', (request, response, next) => {
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };

  db.collection('players').findOne(query).then((result) => {
    if (result) {
      response.send(result.rounds);
    }
    else {
      // Bad request
      response.sendStatus(403);
    }
  });
});

// GET request to pull player names and ids
server.get('/teams/:coachID/namesAndIds', (request, response, next) => {
  const query = { coachID: request.params.coachID };
  db.collection('teams').findOne(query).then((result) => {
    if (result) {
      response.send(result.namesAndIds);
    }
    else {
      response.sendStatus(403);
    }
  });
});

// GET request to pull a user's name
server.get('/:playerID/name', (request, response, next) => {
  const oid = ObjectID(request.params.playerID);
  const query = { _id: oid };

  db.collection('players').findOne(query).then((result) => {
    if (result) {
      response.send({ name: result.fullName} );
    }
    else {
      // Bad request
      response.sendStatus(403);
    }
  });
});

// GET request to pull all courses
server.get('/courses', (request, response, next) => {
  db.collection('courses').find({}).toArray().then((result) => {
    if (result) {
      response.send(result);
    }
    else {
      // Bad request
      response.sendStatus(403);
    }
  });
});

// GET request to pull a course by id
server.get('/courses/:courseID', (request, response, next) => {
  const oid = ObjectID(request.params.courseID);
  const query = { _id: oid };
  db.collection('courses').findOne(query).then((result) => {
    if (result) {
      response.send(result);
    }
    else {
      // Bad request
      response.sendStatus(403);
    }
  });
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
