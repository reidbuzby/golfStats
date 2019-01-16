import React, { Component } from 'react';
import { Table, Grid, Col, Row, Button } from 'react-bootstrap';
import StatsTable from '../Components/StatsTable';
import CourseForm from '../Components/CourseForm';

class CoachViewContainer extends Component {

  // PROPS:
  // coachID -- the UID of the coach to display the view for
  constructor(props) {
    super(props);

    this.state = {
      viewMode : 'main'
    }

    this.addCourse = this.addCourse.bind(this);
  }

  addCourse() {
    this.setState({ viewMode: 'new-course' });
  }


  // TODO: Placeholder until I can think of another functionality to put here instead
  doSomethingElse() {
    console.log('doSomethingElse')
  }

  render() {

    const buttons = (
      <div>
        <Button
          value='add-course'
          onClick={() => this.addCourse()}
        >Add Course</Button>
        <Button
          value='do-something-else'
          onClick={() => this.doSomethingElse()}
        >Do Something Else</Button>
      </div>
    );

    switch (this.state.viewMode) {
      case 'main':
        return (
          <div>
            <Grid>
              <Row>
                <Col md={8}>
                  <StatsTable whoAmI='coach' coachID={this.props.coachID}/>
                </Col>
                <Col md={4}>
                  {buttons}
                </Col>
              </Row>
            </Grid>
          </div>
        );
      case 'new-course':
        return (
          <div>
            <CourseForm />
          </div>
        );
    }
  }

}

export default CoachViewContainer;
