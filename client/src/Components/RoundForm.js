import React, { Component } from 'react';
import HoleForm from '../Components/HoleForm';
import CalculateStatistics from '../statistics/CalculateStatistics';
import fetchHelper from '../serverHelpers/FetchHelper';
import { FormGroup, FormControl, ControlLabel, Button, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton, Jumbotron } from 'react-bootstrap';


class RoundForm extends Component {

  // PROPS:
  // updateViewCallback -- tells the ViewContainer what to display
  // playerID -- player id for whoever is inputing the round
  // teamName -- team name of the team that the player is on
  // submittedRoundCallback -- tells the ViewContainer that a round has been submitted
  constructor(props) {
    super(props);

    this.state = {
      hole: 1,
      data: require('../classes/BlankRound.json'),
      courseName: null,
      course: null,
      courseList: null,
      courseIDs: null
    };

    this.nextHoleUpdate = this.nextHoleUpdate.bind(this);
    this.previousHoleUpdate = this.previousHoleUpdate.bind(this);
    this.submitRound = this.submitRound.bind(this);
    this.getCourse = this.getCourse.bind(this);

    this.getCourses()
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
    currentHoleDataCopy.par = holeData.par;

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
    currentHoleDataCopy.par = holeData.par;

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
    currentHoleDataCopy.par = holeData.par;

    const dataCopy = this.state.data;
    dataCopy.data[this.state.hole - 1] = currentHoleDataCopy;

    dataCopy.course = this.state.course.courseName;
    dataCopy.playerID = this.props.playerID;
    dataCopy.teamName = this.props.teamName;
    dataCopy.timestamp = new Date();

    this.setState({ data: dataCopy });

    console.log("round submited")

    const statsCalc = new CalculateStatistics(this.state.data);
    const roundStats = statsCalc.calculate();

    fetchHelper(`${roundStats.playerID}/newRound`, 'PUT', roundStats).then((added) => {
      console.log('Uploaded new round');
    }).catch(err => console.log(err)); // eslint-disable-line no-console

    this.props.submittedRoundCallback();

  }

  getCourses() {
    fetchHelper('/courses', 'GET').then((response) => {
      const courses = response;
      const coursesList = [];
      const courseIDs = [];
      for(let i=0;i<courses.length;i++) {
        coursesList.push(
          <option value={courses[i].courseName}>{courses[i].courseName}   ({courses[i].courseCity}, {courses[i].courseState})</option>
        );
        courseIDs.push([courses[i]._id, courses[i].courseName]);
      }
      this.setState({ courseList: coursesList, courseIDs: courseIDs });
    }).catch(err => console.log(err)); // eslint-disable-line no-console
  }

  getCourse() {
    for (let i=0;i<this.state.courseList.length;i++) {
      if (this.state.courseName === this.state.courseIDs[i][1]) {
        fetchHelper(`/courses/${this.state.courseIDs[i][0]}`, 'GET').then((response) => {
          console.log('course', response);
          this.setState({ course: response });
        }).catch(err => console.log(err)); // eslint-disable-line no-console

      }
    }
  }

  updateCourse(val) {
    if (val.target.value === null) {
      this.setState({ courseName: null });
    }
    else {
      this.setState({ courseName: val.target.value });
    }
  }

  render() {

    const setupForm = (
      <div>
        <Jumbotron>
          <ControlLabel>What course did you play?</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="..."
            value={this.state.courseName}
            onChange={(val) => this.updateCourse(val)}
          >
            <option value={null}>--</option>
            {this.state.courseList}
          </FormControl>
        </Jumbotron>
        <Button
          disabled={this.state.courseName === null}
          onClick={this.getCourse}
        >Next</Button>
      </div>
    );

    if (this.state.course === null) {
      return setupForm;
    }

    return (
      <div>
        <header>
          <h1>{this.state.course.courseName}</h1>
          <h2>Hole {this.state.hole} | Par {this.state.course.data[this.state.hole - 1].par}| {this.state.course.data[this.state.hole - 1].yardage} Yards</h2>
        </header>
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
          par={this.state.course.data[this.state.hole - 1].par}
        />
      </div>
    );
  }
}

export default RoundForm;
