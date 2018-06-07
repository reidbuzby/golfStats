import React, { Component } from 'react';
import OpeningScreen from './OpeningScreen';
import RoundFormContainer from './RoundFormContainer';

class ViewContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewMode: "Intro"
    };

    this.inputRoundCallback = this.inputRoundCallback.bind(this);
  }

  inputRoundCallback() {
    this.setState( {viewMode: "InputRound"} );
  }

  render() {
    if (this.state.viewMode === "Intro") {
      return (
        <div>
          <header>
            <h1>Golf Stats</h1>
          </header>
          <OpeningScreen inputRoundCallback={this.inputRoundCallback}/>
        </div>
      );
    }
    if (this.state.viewMode === "InputRound") {
      return (
        <div>
          <header>
            <h1>Golf Stats</h1>
          </header>
          <RoundFormContainer />
        </div>
      )
    }

  }
}

export default ViewContainer;
