import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StatsTable from '../Components/StatsTable';

class PlayerViewContainer extends Component {

  // PROPS:
  // playerID -- the UID of the player to display
  // updateViewCallback -- callback to change the view of the ViewContainer
  constructor(props) {
    super(props)
  }

  inputNewRound() {
    this.props.updateViewCallback('input-new-round');
  }

  render() {

    const buttons = (
      <div>
        <Button
          value='input-round'
          onClick={() => this.inputNewRound()}
        >Input New Round</Button>
      </div>
    );

    return (
      <div>
        <StatsTable whoAmI='player' playerID={this.props.playerID}/>
        {buttons}
      </div>
    );
  }
}

export default PlayerViewContainer;
