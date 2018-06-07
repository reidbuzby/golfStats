import React, { Component } from 'react';

class OpeningScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.inputRoundCallback}>
          Input New Round
        </button>
      </div>
    );
  }

}

export default OpeningScreen;
