import React, { Component } from 'react';
//import { Dimensions } from 'react-native';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock, ToggleButtonGroup, ToggleButton, Jumbotron } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class HoleForm extends Component {

  // PROPS:
  // sendDataCallbackNext() -- callback function when hitting next hole, sends hole data back to container
  // sendDataCallbackPrevious() -- callback function when hitting previous hole, sends hole data back to container
  // the entire state is passed as props to ensure previously saved round data can be accessed
  constructor(props) {
    super(props);

    this.state = {
      hole: this.props.hole,
      score: this.props.score,
      teeShot: this.props.teeShot,
      approachShot: this.props.approachShot,
      upAndDown: this.props.upAndDown,
      shortsided: this.props.shortsided,
      putts: this.props.putts,
      putt1: this.props.putt1,
      putt2: this.props.putt2,
      putt3: this.props.putt3,
      putt4: this.props.putt4,
      putt5: this.props.putt5
    };

    this.handleTeeShotChange = this.handleTeeShotChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleApproachShotChange = this.handleApproachShotChange.bind(this);
    this.handleUpAndDownChange = this.handleUpAndDownChange.bind(this);
    this.handlePuttChange = this.handlePuttChange.bind(this);
    this.handlePutt1 = this.handlePutt1.bind(this);
    this.handlePutt2 = this.handlePutt2.bind(this);
    this.handlePutt3 = this.handlePutt3.bind(this);
    this.handlePutt4 = this.handlePutt4.bind(this);
    this.handlePutt5 = this.handlePutt5.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      hole: props.hole,
      score: props.score,
      teeShot: props.teeShot,
      approachShot: props.approachShot,
      upAndDown: props.upAndDown,
      putts: props.putts,
      putt1: props.putt1,
      putt2: props.putt2,
      putt3: props.putt3,
      putt4: props.putt4,
      putt5: props.putt5
    });
  }

  handleScoreChange(e) {
    this.setState({ score: e.target.value });
  }

  handleTeeShotChange(e) {
    this.setState({ teeShot: e });
  }

  handleApproachShotChange(e) {
    this.setState({ approachShot: e });
  }

  handleUpAndDownChange(e) {
    this.setState({ upAndDown: e });
  }

  handlePuttChange(e) {
    this.setState({ putts: e });
  }

  handlePutt1(e) {
    this.setState({ putt1: e })
  }

  handlePutt2(e) {
    this.setState({ putt2: e })
  }

  handlePutt3(e) {
    this.setState({ putt3: e })
  }

  handlePutt4(e) {
    this.setState({ putt4: e })
  }

  handlePutt5(e) {
    this.setState({ putt5: e })
  }

  handleShortsidedChange(e) {
    this.setState({ shortsided: e });
  }

  getSliderMarks() {
    const json = require('../classes/StrokesGained.json');
    var puttLengths = []
    for (var key in json.pro) {
      puttLengths.push(key)
    };

    var marks = {}
    for (let i=0;i<puttLengths.length;i++) {
      marks[parseInt(puttLengths[i])] = `${puttLengths[i]}`
    }
    return marks;
  }

  getSliders(putt1Length, putt2Length, putt3Length, putt4Length, putt5Length) {
    if (this.state.putts === null) {
      return null;
    }
    else {
      switch (this.state.putts) {
        case 1:
          return (
            <div>
              {putt1Length}
            </div>
          );
          case 2:
            return (
              <div>
                {putt1Length}
                {putt2Length}
              </div>
            );
          case 3:
            return (
              <div>
                {putt1Length}
                {putt2Length}
                {putt3Length}
              </div>
            );
          case 4:
            return (
              <div>
                {putt1Length}
                {putt2Length}
                {putt3Length}
                {putt4Length}
              </div>
            );
          case 5:
            return (
              <div>
                {putt1Length}
                {putt2Length}
                {putt3Length}
                {putt4Length}
                {putt5Length}
              </div>
            );
      }
    }
  }

  nextHole() {
    const holeData = {};

    holeData.teeShot = this.state.teeShot;
    holeData.approachShot = this.state.approachShot;
    holeData.upAndDown = this.state.upAndDown;
    holeData.shortsided = this.state.shortsided;
    holeData.putts = this.state.putts;
    holeData.score = this.state.score;

    switch (this.state.putts) {
      case 1:
        holeData.puttsLength = [(this.state.putt1 === null) ? 1 : this.state.putt1, null, null, null, null];
        break;
      case 2:
        holeData.puttsLength = [this.state.putt1, (this.state.putt2 === null) ? 1 : this.state.putt2, null, null, null]
        break;
      case 3:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, (this.state.putt3 === null) ? 1 : this.state.putt3, null, null];
        break;
      case 4:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, this.state.putt3, (this.state.putt4 === null) ? 1 : this.state.putt4, null]
        break;
      case 5:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, this.state.putt3, this.state.putt4, (this.state.putt5 === null) ? 1 : this.state.putt5]
        break;
      default:
        holeData.puttsLength = [null, null, null, null, null];
        break;
    }

    this.props.sendDataCallbackNext(holeData);
  }

  previousHole() {
    const holeData = {};

    holeData.teeShot = this.state.teeShot;
    holeData.approachShot = this.state.approachShot;
    holeData.upAndDown = this.state.upAndDown;
    holeData.shortsided = this.state.shortsided;
    holeData.putts = this.state.putts;
    holeData.score = this.state.score;

    switch (this.state.putts) {
      case 1:
        holeData.puttsLength = [(this.state.putt1 === null) ? 1 : this.state.putt1, null, null, null, null];
        break;
      case 2:
        holeData.puttsLength = [this.state.putt1, (this.state.putt2 === null) ? 1 : this.state.putt2, null, null, null]
        break;
      case 3:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, (this.state.putt3 === null) ? 1 : this.state.putt3, null, null];
        break;
      case 4:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, this.state.putt3, (this.state.putt4 === null) ? 1 : this.state.putt4, null]
        break;
      case 5:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, this.state.putt3, this.state.putt4, (this.state.putt5 === null) ? 1 : this.state.putt5]
        break;
      default:
        holeData.puttsLength = [null, null, null, null, null];
        break;
    }

    this.props.sendDataCallbackPrevious(holeData);
  }

  submitRound() {
    const holeData = {};

    holeData.teeShot = this.state.teeShot;
    holeData.approachShot = this.state.approachShot;
    holeData.upAndDown = this.state.upAndDown;
    holeData.shortsided = this.state.shortsided;
    holeData.putts = this.state.putts;
    holeData.score = this.state.score;

    switch (this.state.putts) {
      case 1:
        holeData.puttsLength = [(this.state.putt1 === null) ? 1 : this.state.putt1, null, null, null, null];
        break;
      case 2:
        holeData.puttsLength = [this.state.putt1, (this.state.putt2 === null) ? 1 : this.state.putt2, null, null, null]
        break;
      case 3:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, (this.state.putt3 === null) ? 1 : this.state.putt3, null, null];
        break;
      case 4:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, this.state.putt3, (this.state.putt4 === null) ? 1 : this.state.putt4, null]
        break;
      case 5:
        holeData.puttsLength = [this.state.putt1, this.state.putt2, this.state.putt3, this.state.putt4, (this.state.putt5 === null) ? 1 : this.state.putt5]
        break;
      default:
        holeData.puttsLength = [null, null, null, null, null];
        break;
    }

    this.props.submitRoundCallback(holeData);
  }

  validation() {
    if (this.state.score === "") {
      return false;
    }
    if (this.state.teeShot === null) {
      return false;
    }
    if (this.state.approachShot === null) {
      return false;
    }
    if (this.state.approachShot !== 'green' && this.state.upAndDown === null) {
      return false;
    }
    if (this.state.approachShot !== 'green' && this.state.shortsided === null) {
      return false;
    }
    if (this.state.putts === null) {
      return false;
    }
    if (this.checkPutts()) {
      return false;
    }
    return true;
  }

  checkPutts() {
      if (this.state.putt1 === null && this.state.putt2 === null && this.state.putt3 === null && this.state.putt4 === null && this.state.putt5 === null) {
        if (this.state.putts === 1) {
          return false;
        }
        return true;
      }
      else {
        return false;
      }
  }


  render() {

    const scoreInput = (
      <div>
        <ControlLabel>What score did you make?</ControlLabel>
        <FormControl
          type="text"
          value={this.state.score}
          placeholder="Enter score"
          onChange={this.handleScoreChange}
          style={{ width: 100, marginLeft: 460 }}
        />
      </div>
    );

    const teeShotButtons = (
      <div style={{ 'marginBottom': 30}}>
        <div>
          <ControlLabel>Where did your tee shot go?</ControlLabel>
        </div>
        <ToggleButtonGroup name="tee-shot-buttons" type="radio" value={this.state.teeShot} onChange={this.handleTeeShotChange}>
          <ToggleButton value="fairway">Fairway</ToggleButton>
          <ToggleButton value="rough">Rough</ToggleButton>
          <ToggleButton value="trees">Trees</ToggleButton>
          <ToggleButton value="sand">Sand</ToggleButton>
          <ToggleButton value="hazard">Hazard</ToggleButton>
          <ToggleButton value="ob">O.B.</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );

    const approachButtons = (
      <div style={{ 'marginBottom': 30}}>
        <div>
          <ControlLabel>Where did your approach shot go?</ControlLabel>
        </div>
        <ToggleButtonGroup name="approach-shot-buttons" type="radio" value={this.state.approachShot} onChange={this.handleApproachShotChange}>
          <ToggleButton value="green">Green</ToggleButton>
          <ToggleButton value="fairway">Fairway</ToggleButton>
          <ToggleButton value="rough">Rough</ToggleButton>
          <ToggleButton value="trees">Trees</ToggleButton>
          <ToggleButton value="sand">Sand</ToggleButton>
          <ToggleButton value="hazard">Hazard</ToggleButton>
          <ToggleButton value="ob">O.B.</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );

    const upAndDownButtons = (
      <div style={{ 'marginBottom': 30}}>
        <div>
          <ControlLabel>Did you get up and down?</ControlLabel>
        </div>
        <ToggleButtonGroup name="upanddown-buttons" type="radio" value={this.state.upAndDown} onChange={this.handleUpAndDownChange}>
          <ToggleButton value="yes">Yes</ToggleButton>
          <ToggleButton value="no">No</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );

    const shortSidedButtons = (
      <div style={{ 'marginBottom': 30}}>
        <div>
          <ControlLabel>Were you shortsided?</ControlLabel>
        </div>
        <ToggleButtonGroup name="shortsided-buttons" type="radio" value={this.state.shortsided} onChange={this.handleShortsidedChange}>
          <ToggleButton value="yes">Yes</ToggleButton>
          <ToggleButton value="no">No</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );

    const puttButtons = (
      <div style={{ 'marginBottom': 30}}>
        <div>
          <ControlLabel>How many putts did you hit?</ControlLabel>
        </div>
        <ToggleButtonGroup name="putt-buttons" type="radio" value={this.state.putts} onChange={this.handlePuttChange}>
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );

    //const width = Dimensions.get('window').width;
    // TODO: get width and set slider margins based on width (replace 1000 below w/ width)
    const putt1Length = (
      <div style={{ marginTop: 30 }}>
        <div>
          <ControlLabel>How far was your first putt? (feet)</ControlLabel>
        </div>
        <div style={{ width: 600, marginLeft: (1000 - 600)/2 }}>
          <Slider min={1} max={60} marks={this.getSliderMarks()} step={null} value={(this.state.putt1 === null) ? 1 : this.state.putt1} onChange={this.handlePutt1} defaultValue={1} />
        </div>
      </div>
    );

    const putt2Length = (
      <div style={{ marginTop: 30 }}>
        <div>
          <ControlLabel>How far was your second putt? (feet)</ControlLabel>
        </div>
        <div style={{ width: 600, marginLeft: (1000 - 600)/2 }}>
          <Slider min={1} max={60} marks={this.getSliderMarks()} step={null} value={(this.state.putt2 === null) ? 1 : this.state.putt2} onChange={this.handlePutt2} defaultValue={1} />
        </div>
      </div>
    );

    const putt3Length = (
      <div style={{ marginTop: 30 }}>
        <div>
          <ControlLabel>How far was your third putt? (feet)</ControlLabel>
        </div>
        <div style={{ width: 600, marginLeft: (1000 - 600)/2 }}>
          <Slider min={1} max={60} marks={this.getSliderMarks()} step={null} value={(this.state.putt3 === null) ? 1 : this.state.putt3} onChange={this.handlePutt3} defaultValue={1} />
        </div>
      </div>
    );

    const putt4Length = (
      <div style={{ marginTop: 30 }}>
        <div>
          <ControlLabel>How far was your fourth putt? (feet)</ControlLabel>
        </div>
        <div style={{ width: 600, marginLeft: (1000 - 600)/2 }}>
          <Slider min={1} max={60} marks={this.getSliderMarks()} step={null} value={(this.state.putt4 === null) ? 1 : this.state.putt4} onChange={this.handlePutt4} defaultValue={1} />
        </div>
      </div>
    );

    const putt5Length = (
      <div style={{ marginTop: 30 }}>
        <div>
          <ControlLabel>How far was your fifth putt? (Seriously?)</ControlLabel>
        </div>
        <div style={{ width: 600, marginLeft: (1000 - 600)/2 }}>
          <Slider min={1} max={60} marks={this.getSliderMarks()} step={null} value={(this.state.putt5 === null) ? 1 : this.state.putt5} onChange={this.handlePutt5} defaultValue={1} />
        </div>
      </div>
    );

    const nextButton = (
      <Button value="next" disabled={(this.state.hole === 18) || !(this.validation())} onClick={() => this.nextHole()} >
        Next hole
      </Button>
    );

    const submitButton = (
      <Button value="submit" disabled={!(this.validation())} onClick={() => this.submitRound()} >
        Submit
      </Button>
    );

    const navigationButtons = (
      <div>
        <Button value="previous" disabled={(this.state.hole === 1)} onClick={() => this.previousHole()}>
          Previous hole
        </Button>
        {(this.state.hole === 18) ? submitButton : nextButton}
      </div>
    );

    return (
      <div>
        <Jumbotron>
          {scoreInput}
          {teeShotButtons}
          {approachButtons}
          {(this.state.approachShot === "green" || this.state.approachShot === null) ? null : upAndDownButtons}
          {(this.state.approachShot === "green" || this.state.approachShot === null) ? null : shortSidedButtons}
          {puttButtons}
          {this.getSliders(putt1Length, putt2Length, putt3Length, putt4Length, putt5Length)}
        </Jumbotron>
        {navigationButtons}
      </div>
    );
  }
}

export default HoleForm;
