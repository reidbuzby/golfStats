import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock, ToggleButtonGroup, ToggleButton, Jumbotron } from 'react-bootstrap';

class CourseHoleForm extends Component {

  // PROPS:
  // hole, par, yardage -- all passed in as props to store previously saved data
  // sendDataCallbackNext -- sends hole data back when hitting next
  // sendDataCallbackPrevious -- sends hole data back when hitting previous
  // submitCourseCallback -- sends hole data back when hitting submit
  constructor(props) {
    super(props);

    this.state = {
      hole: this.props.hole,
      par: this.props.par,
      yardage: this.props.yardage,
      width: 0,
      height: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleParChange = this.handleParChange.bind(this);
    this.handleYardageChange = this.handleYardageChange.bind(this);

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillReceiveProps(props) {
    this.setState({
      hole: props.hole,
      par: props.par,
      yardage: props.yardage
    });
  }

  validation() {
    if (isNaN(this.state.yardage) || this.state.par === null || this.state.yardage === null) {
      return false;
    }
    return true;
  }

  nextHole() {
    const holeData = {};

    holeData.par = this.state.par;
    holeData.yardage = this.state.yardage;

    this.props.sendDataCallbackNext(holeData);
  }

  previousHole() {
    const holeData = {};

    holeData.par = this.state.par;
    holeData.yardage = this.state.yardage;

    this.props.sendDataCallbackPrevious(holeData);
  }

  submitCourse() {
    const holeData = {};

    holeData.par = this.state.par;
    holeData.yardage = this.state.yardage;

    this.props.submitCourseCallback(holeData);
  }

  handleParChange(e) {
    this.setState({ par: e });
  }

  handleYardageChange(val) {
    if (val.target.value === '') {
      this.setState({ yardage : null })
    }
    else {
      this.setState({ yardage : val.target.value })
    }
  }

  render() {

    const parButtons = (
      <div style={{ 'marginBottom': 30}}>
        <div>
          <ControlLabel>Choose the par for this hole</ControlLabel>
        </div>
        <ToggleButtonGroup name="par-buttons" type="radio" value={this.state.par} onChange={this.handleParChange}>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );

    const yardageInput = (
      <div>
        <ControlLabel>Enter the hole's yardage</ControlLabel>
        <FormControl
          type="text"
          value={this.state.yardage}
          placeholder="Enter yardage"
          onChange={(val) => this.handleYardageChange(val)}
          style={{ width: 250, marginLeft: this.state.width/2 - 125 }}
        />
      </div>
    );

    const nextButton = (
      <Button value="next" disabled={(this.state.hole === 18) || !(this.validation())} onClick={() => this.nextHole()} >
        Next hole
      </Button>
    );

    const submitButton = (
      <Button value="submit" disabled={!(this.validation())} onClick={() => this.submitCourse()} >
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
          {parButtons}
          {yardageInput}
        </Jumbotron>
        {navigationButtons}
      </div>
    );

  }
}

export default CourseHoleForm;
