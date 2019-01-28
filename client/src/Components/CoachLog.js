import React, { Component } from 'react';
import { Table, Grid, Col, Row, Well, Button, ControlLabel, FormControl } from 'react-bootstrap';
import fetchHelper from '../serverHelpers/FetchHelper';

class CoachLog extends Component {

  // PROPS:
  // coachID -- coach id of who to display log for
  constructor(props) {
    super(props);

    this.state = {
      logs: null,
      width: 0,
      height: 0,
      viewMode: 'main',
      newLog: null
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  convertDateToString(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return month + '/' + day + '/' + year;
  }

  updateLog(val) {
    if (val.target.value === '') {
      this.setState({ newLog : null })
    }
    else {
      this.setState({ newLog : val.target.value })
    }
  }

  addLog() {
    this.setState({ viewMode: 'newLog' })
  }

  submitLog() {
    const date = new Date();
    fetchHelper(`${this.props.coachID}/log`, 'PUT', { body: this.state.newLog, timestamp: date }).then((added) => {
      console.log('Uploaded new log');
    }).catch(err => console.log(err)); // eslint-disable-line no-console
    this.setState({ viewMode: 'main' });
  }

  compareLogs(a, b) {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    return 0;
  }

  getLogs() {
    let logs = [];
    fetch(`/${this.props.coachID}/logs`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {

        data.sort(this.compareLogs);

        for (let i=0;i<data.length;i++) {
          logs.push(
            <div>
              <text>{this.convertDateToString(data[i].timestamp)}</text>
              <Well style={{ width: 800, marginLeft: (this.state.width / 2) - 400 }}>
                {data[i].body}
              </Well>
            </div>
          );
        }
        this.setState({ logs: logs });
      });
    });
  }

  render() {

    this.getLogs();

    if (this.state.viewMode === 'main') {
      return (
        <div style={{ marginTop: 15 }}>
          <header>
            <h1>Coach Log:</h1>
          </header>
          <Button
            value='new-entry'
            onClick={() => this.addLog()}
            style={{ marginBottom: 15 }}
          >New Entry</Button>
          {this.state.logs}
        </div>
      );
    }

    return (
      <div style={{ marginTop: 15 }}>
        <ControlLabel>Enter new coach log here:</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="New log"
          value={this.state.newLog}
          onChange={(val) => this.updateLog(val)}
          style={{ width: 800, height: 200, marginLeft: (this.state.width / 2) - 400 }}
        />
        <Button
          value='submit-announcement'
          onClick={() => this.submitLog()}
          disabled={(this.state.newLog === null)}
        >Submit Log</Button>
      </div>
    );

  }
}

export default CoachLog;
