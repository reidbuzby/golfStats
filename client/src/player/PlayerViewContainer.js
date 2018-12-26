import React, { Component } from 'react';
import StatsTable from '../Components/StatsTable';

class PlayerViewContainer extends Component {

  // PROPS:
  // playerName -- the UID or name of the player to display
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <StatsTable whoAmI='player' playerName={this.props.playerName}/>
      </div>
    );
  }
}

export default PlayerViewContainer;
