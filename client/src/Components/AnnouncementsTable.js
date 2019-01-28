import React, { Component } from 'react';
import { Table, Grid, Col, Row, Well } from 'react-bootstrap';

class AnnouncementsTable extends Component {

  // PROPS:
  // playerID -- player id of who to display announcements for
  constructor(props) {
    super(props);

    this.state = {
      announcements: null,
      width: 0,
      height: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getAnnouncements();
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

  compareAnnouncements(a, b) {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    return 0;
  }

  getAnnouncements() {
    let announcements = [];
    fetch(`/${this.props.playerID}/announcements`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {

        data.sort(this.compareAnnouncements);

        for (let i=0;i<data.length;i++) {
          announcements.push(
            <div>
              <text>{this.convertDateToString(data[i].timestamp)}</text>
              <Well style={{ width: 800, marginLeft: (this.state.width / 2) - 400 }}>
                {data[i].body}
              </Well>
            </div>
          );
        }
        this.setState({ announcements: announcements });
      });
    });
  }

  render() {

    console.log(this.state.announcements);
    return (
      <div>
        <header>
          <h1>Team Announcements</h1>
        </header>
        {this.state.announcements}
      </div>
    );
  }
}

export default AnnouncementsTable;
