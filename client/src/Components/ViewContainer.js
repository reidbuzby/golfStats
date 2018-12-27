import React, { Component } from 'react';
import OpeningScreen from './OpeningScreen';
import RoundFormContainer from './RoundFormContainer';
import LoginMain from '../login/LoginMain';
import CoachViewContainer from '../coach/CoachViewContainer';
import PlayerViewContainer from '../player/PlayerViewContainer';
import CreateNewUser from '../login/CreateNewUser';

class ViewContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'login',
      userId: null
    };

    // this.inputRoundCallback = this.inputRoundCallback.bind(this);
    this.updateViewCallback = this.updateViewCallback.bind(this);
    this.successCallback = this.successCallback.bind(this);
  }

  // inputRoundCallback() {
  //   this.setState( {viewMode: "InputRound"} );
  // }

  updateViewCallback(view) {
    this.setState({ viewMode : view });
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

  render() {

    const loginScreen = (
      <div>
        <header>
          <h1>Golf Stats</h1>
        </header>
        <LoginMain updateViewCallback={this.updateViewCallback}/>
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
        <PlayerViewContainer playerUID={this.state.userID}/>
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

    }
    // if (this.state.viewMode === "Intro") {
    //   return (
    //     <div>
    //       <header>
    //         <h1>Golf Stats</h1>
    //       </header>
    //       <OpeningScreen inputRoundCallback={this.inputRoundCallback}/>
    //     </div>
    //   );
    // }
    // if (this.state.viewMode === "InputRound") {
    //   return (
    //     <div>
    //       <header>
    //         <h1>Golf Stats</h1>
    //       </header>
    //       <RoundFormContainer />
    //     </div>
    //   )
    // }

  }
}

export default ViewContainer;
