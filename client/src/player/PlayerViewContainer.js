import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StatsTable from '../Components/StatsTable';

class PlayerViewContainer extends Component {

  // PROPS:
  // playerID -- the UID of the player to display
  // inputNewRoundCallback -- callback to change the view of the ViewContainer and send back player data
  // teamName -- team name of the player currently displayed
  constructor(props) {
    super(props)
  }

  inputNewRound() {
    this.props.inputNewRoundCallback('input-new-round', this.props.playerID, this.props.teamName);
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
