import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, HelpBlock, ToggleButtonGroup, ToggleButton, Jumbotron } from 'react-bootstrap';
import CourseHoleForm from '../Components/CourseHoleForm';
import fetchHelper from '../serverHelpers/FetchHelper';

class CourseForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hole: null,
      data: require('../classes/BlankCourse.json'),
      courseName: null,
      courseCity: null,
      courseState: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.enterCourseData = this.enterCourseData.bind(this);
    this.nextHoleUpdate = this.nextHoleUpdate.bind(this);
    this.previousHoleUpdate = this.previousHoleUpdate.bind(this);
    this.submitCourse = this.submitCourse.bind(this);
  }

  handleNameChange(val) {
    if (val.target.value === '') {
      this.setState({ courseName : null })
    }
    else {
      this.setState({ courseName : val.target.value })
    }
  }

  handleStateChange(val) {
    if (val.target.value === '') {
      this.setState({ courseState : null })
    }
    else {
      this.setState({ courseState : val.target.value })
    }
  }

  handleCityChange(val) {
    if (val.target.value === '') {
      this.setState({ courseCity : null })
    }
    else {
      this.setState({ courseCity : val.target.value })
    }
  }

  enterCourseData() {
    const dataCopy = this.state.data;

    dataCopy.courseName = this.state.courseName;
    dataCopy.courseCity = this.state.courseCity;
    dataCopy.courseState = this.state.courseState;

    this.setState({ hole: 1, data: dataCopy });
  }

  nextHoleUpdate(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    currentHoleDataCopy.par = holeData.par;
    currentHoleDataCopy.yardage = holeData.yardage;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    this.setState({ data: dataCopy, hole: this.state.hole + 1 });
  }

  previousHoleUpdate(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    currentHoleDataCopy.par = holeData.par;
    currentHoleDataCopy.yardage = holeData.yardage;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    this.setState({ data: dataCopy, hole: this.state.hole - 1 });
  }

  submitCourse(holeData) {
    const currentHoleDataCopy = this.state.data.data[this.state.hole - 1];

    currentHoleDataCopy.par = holeData.par;
    currentHoleDataCopy.yardage = holeData.yardage;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    fetchHelper('/courses', 'POST', this.state.data).then((added) => {
      this.props.successCallback();
    }).catch(err => console.log(err)); // eslint-disable-line no-console
  }


  render() {

    // TODO: change marginLeft to the width of the (screen / 2) - 50
    const preRoundForm = (
      <div>
        <Jumbotron>
          <ControlLabel>Enter course name:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.courseName}
            placeholder="Ralph Myre Golf Course"
            onChange={(val) => this.handleNameChange(val)}
            style={{ width: 300, marginLeft: 565 }}
          />
          <ControlLabel>What city is the course in:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.courseCity}
            placeholder="Middlebury"
            onChange={(val) => this.handleCityChange(val)}
            style={{ width: 300, marginLeft: 565 }}
          />
          <ControlLabel>What state is the course in:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.courseState}
            placeholder="Vermont"
            onChange={(val) => this.handleStateChange(val)}
            style={{ width: 300, marginLeft: 565 }}
          />
        </Jumbotron>
        <Button
          disabled={this.state.courseName === null || this.state.courseCity === null || this.state.courseState === null}
          onClick={this.enterCourseData}
        >Next</Button>
      </div>
    );

    if (this.state.hole === null) {
      return (
        <div>
          <header>
            <h1>Enter a new course</h1>
          </header>
          {preRoundForm}
        </div>
      );
    }

    return (
      <div>
        <header>
          <h1>Enter a new course</h1>
          <h2>{this.state.courseName} | Hole {this.state.hole}</h2>
        </header>
        <CourseHoleForm
          sendDataCallbackNext={this.nextHoleUpdate}
          sendDataCallbackPrevious={this.previousHoleUpdate}
          submitCourseCallback={this.submitCourse}
          hole={this.state.hole}
          par={this.state.data.data[this.state.hole - 1].par}
          yardage={this.state.data.data[this.state.hole - 1].yardage}
        />
      </div>
    );

  }
}

export default CourseForm;
