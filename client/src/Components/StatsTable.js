import React, { Component } from 'react';
import { Table, Grid, Col, Row, Button, Well } from 'react-bootstrap';
import CalculateOverallStatistics from '../statistics/CalculateOverallStatistics';
import Popup from "reactjs-popup";

// TODO: make this modifiable so coach can choose which stats they want to be main stats shown
//       on their main screen
const mainStats = [['Total score', 'score'],
                   ['Score to par', 'toPar'],
                   ['Fairways hit percentage', 'firs'],
                   ['Approach shot proximity (ft)', 'proximity'],
                   ['Greens in regulation percentage', 'girs'],
                   ['Total putts', 'putts'],
                   ['Up and down percentage', 'upAndDown'],
                   ['Total shots shortsided', 'shortsided'],
                   ['Strokes gained putting (Compared to pros)', 'sgpPro'],
                   ['Strokes gained putting (Compared to scratch golfers)', 'sgpScratch'],
                   ['Make percentage inside 5 feet', 'madeShort']];

class StatsTable extends Component {

  // PROPS:
  // whoAmI -- whether the user is a coach or player either 'player' or 'coach'
  // playerID -- OPTIONAL: UID of the player, if a player table is to be displayed. Undefined if showing coach table
  // coachID -- OPTIONAL: UID of the coach, if a coach table is to be displayed. Undefined if showing player table
  constructor(props) {
    super(props);

    this.state = {
      playerStats1: [],
      overallStats: [],
      playerIDs: [],
      coachRows: []
    }

    this.generateCoachRows = this.generateCoachRows.bind(this);
    this.pullPlayerStats = this.pullPlayerStats.bind(this);

    if (this.props.coachID) {
      this.generateCoachRows(this.props.coachID)
    }
  }

  // TODO instead of pulling from hardcoded mainStats, pull from server.
  // creates react-bootstrap rows for the stats table on all players
  generateCoachRows(coachID) {
    fetch(`/teams/${coachID}`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {
        this.setState({ playerIDs: data });
      })
      .then(() => {
        for (let i=0;i<this.state.playerIDs.length;i++) {
          fetch(`/${this.state.playerIDs[i]}/stats`, {
            method: 'GET',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }).then((response) => {
            response.json().then((data) => {
              const statsCalc = new CalculateOverallStatistics(data);
              const playerAverages = statsCalc.calculate();

              fetch(`/${this.state.playerIDs[i]}/name`, {
                method: 'GET',
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }),
              }).then((response2) => {
                response2.json().then((data2) => {
                  const rows = this.state.coachRows;
                  rows.push(
                    <tr>
                      <td>{data2.name}</td>
                      <td>{playerAverages.score}</td>
                      <td>{playerAverages.toPar}</td>
                      <td>{playerAverages.firs}</td>
                      <td>{playerAverages.proximity}</td>
                      <td>{playerAverages.girs}</td>
                      <td>{playerAverages.putts}</td>
                      <td>{playerAverages.upAndDown}</td>
                      <td>{playerAverages.shortsided}</td>
                      <td>{playerAverages.sgpPro}</td>
                      <td>{playerAverages.sgpScratch}</td>
                      <td>{playerAverages.madeShort}</td>
                    </tr>
                  );
                  this.setState({ coachRows: rows });
                });
              });
            });
          })
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  compareRounds(a, b) {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    return 0;
  }

  pullPlayerStats(playerID) {
    fetch(`/${playerID}/stats`, {
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

  pullAllPlayerStats() {
    fetch(`/players/${this.props.playerID}/allStats`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {
        this.setState({ overallStats: data });
      })
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

    playerStats.sort(this.compareRounds);

    if (playerStats.length !== 0) {
      for (let i=0;i<playerStats.length;i++) {
        const round = playerStats[i];

        const popUp = (
          <Popup trigger={<Button>View Round Notes</Button>} modal closeOnDocumentClick>
            <span>
              <div>
                <header>
                  <h1>Round Notes:</h1>
                </header>
                <Well>{round.notes}</Well>
              </div>
            </span>
          </Popup>
        );

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
            <td>{round.weather}</td>
            <td>{round.wind}</td>
            <td>{popUp}</td>
          </tr>
        );
      }
    }

    return rows;
  }

  generatePlayerRowsTable2() {
    this.pullAllPlayerStats();

    const statsCalc = new CalculateOverallStatistics(this.state.overallStats);
    const teamAverages = statsCalc.calculate();

    const statsCalc2 = new CalculateOverallStatistics(this.state.playerStats1);
    const playerAverages = statsCalc2.calculate();


    let rows = [];

    for (let i=0;i<mainStats.length;i++) {
      rows.push(
        <tr>
          <td>{mainStats[i][0]}</td>
          <td>{playerAverages[mainStats[i][1]]}</td>
          <td>{teamAverages[mainStats[i][1]]}</td>
        </tr>
      );
    }

    return rows;
  }

  render() {

    // TODO: change headers to the real stats
    const coachTable = (
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Scoring Average</th>
              <th>Scoring Average to par</th>
              <th>Fairways hit percentage</th>
              <th>Average approach shot proximity (ft)</th>
              <th>Greens in regulation percentage</th>
              <th>Total putts</th>
              <th>Up and down percentage</th>
              <th>Average shortsided shots</th>
              <th>Strokes gained putting (Compared to pros)</th>
              <th>Strokes gained putting (Compared to scratch golfers)</th>
              <th>Make percentage inside 5 feet</th>
            </tr>
          </thead>
          <tbody>
            {(this.props.coachID) ? this.state.coachRows : null}
          </tbody>
        </Table>
      </div>
    );

    const playerTable1 = (
      <div style={{ marginLeft: 20, marginRight: 20 }}>
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
              <th>Weather conditions</th>
              <th>Wind conditions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(this.props.playerID) ? this.generatePlayerRowsTable1(this.props.playerID) : null}
          </tbody>
        </Table>
      </div>
    );

    // TODO: Maybe have last year, 6 months, 3 months etc. for each stat?
    const playerTable2 = (
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <td>Stat</td>
              <th>Your Average</th>
              <th>Team Average</th>
            </tr>
          </thead>
          <tbody>
            {(this.props.playerID) ? this.generatePlayerRowsTable2() : null}
          </tbody>
        </Table>
      </div>
    );

    if (this.props.whoAmI === 'coach') {
      return coachTable;
    }
    else if (this.props.whoAmI === 'player1') {
      return (
        <div>
          {playerTable1}
        </div>
      );
    }
    else if (this.props.whoAmI === 'player2') {
      return (
        <div>
          {playerTable2}
        </div>
      );
    }
  }
}

export default StatsTable;
