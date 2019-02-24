import React, { Component } from 'react';
import { Table, Grid, Col, Row, Well, Button, ControlLabel, FormControl } from 'react-bootstrap';
import fetchHelper from '../serverHelpers/FetchHelper';

class PlayerJournal extends Component {

  // PROPS:
  // playerID -- player id of who to display log for
  // coach -- true if viewer of journal is a coach, false if not
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
    fetchHelper(`${this.props.playerID}/journal`, 'PUT', { body: this.state.newLog, timestamp: date }).then((added) => {
      console.log('Uploaded new log');
    }).catch(err => console.log(err)); // eslint-disable-line no-console
    this.setState({ viewMode: 'main', newLog: null });
  }

  cancelLog() {
    this.setState({ newLog: null, viewMode: 'main'});
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
    fetch(`/${this.props.playerID}/journal`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
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
      }
      else {
        this.setState({ logs: null });
      }

    });
  }

  render() {

    this.getLogs();

    if (this.state.viewMode === 'main' && this.props.coach === false) {
      return (
        <div style={{ marginTop: 15, marginBottom: 100 }}>
          <header>
            <h1>Player Journal:</h1>
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

    if (this.state.viewMode === 'main' && this.props.coach === true) {
      return (
        <div style={{ marginTop: 15, marginBottom: 100 }}>
          <header>
            <h1>Player Journal:</h1>
          </header>
          {this.state.logs}
        </div>
      );
    }

    return (
      <div style={{ marginTop: 15 }}>
        <ControlLabel>Write new journal entry here:</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="New log"
          value={this.state.newLog}
          onChange={(val) => this.updateLog(val)}
          style={{ width: 800, height: 200, marginLeft: (this.state.width / 2) - 400 }}
        />
        <Button
          value='submit-entry'
          onClick={() => this.submitLog()}
          disabled={(this.state.newLog === null)}
        >Submit Entry</Button>
        <Button
          value='cancel-entry'
          onClick={() => this.cancelLog()}
        >Cancel</Button>
      </div>
    );

  }
}

export default PlayerJournal;
