import React, { Component } from 'react';
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
      teamName: null
    };

    // this.inputRoundCallback = this.inputRoundCallback.bind(this);
    this.updateViewCallback = this.updateViewCallback.bind(this);
    this.successCallback = this.successCallback.bind(this);
    this.loginSuccessCallback = this.loginSuccessCallback.bind(this);
    this.inputNewRoundCallback = this.inputNewRoundCallback.bind(this);
    this.submittedRoundCallback = this.submittedRoundCallback.bind(this);
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
      console.log('uid:', uid)
    }
    else if (userType === 'coach') {
      this.setState({ viewMode : 'coach-view', userId : uid});
      console.log('uid:', uid)
    }
  }

  loginSuccessCallback(view, userID, teamName) {
    console.log('success', userID, teamName);
    this.setState({ viewMode: view, userId: userID, teamName: teamName });
  }

  submittedRoundCallback() {
    this.setState({ viewMode: 'player-view' });
  }

  roundSuccessCallback() {

  }

  render() {

    const roundForm = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <RoundForm submittedRoundCallback={this.submittedRoundCallback} roundSuccessCallback={this.roundSuccessCallback} playerID={this.state.userId} teamName={this.state.teamName}/>
      </div>
    );

    const loginScreen = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <LoginMain loginSuccessCallback={this.loginSuccessCallback} updateViewCallback={this.updateViewCallback}/>
      </div>
    );

    const coachView = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <CoachViewContainer coachUID={this.state.userID}/>
      </div>
    );

    const playerView = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <PlayerViewContainer inputNewRoundCallback={this.inputNewRoundCallback} playerID={this.state.userId} teamName={this.state.teamName} updateViewCallback={this.updateViewCallback}/>
      </div>
    );

    const createNewCoach = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <CreateNewUser userType='coach' successCallback={this.successCallback}/>
      </div>
    );

    const createNewPlayer = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
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
