import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock } from 'react-bootstrap';

class LoginMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: null,
      password: null
    }
  }

  handleIsCoach() {
    this.setState({ user : 'coach' });
  }

  handleIsPlayer() {
    this.setState({ user : 'player' });
  }

  handleLogin() {
    /*
    ADD AUTHENTICATION HERE
    */

    // TODO if auth succeeds and user is coach
    if (this.state.user === 'coach') {
      this.props.updateViewCallback('coach-view');
    }
    // TODO if auth succeeds and user is player
    else {
      this.props.updateViewCallback('player-view');
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
          Submit
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
