import React, { Component } from 'react';
import { Table, Grid, Col, Row, Button, ControlLabel, FormControl } from 'react-bootstrap';
import StatsTable from '../Components/StatsTable';
import CourseForm from '../Components/CourseForm';
import fetchHelper from '../serverHelpers/FetchHelper';
import CoachLog from '../Components/CoachLog';

class CoachViewContainer extends Component {

  // PROPS:
  // coachID -- the UID of the coach to display the view for
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'main',
      announcement: null,
      width: 0,
      height: 0
    }

    this.addCourse = this.addCourse.bind(this);
    this.resetView = this.resetView.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

  addCourse() {
    this.setState({ viewMode: 'new-course' });
  }

  addAnnouncement() {
    this.setState({ viewMode: 'announcement' });
  }

  resetView() {
    alert('Uploaded course successfully');
    this.setState({ viewMode: 'main' });
  }

  updateAnnouncement(val) {
    if (val.target.value === '') {
      this.setState({ announcement : null })
    }
    else {
      this.setState({ announcement : val.target.value })
    }
  }

  submitAnnouncement() {
    const date = new Date();
    fetchHelper(`${this.props.coachID}/announcement`, 'PUT', { body: this.state.announcement, timestamp: date }).then((added) => {
      console.log('Uploaded new announcement');
    }).catch(err => console.log(err)); // eslint-disable-line no-console
    this.setState({ viewMode: 'main' });
  }

  render() {

    const buttons = (
      <div>
        <Button
          value='add-course'
          onClick={() => this.addCourse()}
        >Add Course</Button>
        <Button
          value='new-announcement'
          onClick={() => this.addAnnouncement()}
        >New Announcement</Button>
      </div>
    );

    switch (this.state.viewMode) {
      case 'main':
        return (
          <div>
            <StatsTable whoAmI='coach' coachID={this.props.coachID}/>
            {buttons}
            <CoachLog coachID={this.props.coachID} />
          </div>
        );

      case 'new-course':
        return (
          <div>
            <CourseForm successCallback={this.resetView}/>
          </div>
        );

      case 'announcement':
        return (
          <div>
            <ControlLabel>Enter new team announcement here:</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="New announcement"
              value={this.state.announcement}
              onChange={(val) => this.updateAnnouncement(val)}
              style={{ width: 800, height: 200, marginLeft: (this.state.width / 2) - 400 }}
            />
            <Button
              value='submit-announcement'
              onClick={() => this.submitAnnouncement()}
              disabled={(this.state.announcement === null)}
            >Send Announcement</Button>
          </div>
        );

      case 'uploaded-course':
        return (
          <div>
            <header>
              <h1>Uploaded course successfully</h1>
            </header>
          </div>
        );
    }
  }

}

export default CoachViewContainer;
