import React, { Component } from 'react';
import OpeningScreen from './OpeningScreen';
import RoundFormContainer from './RoundFormContainer';
import LoginMain from '../login/LoginMain';

class ViewContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'login'
    };

    // this.inputRoundCallback = this.inputRoundCallback.bind(this);
    this.updateViewCallback = this.updateViewCallback.bind(this);
  }

  // inputRoundCallback() {
  //   this.setState( {viewMode: "InputRound"} );
  // }

  updateViewCallback(view) {
    this.setState({ viewMode : view });
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
          <h2>Coach</h2>
        </header>
      </div>
    )

    const playerView = (
      <div>
        <header>
          <h1>Golf Stats</h1>
          <h2>Player</h2>
        </header>
      </div>
    )

    switch (this.state.viewMode) {
      case 'login':
        return loginScreen;

      case 'coach-view':
        return coachView;

      case 'player-view':
        return playerView;
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
