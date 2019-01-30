import React, { Component } from 'react';
import { Button, Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import LoginMain from '../login/LoginMain';
import CoachViewContainer from '../coach/CoachViewContainer';
import PlayerViewContainer from '../player/PlayerViewContainer';
import CreateNewUser from '../login/CreateNewUser';
import RoundForm from '../Components/RoundForm';

class ViewContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'login',
      userId: null,
      teamName: null,
      width: 0,
      height: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateViewCallback = this.updateViewCallback.bind(this);
    this.successCallback = this.successCallback.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
    this.inputNewRoundCallback = this.inputNewRoundCallback.bind(this);
    this.submittedRoundCallback = this.submittedRoundCallback.bind(this);
    this.logoutCallback = this.logoutCallback.bind(this);
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

  updateViewCallback(view) {
    this.setState({ viewMode : view });
  }

  inputNewRoundCallback(view, playerID, teamName) {
    this.setState({ viewMode: view, userId: playerID, teamName: teamName });
  }

  successCallback(uid, userType) {
    if (userType === 'player') {
      this.setState({ viewMode : 'player-view', userId : uid});
    }
    else if (userType === 'coach') {
      this.setState({ viewMode : 'coach-view', userId : uid});
    }
  }

  loginSuccessCallback(view, userID, teamName) {
    this.setState({ viewMode: view, userId: userID, teamName: teamName });
  }

  submittedRoundCallback() {
    this.setState({ viewMode: 'player-view' });
  }

  exitPlayer() {
    this.setState({ viewMode: 'player-view' });
  }

  logoutCallback() {
    this.setState({ viewMode: 'login' });
  }

  navBarSetup() {
    let navs = []
    for (let i=250;i<this.state.width;i+=50) {
      navs.push(
        <NavItem>
        </NavItem>
      );
    }
    return navs;
  }

  render() {

    const headerBar = (
      <div>
        <Navbar>
          <Navbar.Brand>CollegeGolfStats</Navbar.Brand>
        </Navbar>
      </div>
    );

    const roundForm = (
      <div>
        <Button value="exit" onClick={() => this.exitPlayer()} variant="primary" size="lg" style={{ position: 'absolute', top: 15, left: 15 }} >
          Exit
        </Button>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <RoundForm submittedRoundCallback={this.submittedRoundCallback} playerID={this.state.userId} teamName={this.state.teamName}/>
      </div>
    );

    const loginScreen = (
      <div>
        {headerBar}
        <LoginMain loginSuccessCallback={this.loginSuccessCallback} updateViewCallback={this.updateViewCallback}/>
      </div>
    );

    const coachView = (
      <div>
        <CoachViewContainer logoutCallback={this.logoutCallback} coachID={this.state.userId}/>
      </div>
    );

    const playerView = (
      <div>
        <PlayerViewContainer logoutCallback={this.logoutCallback} inputNewRoundCallback={this.inputNewRoundCallback} playerID={this.state.userId} teamName={this.state.teamName} updateViewCallback={this.updateViewCallback}/>
      </div>
    );

    const createNewCoach = (
      <div>
        {headerBar}
        <CreateNewUser userType='coach' successCallback={this.successCallback}/>
      </div>
    );

    const createNewPlayer = (
      <div>
        {headerBar}
        <CreateNewUser userType='player' successCallback={this.successCallback}/>
      </div>
    );

    // PLACEHOLDER FOR SUCCES OF INPUTED ROUND
    const submitted = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <text>Round Submitted</text>
      </div>
    );

    switch (this.state.viewMode) {
      case 'login':
        return loginScreen;

      case 'coach-view':
        return coachView;

      case 'player-view':
        return playerView;

      case 'create-new-coach':
        return createNewCoach;

      case 'create-new-player':
        return createNewPlayer;

      case 'input-new-round':
        return roundForm;

      case 'submitted':
        return submitted;

    }
  }
}

export default ViewContainer;
