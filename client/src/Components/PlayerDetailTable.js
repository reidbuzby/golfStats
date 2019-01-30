import React, { Component } from 'react';
import { Table, Grid, Col, Row, Button, Well } from 'react-bootstrap';
import CalculateOverallStatistics from '../statistics/CalculateOverallStatistics';
import Popup from "reactjs-popup";

class PlayerDetailTable extends Component {

  // PROPS:
  // playerID -- player id of who to display detail for
  constructor(props) {
    super(props)

    this.state = {
      playerStats: [],
      playerID: this.props.playerID,
      rows: []
    }


    this.pullPlayerStats = this.pullPlayerStats.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ playerID: props.playerID });
    this.generateRows(this.state.playerID);
  }

  // 2019-01-09T00:22:23.268Z
  convertDateToString(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return month + '/' + day + '/' + year;
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
        this.setState({ playerStats: data });
      });
    })
    .catch(err => console.log(err));
  }

  generateRows(playerID) {
    fetch(`/${playerID}/stats`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {
        this.setState({ playerStats: data });
      });
    }).then(() => {
      const playerStats = this.state.playerStats;

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
        this.setState({ rows: rows });
      }
    //this.pullPlayerStats(playerID);
    })
  }

  render() {

    return (
      <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 100 }}>
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
            {this.state.rows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PlayerDetailTable;
