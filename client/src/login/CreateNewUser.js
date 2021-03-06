import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import fetchHelper from '../serverHelpers/FetchHelper';

class CreateNewUser extends Component {

  // PROPS:
  // userType -- either 'player' or 'coach', tells form what to look like
  // successCallback -- callback to ViewContainer when a new user is successfully created,
  //                    takes the uid of the new user and the user type
  constructor(props) {
    super(props)

    this.state = {
      fullName : null,
      email : null,
      teamName : null,
      password : null,
      confirmPassword : null,
      playerTeam : null,
      teams : null,
      width: 0,
      height: 0
    }

    this.getTeams();

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

  updateName(val) {
    if (val.target.value === '') {
      this.setState({ fullName : null })
    }
    else {
      this.setState({ fullName : val.target.value })
    }
  }

  updateEmail(val) {
    if (val.target.value === '') {
      this.setState({ email : null })
    }
    else {
      this.setState({ email : val.target.value })
    }
  }

  updateTeamName(val) {
    if (val.target.value === '') {
      this.setState({ teamName : null })
    }
    else {
      this.setState({ teamName : val.target.value })
    }
  }

  updatePassword(val) {
    if (val.target.value === '') {
      this.setState({ password : null })
    }
    else {
      this.setState({ password : val.target.value })
    }
  }

  updateConfirmPassword(val) {
    if (val.target.value === '') {
      this.setState({ confirmPassword : null })
    }
    else {
      this.setState({ confirmPassword : val.target.value })
    }
  }

  updatePlayerTeam(val) {
    if (val.target.value === null) {// might need to change back to "null"
      this.setState({ playerTeam : null })
    }
    else {
      this.setState({ playerTeam : val.target.value })
    }
  }

  // Creates new coach in server, creates new team linked to coach id
  handleNewCoach() {
    const newCoach = {
      fullName : this.state.fullName,
      email : this.state.email,
      teamName : this.state.teamName,
      password : this.state.password,
      logs : []
    }

    if (this.state.password === this.state.confirmPassword) {
      fetchHelper('/coaches', 'POST', newCoach).then((createdCoach) => {
        console.log('Created new coach', createdCoach);
        const uid = createdCoach._id;

        const newTeam = {
          coachID : uid,
          teamName : createdCoach.teamName,
          players : [],
          announcements : [],
          playerEmails : [],
          namesAndIds: []
        }

        fetchHelper('/teams', 'POST', newTeam).then((createdTeam) => {
          console.log('Created new team', createdTeam);
        }).catch(err => console.log(err));

        this.props.successCallback(uid, 'coach');
      }).catch(err => console.log(err)); // eslint-disable-line no-console
    }
    else {
      alert('Passwords do not match');
    }
  }

  handleNewPlayer() {
    const newPlayer = {
      fullName : this.state.fullName,
      email : this.state.email,
      playerTeam : this.state.playerTeam,
      password : this.state.password,
      rounds : [],
      journal : []
    }

    if (this.state.password === this.state.confirmPassword) {
      fetchHelper('/players', 'POST', newPlayer).then((createdPlayer) => {
        const uid = createdPlayer._id;
        const newID = { playerID: uid, email: createdPlayer.email, name: createdPlayer.fullName };
        fetchHelper(`/teams/${newPlayer.playerTeam}`, 'PUT', newID).then((added) => {
          console.log('Created new player and linked player to their team');
        }).catch(err => console.log(err)); // eslint-disable-line no-console

        this.props.successCallback(uid, 'player');
      }).catch(err => console.log(err)); // eslint-disable-line no-console
    }
    else {
      alert('Passwords do not match');
    }
  }

  getTeams() {
    fetchHelper('/teams', 'GET').then((teamNames) => {
      let options = [];
      options.push(<option value={null}>--</option>);
      for (let i=0;i<teamNames.length;i++) {
        options.push(<option value={teamNames[i]}>{teamNames[i]}</option>);
      }
      this.setState({ teams: options });
    }).catch(err => console.log(err));
  }


  render() {

    const newCoachForm = (
      <form>
        <FormGroup controlId='new-coach'>
          <ControlLabel>Full Name:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="text"
            value={this.state.fullName}
            placeholder="John Smith"
            onChange={(val) => this.updateName(val)}
          />
          <ControlLabel>E-mail:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="text"
            value={this.state.email}
            placeholder="golfer@middlebury.edu"
            onChange={(val) => this.updateEmail(val)}
          />
          <ControlLabel>Enter Your Team Name:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="text"
            value={this.state.teamName}
            placeholder="Middlebury Mens Golf"
            onChange={(val) => this.updateTeamName(val)}
          />
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="password"
            value={this.state.password}
            placeholder="******"
            onChange={(val) => this.updatePassword(val)}
          />
          <ControlLabel>Confirm Password:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="password"
            value={this.state.confirmPassword}
            placeholder="******"
            onChange={(val) => this.updateConfirmPassword(val)}
          />
        </FormGroup>
        <Button
          onClick={() => this.handleNewCoach()}
          disabled={!(this.state.fullName != null && this.state.email != null && this.state.teamName != null && this.state.password != null && this.state.confirmPassword != null)}>
          Create New Account
        </Button>
      </form>
    );

    // TODO: change the drop down menu for selecting a team to pull from a list of teams from the server
    const newPlayerForm = (
      <form>
        <FormGroup controlId='new-player'>
          <ControlLabel>Full Name:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="text"
            value={this.state.fullName}
            placeholder="John Smith"
            onChange={(val) => this.updateName(val)}
          />
          <ControlLabel>E-mail:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="text"
            value={this.state.email}
            placeholder="golfer@middlebury.edu"
            onChange={(val) => this.updateEmail(val)}
          />
          <ControlLabel>What team are you on?</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            componentClass="select"
            placeholder="..."
            value={this.state.playerTeam}
            onChange={(val) => this.updatePlayerTeam(val)}
          >
            {this.state.teams}
          </FormControl>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="password"
            value={this.state.password}
            placeholder="******"
            onChange={(val) => this.updatePassword(val)}
          />
          <ControlLabel>Confirm Password:</ControlLabel>
          <FormControl
            style={{ width: 400, marginLeft: this.state.width/2 - 200}}
            type="password"
            value={this.state.confirmPassword}
            placeholder="******"
            onChange={(val) => this.updateConfirmPassword(val)}
          />
        </FormGroup>
        <Button
          onClick={() => this.handleNewPlayer()}
          disabled={!(this.state.fullName != null && this.state.email != null && this.state.playerTeam != null && this.state.password != null && this.state.confirmPassword != null)}>
          Create New Account
        </Button>
      </form>
    );

    if (this.props.userType === 'player') {
      return (
        <div>
          {newPlayerForm}
        </div>
      );
    }
    else if (this.props.userType === 'coach') {
      return (
        <div>
          {newCoachForm}
        </div>
      );
    }
  }
}

export default CreateNewUser;
