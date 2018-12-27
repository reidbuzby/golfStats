import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock } from 'react-bootstrap';
import fetchHelper from '../serverHelpers/FetchHelper';

class LoginMain extends Component {

  // PROPS:
  // updateViewCallback() -- funciton to tell ViewContainer what state to be in after login
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: null,
      password: null
    }
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
          // TODO: send back coach information in callback for future use
          console.log(response);
          this.props.updateViewCallback('player-view');
        }
      }).catch(err => console.log(err));


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
          // Validation succeeds
          // TODO: send back player information in callback for future use
          console.log(response)
          this.props.updateViewCallback('coach-view');
        }
      }).catch(err => console.log(err));


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

    const loginMain = (
      <div>
        <text>Are you a: </text>
        <ButtonGroup>
          <Button
            value="coach"
            onClick={() => this.handleIsCoach()}>
            Coach
          </Button>
          <Button
            value="player"
            onClick={() => this.handleIsPlayer()}>
            Player
          </Button>
        </ButtonGroup>
      </div>
    );

    const loginForm = (
      <form>
        <FormGroup controlId='login'>
          <ControlLabel>E-mail:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email}
            placeholder="golfer@middlebury.edu"
            onChange={(val) => this.updateEmail(val)}
          />
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.password}
            placeholder="******"
            onChange={(val) => this.updatePassword(val)}
          />
        </FormGroup>
        <Button
          onClick={() => this.handleLogin()}
          disabled={!(this.state.email != null && this.state.password != null)}>
          Login
        </Button>
        <Button onClick={() => this.handleNewUser()}>
          Create new user
        </Button>
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
