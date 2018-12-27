import React, { Component } from 'react';
import StatsTable from '../Components/StatsTable';

class PlayerViewContainer extends Component {

  // PROPS:
  // playerID -- the UID of the player to display
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <StatsTable whoAmI='player' playerID={this.props.playerID}/>
      </div>
    );
  }
}

export default PlayerViewContainer;
