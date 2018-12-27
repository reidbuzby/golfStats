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

    this.generateCoachRows = this.generateCoachRows.bind(this);
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

  generatePlayerRows(playerName) {
    const playerStats = stats[playerName];

    let rows = [];

    for (var stat in playerStats) {
      // row: stat name, player average, team average
      rows.push(
        <tr>
          <th>{stat}</th>
          <td>{playerStats[stat]}</td>
          <td>{this.getTeamAverageStat(stat)}</td>
        </tr>
      );
    }

    return rows;
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

    // TODO: Maybe have last year, 6 months, 3 months etc. for each stat?
    const playerTable = (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th></th>
            <th>Your Average</th>
            <th>Team Average</th>
          </tr>
        </thead>
        <tbody>
          {this.generatePlayerRows(this.props.playerID)}
        </tbody>
      </Table>
    );

    if (this.props.whoAmI === 'coach') {
      return coachTable;
    }
    else if (this.props.whoAmI === 'player') {
      return playerTable;
    }

  }
}

export default StatsTable;
