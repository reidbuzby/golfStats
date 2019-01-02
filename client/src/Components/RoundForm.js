import React, { Component } from 'react';
import HoleForm from '../Components/HoleForm';

class RoundForm extends Component {

  // PROPS:
  // updateViewCallback -- tells the ViewContainer what to display
  constructor(props) {
    super(props);

    this.state = {
      hole: 1,
      data: require('../classes/BlankRound.json')
    };

    console.log(this.state.data);

    this.nextHoleUpdate = this.nextHoleUpdate.bind(this);
    this.previousHoleUpdate = this.previousHoleUpdate.bind(this);

  }

  nextHoleUpdate(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    console.log('hole data: ', holeData.puttsLength);

    currentHoleDataCopy.teeShot = holeData.teeShot;
    currentHoleDataCopy.approachShot = holeData.approachShot;
    currentHoleDataCopy.upAndDown = holeData.upAndDown;
    currentHoleDataCopy.putts = holeData.putts;
    currentHoleDataCopy.puttsLength = holeData.puttsLength;
    currentHoleDataCopy.score = holeData.score;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    console.log(this.state.data);

    this.setState({ data: dataCopy, hole: this.state.hole + 1 });
  }

  previousHoleUpdate(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    console.log('hole data: ', holeData.puttsLength);

    currentHoleDataCopy.teeShot = holeData.teeShot;
    currentHoleDataCopy.approachShot = holeData.approachShot;
    currentHoleDataCopy.upAndDown = holeData.upAndDown;
    currentHoleDataCopy.putts = holeData.putts;
    currentHoleDataCopy.puttsLength = holeData.puttsLength;
    currentHoleDataCopy.score = holeData.score;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    this.setState({ data: dataCopy, hole: this.state.hole - 1 });
  }

  render() {

    let holeForm = (
      <HoleForm
        sendDataCallbackNext={this.nextHoleUpdate}
        sendDataCallbackPrevious={this.previousHoleUpdate}
        hole={this.state.hole}
        score={this.state.data.data[this.state.hole - 1].score}
        teeShot={this.state.data.data[this.state.hole - 1].teeShot}
        approachShot={this.state.data.data[this.state.hole - 1].approachShot}
        upAndDown={this.state.data.data[this.state.hole - 1].upAndDown}
        putts={this.state.data.data[this.state.hole - 1].putts}
        putt1={this.state.data.data[this.state.hole - 1].puttsLength[0]}
        putt2={this.state.data.data[this.state.hole - 1].puttsLength[1]}
        putt3={this.state.data.data[this.state.hole - 1].puttsLength[2]}
        putt4={this.state.data.data[this.state.hole - 1].puttsLength[3]}
        putt5={this.state.data.data[this.state.hole - 1].puttsLength[4]}
      />
    );

    return (
      <div>
        <header>
          <h1>Hole {this.state.hole}</h1>
        </header>
        {holeForm}
      </div>
    );
  }
}

export default RoundForm;
