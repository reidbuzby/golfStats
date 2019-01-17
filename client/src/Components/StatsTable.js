import React, { Component } from 'react';
import { Table, Grid, Col, Row } from 'react-bootstrap';

// TODO: Create a file for CoachStatTable, PlayerStatTable1, and PlayerStatTable2
//       and have all functions related to pulling stats in another seperate file.

// TODO hardcoded stats and players for now, pull from server later
const stats = { "reid" : { "stat1" : 5, "stat2" : 3, "stat3" : 3, "stat4" : 3, "stat5" : 3},
                "phil" : { "stat1" : 5, "stat2" : 3, "stat3" : 3, "stat4" : 3, "stat5" : 3}};

// TODO: make this modifiable so coach can choose which stats they want to be main stats shown
//       on their main screen
const mainStats = ['stat1', 'stat2', 'stat3', 'stat4', 'stat5']

class StatsTable extends Component {

  // PROPS:
  // whoAmI -- whether the user is a coach or player either 'player' or 'coach'
  // playerID -- OPTIONAL: UID of the player, if a player table is to be displayed. Undefined if showing coach table
  // coachID -- OPTIONAL: UID of the coach, if a coach table is to be displayed. Undefined if showing player table
  constructor(props) {
    super(props);

    this.state = {
      playerStats1: []
    }

    this.generateCoachRows = this.generateCoachRows.bind(this);
    this.pullPlayerStats = this.pullPlayerStats.bind(this);
  }

  // TODO get a list of player names (or UIDs) based on the given coach's team
  getAllPlayers(coachName) {
    // TODO: list of players returned should be based on coachName
    return ['reid', 'phil'];
  }

  getPlayer(player) {
    // TODO: returned player name (or UID) should be the inputed player name
    return ['reid']
  }

  // TODO: pull the team average for the inputed stat
  getTeamAverageStat(stat) {
    return 1.6969
  }

  // TODO instead of pulling from hardcoded mainStats, pull from server.
  // creates react-bootstrap rows for the stats table on all players
  generateCoachRows(coachName) {

    const players = this.getAllPlayers(coachName);

    // Only pulls the first n many stats from the stats dictionary, where n is the
    // length of the mainStats list. If want to make mainStats modifiable, cannot use
    // a for loop over stats dictionary
    return players.map((item, i) => {
      let playerStats = [item]
      for (let j = 0; j < mainStats.length; j++) {
        playerStats.push(stats[item][mainStats[j]]);
      }
      // playerStats[0] is the player name
      return [
        <tr>
          <th>{playerStats[0]}</th>
          <td>{playerStats[1]}</td>
          <td>{playerStats[2]}</td>
          <td>{playerStats[3]}</td>
          <td>{playerStats[4]}</td>
          <td>{playerStats[5]}</td>
        </tr>
      ];
    })
  }

  compareRounds(a, b) {
    if (a.timestamp < b.timestamp) {
      return -1;
    }
    if (a.timestamp > b.timestamp) {
      return 1;
    }
    return 0;
  }

  pullPlayerStats(playerID) {
    let stats = [];
    fetch(`/${this.props.playerID}/stats`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {
        this.setState({ playerStats1: data });
      });
    })
    .catch(err => console.log(err));
  }

  // 2019-01-09T00:22:23.268Z
  convertDateToString(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return month + '/' + day + '/' + year;
  }

  generatePlayerRowsTable1(playerID) {
    this.pullPlayerStats(playerID);

    const playerStats = this.state.playerStats1;

    let rows = [];

    if (playerStats.length !== 0) {
      for (let i=0;i<playerStats.length;i++) {
        const round = playerStats[i];

        // row: stat name, player average, team average
        rows.push(
          <tr>
            <td>{this.convertDateToString(round.timestamp)}</td>
            <td>{round.course}</td>
            <td>{round.data.score}</td>
            <td>{round.data.toPar}</td>
            <td>{round.data.firs}</td>
            <td>{round.data.proximity}</td>
            <td>{round.data.girs}</td>
            <td>{round.data.putts}</td>
            <td>{round.data.upAndDown}</td>
            <td>{round.data.shortsided}</td>
            <td>{round.data.sgpPro}</td>
            <td>{round.data.sgpScratch}</td>
            <td>{round.data.madeShort}</td>
          </tr>
        );
      }
    }

    return rows;
  }

  generatePlayerRowsTable2(playerID) {
    // TODO: pull total player and team stats here and generate table
  }

  render() {

    // TODO: change headers to the real stats
    const coachTable = (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stat 1</th>
            <th>Stat 2</th>
            <th>Stat 3</th>
            <th>Stat 4</th>
            <th>Stat 5</th>
          </tr>
        </thead>
        <tbody>
          {this.generateCoachRows(this.props.coachID)}
        </tbody>
      </Table>
    );

    const playerTable1 = (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Total score</th>
            <th>Score to par</th>
            <th>Fairways hit percentage</th>
            <th>Average approach shot proximity (ft)</th>
            <th>Greens in regulation percentage</th>
            <th>Total putts</th>
            <th>Up and down percentage</th>
            <th>Total times you were shortsided</th>
            <th>Strokes gained putting (Compared to pros)</th>
            <th>Strokes gained putting (Compared to scratch golfers)</th>
            <th>Make percentage inside 5 feet</th>
          </tr>
        </thead>
        <tbody>
          {this.generatePlayerRowsTable1(this.props.playerID)}
        </tbody>
      </Table>
    );

    // TODO: Maybe have last year, 6 months, 3 months etc. for each stat?
    const playerTable2 = (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th></th>
            <th>Your Average</th>
            <th>Team Average</th>
          </tr>
        </thead>
        <tbody>
          {this.generatePlayerRowsTable2(this.props.playerID)}
        </tbody>
      </Table>
    );

    if (this.props.whoAmI === 'coach') {
      return coachTable;
    }
    else if (this.props.whoAmI === 'player') {
      return playerTable1;
    }

  }
}

export default StatsTable;
