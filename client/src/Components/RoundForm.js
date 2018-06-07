import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock } from 'react-bootstrap';

class RoundForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hole: 1,
      fairways: "",
      greens: "",
      upAndDowns: "",
      showUpAndDowns: false,
      putts: '',
    };

    this.handleGreens = this.handleGreens.bind(this);
    this.handlePutts = this.handlePutts.bind(this);
  }

  handleFairways(value) {
    this.setState( { fairways: value.target.value });
  }

  handleUpAndDowns(value) {
    this.setState( { upAndDowns: value });
  }

  handleGreens(value) {
    const newGreensState = value.target.value;
    this.setState( { greens: newGreensState });
    if (newGreensState === "Missed") {
      this.setState({ showUpAndDowns: true });
    }
    else {
      this.setState({ showUpAndDowns: false });
    }
  }

  getValidationState() {
    if (Number.isInteger(this.state.putts) && (this.state.putts < 101 && this.state.putts > 0)) {
      return 'success';
    }
    else if (Number.isInteger(this.state.putss) && (this.state.putts > 100 || this.state.putss < 0)) {
      return 'warning';
    }
    else {
      return 'error';
    }
    return null;
  }

  handlePutts(e) {
    this.setState({ putts: e.target.value });
  }

  render() {

    const fairwayGreenOptions = ["Hit", "Missed"];

    const fairwayGreenOptionsMap = fairwayGreenOptions.map(opt => (
      <option value={opt}>{opt}</option>
    ));

    const upAndDownOptions = ["Yes", "No"];

    const upAndDownOptionsMap = upAndDownOptions.map(opt => (
      <option value={opt}>{opt}</option>
    ));

    const fairways = (
      <FormGroup controlId="fairways">
        <ControlLabel>Where did your tee shot go? </ControlLabel>
          <ButtonGroup>
            <Button
              bsStyle="success"
              value="fairway"
              onClick={(val) => this.handleFairways(val)}>
              Fairway
            </Button>
            <Button
              bsStyle="primary"
              value="rough"
              onClick={(val) => this.handleFairways(val)}>
              Rough
            </Button>
            <Button
              bsStyle="warning"
              value="trees"
              onClick={(val) => this.handleFairways(val)}>
              Trees
            </Button>
            <Button
              bsStyle="warning"
              value="sand"
              onClick={(val) => this.handleFairways(val)}>
              Sand
            </Button>
            <Button
              bsStyle="danger"
              value="hazard"
              onClick={(val) => this.handleFairways(val)}>
              Hazard
            </Button>
            <Button
              bsStyle="danger"
              value="O.B."
              onClick={(val) => this.handleFairways(val)}>
              O.B.
            </Button>
          </ButtonGroup>
      </FormGroup>);

    const greens = (
      <FormGroup controlId="greens">
        <ControlLabel>Did you hit the green? </ControlLabel>
        <FormControl
          componentClass="select"
          value={this.state.greens}
          onChange={(val) => this.handleGreens(val)}
        >
          <option value="" disabled hidden>Choose</option>
          {fairwayGreenOptionsMap}
        </FormControl>
      </FormGroup>);

    const upAndDowns = (
      <FormGroup controlId="upAndDowns">
        <ControlLabel>Did you get up and down? </ControlLabel>
        <FormControl
          componentClass="select"
          value={this.state.upAndDowns}
          onChange={(val) => this.handleUpAndDowns(val)}
        >
          <option value="" disabled hidden>Choose</option>
          {upAndDownOptionsMap}
        </FormControl>
      </FormGroup>);

    const puttBox = (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.putts}
            placeholder="Enter text"
            onChange={this.handlePutts}
          />
          <FormControl.Feedback />
          <HelpBlock>Input must be a number between 1 and 100</HelpBlock>
        </FormGroup>
      </form>);

    return (
      <div>
        <header>
          <h1>Hole {this.state.hole}</h1>
        </header>
        <form>
          {fairways}
          {greens}
          {this.state.showUpAndDowns ? upAndDowns : null}
          {puttBox}
        </form>
      </div>
    );
  }
}

export default RoundForm;
