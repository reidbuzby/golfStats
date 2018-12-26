import React, { Component } from 'react';
import { Table, Grid, Col, Row, Button } from 'react-bootstrap';
import StatsTable from '../Components/StatsTable';

class CoachViewContainer extends Component {

  // PROPS:
  // coachName -- the UID or name of the coach to display the view for
  constructor(props) {
    super(props);

    this.state = {
      viewMode : 'main'
    }
  }

  // TODO: this button should pull up the functionality for the coach to create a new course
  // that will get added to the course database
  addCourse() {
    console.log('add course')
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
                  <StatsTable whoAmI='coach' coachName={this.props.coachName}/>
                </Col>
                <Col md={4}>
                  {buttons}
                </Col>
              </Row>
            </Grid>
          </div>
        );
    }
  }

}

export default CoachViewContainer;
