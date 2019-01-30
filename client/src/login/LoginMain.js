import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock } from 'react-bootstrap';
import fetchHelper from '../serverHelpers/FetchHelper';

class LoginMain extends Component {

  // PROPS:
  // updateViewCallback() -- funciton to tell ViewContainer what state to be in after login POSSIBLY DONT NEED BECAUSE FUNCTION BELOW HANDLES
  // loginSuccessCallback() -- function to tell ViewContainer what state to be in after login and send user info back to ViewContainer
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: null,
      password: null,
      width: 0,
      height: 0
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

  handleNewUser() {
    if (this.state.user === 'coach') {
      this.props.updateViewCallback('create-new-coach');
    }
    // TODO if auth succeeds and user is player
    else if (this.state.user === 'player') {
      this.props.updateViewCallback('create-new-player');
    }
  }

  handleIsCoach() {
    this.setState({ user : 'coach' });
  }

  handleIsPlayer() {
    this.setState({ user : 'player' });
  }

  handleLogin() {
    const userObj = {
      email: this.state.email,
      password: this.state.password
    }

    if (this.state.user === 'player') {
      fetch(`players/${this.state.email}/${this.state.password}`, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }).then((response) => {
        if (!response.ok) {
          alert('Email or Password is incorrect')
        }
        else {
          // Validation succeeds
          return response.json();
        }
      })
      .then((data) => {
        this.props.loginSuccessCallback('player-view', data._id, data.playerTeam);
      })
      .catch(err => console.log(err));
    }

    else if (this.state.user === 'coach') {
      fetch(`coaches/${this.state.email}/${this.state.password}`, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }).then((response) => {
        if (!response.ok) {
          alert('Email or Password is incorrect')
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        this.props.loginSuccessCallback('coach-view', data._id, data.teamName);
      })
      .catch(err => console.log(err));


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

  updateEmail(val) {
    if (val.target.value === '') {
      this.setState({ email : null })
    }
    else {
      this.setState({ email : val.target.value })
    }
  }

  render() {

    const buttons = (
      <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px' }}>
        <Button
          value='add-course'
          bsSize="large"
          block
          onClick={() => this.addCourse()}
        >Add Course</Button>
        <Button
          value='new-announcement'
          bsSize="large"
          block
          onClick={() => this.addAnnouncement()}
        >New Announcement</Button>
      </div>
    );

    const loginMain = (
      <div>
        <ControlLabel>Are you a: </ControlLabel>
        <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px' }}>
          <Button
            value="coach"
            bsSize="large"
            block
            onClick={() => this.handleIsCoach()}>
            Coach
          </Button>
          <Button
            value="player"
            bsSize="large"
            block
            onClick={() => this.handleIsPlayer()}>
            Player
          </Button>
        </div>
      </div>
    );

    const loginForm = (
      <form>
        <FormGroup controlId='login'>
          <ControlLabel>E-mail:</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={(val) => this.updateEmail(val)}
            style={{ width: 400, marginLeft: this.state.width/2 - 200 }}
          />
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={(val) => this.updatePassword(val)}
            style={{ width: 400, marginLeft: this.state.width/2 - 200 }}
          />
        </FormGroup>
        <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px' }}>
          <Button
            onClick={() => this.handleLogin()}
            block
            disabled={!(this.state.email != null && this.state.password != null)}>
            Login
          </Button>
          <Button block onClick={() => this.handleNewUser()}>
            Create new user
          </Button>
        </div>

      </form>
    );

    // Initial login screen
    if (this.state.user == null) {
      return loginMain
    }

    // If user is a player
    else if (this.state.user == 'player') {
      return (
        <div>
          <header>
            <h1>
            Player Login
            </h1>
          </header>
          {loginForm}
        </div>
      );
    }

    // If user is a coach
    else if (this.state.user == 'coach') {
      return (
        <div>
          <header>
            <h1>
            Coach Login
            </h1>
          </header>
          {loginForm}
        </div>
      );
    }
  }
}


export default LoginMain;
