import React, { Component } from 'react';
import HoleForm from '../Components/HoleForm';
import CalculateStatistics from '../statistics/CalculateStatistics';
import fetchHelper from '../serverHelpers/FetchHelper';

class RoundForm extends Component {

  // PROPS:
  // updateViewCallback -- tells the ViewContainer what to display
  // playerID -- player id for whoever is inputing the round
  // teamName -- team name of the team that the player is on
  // submittedRoundCallback -- tells the ViewContainer that a round has been submitted
  constructor(props) {
    super(props);

    this.state = {
      hole: 17,
      data: require('../classes/BlankRound.json')
    };

    console.log(this.state.data);

    this.nextHoleUpdate = this.nextHoleUpdate.bind(this);
    this.previousHoleUpdate = this.previousHoleUpdate.bind(this);
    this.submitRound = this.submitRound.bind(this);

  }

  nextHoleUpdate(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    currentHoleDataCopy.teeShot = holeData.teeShot;
    currentHoleDataCopy.approachShot = holeData.approachShot;
    currentHoleDataCopy.upAndDown = holeData.upAndDown;
    currentHoleDataCopy.shortsided = holeData.shortsided;
    currentHoleDataCopy.putts = holeData.putts;
    currentHoleDataCopy.puttsLength = holeData.puttsLength;
    currentHoleDataCopy.score = holeData.score;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    this.setState({ data: dataCopy, hole: this.state.hole + 1 });
  }

  previousHoleUpdate(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    currentHoleDataCopy.teeShot = holeData.teeShot;
    currentHoleDataCopy.approachShot = holeData.approachShot;
    currentHoleDataCopy.upAndDown = holeData.upAndDown;
    currentHoleDataCopy.shortsided = holeData.shortsided;
    currentHoleDataCopy.putts = holeData.putts;
    currentHoleDataCopy.puttsLength = holeData.puttsLength;
    currentHoleDataCopy.score = holeData.score;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    this.setState({ data: dataCopy, hole: this.state.hole - 1 });
  }

  submitRound(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    currentHoleDataCopy.teeShot = holeData.teeShot;
    currentHoleDataCopy.approachShot = holeData.approachShot;
    currentHoleDataCopy.upAndDown = holeData.upAndDown;
    currentHoleDataCopy.shortsided = holeData.shortsided;
    currentHoleDataCopy.putts = holeData.putts;
    currentHoleDataCopy.puttsLength = holeData.puttsLength;
    currentHoleDataCopy.score = holeData.score;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    dataCopy.playerID = this.props.playerID;
    dataCopy.teamName = this.props.teamName;
    dataCopy.timestamp = new Date();

    // TODO: @here update dataCopy with the course ID

    this.setState({ data: dataCopy });

    console.log("round submited")

    const statsCalc = new CalculateStatistics(this.state.data);
    const roundStats = statsCalc.calculate();

    fetchHelper(`${roundStats.playerID}/newRound`, 'PUT', roundStats).then((added) => {
      console.log('Uploaded new round');
    }).catch(err => console.log(err)); // eslint-disable-line no-console

    this.props.submittedRoundCallback();

  }

  render() {

    let holeForm = (
      <HoleForm
        sendDataCallbackNext={this.nextHoleUpdate}
        sendDataCallbackPrevious={this.previousHoleUpdate}
        submitRoundCallback={this.submitRound}
        hole={this.state.hole}
        score={this.state.data.data[this.state.hole - 1].score}
        teeShot={this.state.data.data[this.state.hole - 1].teeShot}
        approachShot={this.state.data.data[this.state.hole - 1].approachShot}
        upAndDown={this.state.data.data[this.state.hole - 1].upAndDown}
        shortsided={this.state.data.data[this.state.hole - 1].shortsided}
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
