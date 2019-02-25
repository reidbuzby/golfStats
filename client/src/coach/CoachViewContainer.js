import React, { Component } from 'react';
import { Table, Grid, Col, Row, Button, ControlLabel, NavDropdown, FormControl, Navbar, Nav, NavItem } from 'react-bootstrap';
import StatsTable from '../Components/StatsTable';
import CourseForm from '../Components/CourseForm';
import fetchHelper from '../serverHelpers/FetchHelper';
import CoachLog from '../Components/CoachLog';
import * as emailjs from 'emailjs-com';
import PlayerDetailTable from '../Components/PlayerDetailTable';
import PlayerJournal from '../player/PlayerJournal';

class CoachViewContainer extends Component {

  // PROPS:
  // coachID -- the UID of the coach to display the view for
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'team-stats',
      announcement: null,
      width: 0,
      height: 0,
      activeView: 1,
      players: [],
      detailID: null,
      detailame: null,
      dropdown: []
    }

    this.getPlayers();

    this.resetView = this.resetView.bind(this);
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

  resetView() {
    alert('Uploaded course successfully');
    this.setState({ viewMode: 'team-stats', activeView: 1 });
  }

  updateAnnouncement(val) {
    if (val.target.value === '') {
      this.setState({ announcement : null })
    }
    else {
      this.setState({ announcement : val.target.value })
    }
  }

  getPlayers() {
    fetch(`/teams/${this.props.coachID}/namesAndIds`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {
        this.setState({ players: data });
        this.createDropdown();
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  createDropdown() {
    const players = this.state.players;
    let dropdown = [];

    for (let i=0;i<players.length;i++) {
      dropdown.push(
        <NavItem
          onClick={() => {this.setState({ viewMode: 'detail-stats', detailID: players[i].id, activeView: 1, detailName: players[i].name })}}
        >{players[i].name}
        </NavItem>
      )
    }

    this.setState({ dropdown: dropdown });
  }

  sendAnnouncementEmails() {
    fetch(`/${this.props.coachID}/team/emails`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      response.json().then((data) => {
        const emails = data.emails;
        const teamName = data.teamName;

        const serviceID = "gmail";
        const templateID = "template_z65styWQ";
        const userID = "user_osqVZtCODFZfH3WUQdkIV";

        for (let i=0;i<emails.length;i++) {
          const params = {
            send_to: emails[i],
            team_name: teamName,
            message_body: this.state.announcement
          }

          emailjs.send(serviceID, templateID, params, userID)
            .then(function(){
               console.log('Sent email to', emails[i]);
             }, function(err) {
               console.log('Failed');
            });
        }
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  submitAnnouncement() {
    const date = new Date();
    fetchHelper(`${this.props.coachID}/announcement`, 'PUT', { body: this.state.announcement, timestamp: date }).then((added) => {
      console.log('Uploaded new announcement');
      this.sendAnnouncementEmails();
      alert('Sent Announcement Successfully');
    }).catch(err => console.log(err)); // eslint-disable-line no-console

  }

  cancelAnnouncement() {
    this.setState({ announcement: null, viewMode: 'main' });
  }

  exitCoach() {
    this.setState({ viewMode: 'main' });
  }

  render() {

    const headerBar = (
      <div>
        <Navbar>
          <Navbar.Brand>CollegeGolfStats</Navbar.Brand>
            <Nav activeKey={ this.state.activeView }>
              <NavDropdown eventKey={1} title="Team Stats">
                <NavItem onClick={() => {this.setState({ viewMode: 'team-stats', activeView: 1 })}}>Overall Stats</NavItem>
                {this.state.dropdown}
              </NavDropdown>

              <NavItem eventKey={2} onClick={() => {this.setState({ viewMode: 'announcements', activeView: 2 })}}>
                Announcements
              </NavItem>
              <NavItem eventKey={3} onClick={() => {this.setState({ viewMode: 'coach-log', activeView: 3 })}}>
                Coach Log
              </NavItem>
              <NavItem eventKey={4} onClick={() => {this.setState({ viewMode: 'new-course', activeView: 4 })}}>
                Add Courses
              </NavItem>
            </Nav>
            <Button style={{ position: 'absolute', marginTop: 7, marginRight: 5}} onClick={this.props.logoutCallback}>Logout</Button>
        </Navbar>
      </div>
    );

    switch (this.state.viewMode) {
      case 'team-stats':
        return (
          <div style={{ marginBottom: 100 }}>
            {headerBar}
            <StatsTable whoAmI='coach' displayDetailTable={this.displayDetailTable} coachID={this.props.coachID} style={{ marginLeft: 7, marginRight: 7 }}/>
          </div>
        );

      case 'announcements':
        return (
          <div style={{ marginBottom: 100 }}>
            {headerBar}
            <ControlLabel>Enter new team announcement here:</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="New announcement"
              value={this.state.announcement}
              onChange={(val) => this.updateAnnouncement(val)}
              style={{ width: 800, height: 200, marginLeft: (this.state.width / 2) - 400 }}
            />
            <Button
              value='submit-announcement'
              onClick={() => this.submitAnnouncement()}
              disabled={(this.state.announcement === null)}
            >Send Announcement</Button>
          </div>
        );

      case 'coach-log':
        return (
          <div style={{ marginBottom: 100 }}>
            {headerBar}
            <CoachLog coachID={this.props.coachID} />
          </div>
        );

      case 'new-course':
        return (
          <div style={{ marginBottom: 100 }}>
            {headerBar}
            <CourseForm successCallback={this.resetView}/>
          </div>
        );
      case 'detail-stats':
        return (
          <div style={{ marginBottom: 100 }}>
            {headerBar}
            <div>
              <h3>{this.state.detailName}</h3>
            </div>
            <div>
              <Button style={{ marginBottom: 15 }} onClick={() => {this.setState({ viewMode: 'detail-journal' })}}>View Player Journal</Button>
            </div>
            <PlayerDetailTable playerID={this.state.detailID} />
          </div>
        );
      case 'detail-journal':
        return (
          <div style={{ marginBottom: 100 }}>
            {headerBar}
            <div>
              <h3>{this.state.detailName}</h3>
            </div>
            <div>
              <Button style={{ marginBottom: 15 }} onClick={() => {this.setState({ viewMode: 'detail-stats' })}}>View Player Stats</Button>
            </div>
            <PlayerJournal coach={true} playerID={this.state.detailID} />
          </div>
        );
    }
  }

}

export default CoachViewContainer;
