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
      courseIDs: null,
      month: null,
      day: null,
      year: null,
      weather: null,
      wind: null
    };

    this.nextHoleUpdate = this.nextHoleUpdate.bind(this);
    this.previousHoleUpdate = this.previousHoleUpdate.bind(this);
    this.submitRound = this.submitRound.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.updateMonth = this.updateMonth.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.handleWeatherChange = this.handleWeatherChange.bind(this);
    this.handleWindChange = this.handleWindChange.bind(this);

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
    dataCopy.timestamp = new Date(this.state.year, this.state.month, this.state.day, 0, 0, 0, 0);
    dataCopy.weather = this.state.weather;
    dataCopy.wind = this.state.wind;

    this.setState({ data: dataCopy });

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

  updateMonth(val) {
    if (val.target.value === null) {
      this.setState({ month: null });
    }
    else {
      this.setState({ month: val.target.value });
    }
  }

  updateDay(val) {
    if (val.target.value === null) {
      this.setState({ day: null });
    }
    else {
      this.setState({ day: val.target.value });
    }
  }

  updateYear(val) {
    if (val.target.value === null) {
      this.setState({ year: null });
    }
    else {
      this.setState({ year: val.target.value });
    }
  }

  handleWeatherChange(e) {
    this.setState({ weather: e });
  }

  handleWindChange(e) {
    this.setState({ wind: e });
  }

  validation() {
    if (this.state.courseName === null || this.state.day === null || this.state.month === null || this.state.year === null) {
      return false;
    }
    return true;
  }

  render() {

    const year = new Date().getFullYear();

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
          <ControlLabel>What day did you play?</ControlLabel>
          <br />
          <text>Month</text>
          <FormControl
            componentClass="select"
            placeholder="..."
            value={this.state.month}
            onChange={(val) => this.updateMonth(val)}
          >
            <option value={null}>--</option>
            <option value={"01"}>Jan (1)</option>
            <option value={"02"}>Feb (2)</option>
            <option value={"03"}>Mar (3)</option>
            <option value={"04"}>Apr (4)</option>
            <option value={"05"}>May (5)</option>
            <option value={"06"}>Jun (6)</option>
            <option value={"07"}>Jul (7)</option>
            <option value={"08"}>Aug (8)</option>
            <option value={"09"}>Sep (9)</option>
            <option value={"10"}>Oct (10)</option>
            <option value={"11"}>Nov (11)</option>
            <option value={"12"}>Dec (12)</option>
          </FormControl>
          <text>Day</text>
          <FormControl
            componentClass="select"
            placeholder="..."
            value={this.state.day}
            onChange={(val) => this.updateDay(val)}
          >
            <option value={null}>--</option>
            <option value={"01"}>1</option>
            <option value={"02"}>2</option>
            <option value={"03"}>3</option>
            <option value={"04"}>4</option>
            <option value={"05"}>5</option>
            <option value={"06"}>6</option>
            <option value={"07"}>7</option>
            <option value={"08"}>8</option>
            <option value={"09"}>9</option>
            <option value={"10"}>10</option>
            <option value={"11"}>11</option>
            <option value={"12"}>12</option>
            <option value={"13"}>13</option>
            <option value={"14"}>14</option>
            <option value={"15"}>15</option>
            <option value={"16"}>16</option>
            <option value={"17"}>17</option>
            <option value={"18"}>18</option>
            <option value={"19"}>19</option>
            <option value={"20"}>20</option>
            <option value={"21"}>21</option>
            <option value={"22"}>22</option>
            <option value={"23"}>23</option>
            <option value={"24"}>24</option>
            <option value={"25"}>25</option>
            <option value={"26"}>26</option>
            <option value={"27"}>27</option>
            <option value={"28"}>28</option>
            <option value={"29"}>29</option>
            <option value={"30"}>30</option>
            <option value={"31"}>31</option>
          </FormControl>
          <text>Year</text>
          <FormControl
            componentClass="select"
            placeholder="..."
            value={this.state.year}
            onChange={(val) => this.updateYear(val)}
          >
            <option value={null}>--</option>
            <option value={year - 5}>{year - 5}</option>
            <option value={year - 4}>{year - 4}</option>
            <option value={year - 3}>{year - 3}</option>
            <option value={year - 2}>{year - 2}</option>
            <option value={year - 1}>{year - 1}</option>
            <option value={year}>{year}</option>
          </FormControl>
          <div style={{ 'marginTop': 30}}>
            <div>
              <ControlLabel>What was the weather?</ControlLabel>
            </div>
            <ToggleButtonGroup name="weather-buttons" type="radio" value={this.state.weather} onChange={this.handleWeatherChange}>
              <ToggleButton value={"Sunny"}>Sunny</ToggleButton>
              <ToggleButton value={"Overcast"}>Overcast</ToggleButton>
              <ToggleButton value={"Rainy"}>Rainy</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{ 'marginTop': 30}}>
            <div>
              <ControlLabel>How windy was it?</ControlLabel>
            </div>
            <ToggleButtonGroup name="wind-buttons" type="radio" value={this.state.wind} onChange={this.handleWindChange}>
              <ToggleButton value={"Not windy"}>Not windy (0-5 mph)</ToggleButton>
              <ToggleButton value={"Somewhat windy"}>Somewhat windy (5-20 mph)</ToggleButton>
              <ToggleButton value={"Windy"}>Wind (20-30 mph)</ToggleButton>
              <ToggleButton value={"Gale force"}>Gale force (30+ mph)</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Jumbotron>
        <Button
          disabled={!this.validation()}
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
