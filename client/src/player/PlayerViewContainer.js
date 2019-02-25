import React, { Component } from 'react';
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';
import RoundForm from '../Components/RoundForm';
import StatsTable from '../Components/StatsTable';
import AnnouncementsTable from '../Components/AnnouncementsTable';
import PlayerJournal from '../player/PlayerJournal';

class PlayerViewContainer extends Component {

  // PROPS:
  // playerID -- the UID of the player to display
  // inputNewRoundCallback -- callback to change the view of the ViewContainer and send back player data
  // teamName -- team name of the player currently displayed
  constructor(props) {
    super(props)

    this.state = {
      viewMode: 'round-stats',
      activeView: 1
    }
  }

  inputNewRound() {
    this.props.inputNewRoundCallback('input-new-round', this.props.playerID, this.props.teamName);
  }

  submittedRoundCallback() {
    alert('New round successfully inputed');
    this.setState({ viewMode: 'round-stats', activeView: 1 });
  }

  render() {

    const headerBar = (
      <div>
        <Navbar>
          <Navbar.Brand>CollegeGolfStats</Navbar.Brand>
            <Nav activeKey={ this.state.activeView }>
              <NavItem eventKey={1} onClick={() => {this.setState({ viewMode: 'round-stats', activeView: 1 })}}>
                Round by Round Stats
              </NavItem>
              <NavItem eventKey={2} onClick={() => {this.setState({ viewMode: 'overall-stats', activeView: 2 })}}>
                Overall Stats
              </NavItem>
              <NavItem eventKey={3} onClick={() => {this.setState({ viewMode: 'announcements', activeView: 3 })}}>
                Team Announcements
              </NavItem>
              <NavItem eventKey={4} onClick={() => {this.setState({ viewMode: 'new-round', activeView: 4 })}}>
                Input New Round
              </NavItem>
              <NavItem eventKey={5} onClick={() => {this.setState({ viewMode: 'journal', activeView: 5 })}}>
                Journal
              </NavItem>
            </Nav>
            <Button style={{ position: 'absolute', marginTop: 7, marginRight: 5}} onClick={this.props.logoutCallback}>Logout</Button>
        </Navbar>
      </div>
    );

    const buttons = (
      <div>
        <Button
          value='input-round'
          onClick={() => this.inputNewRound()}
        >Input New Round</Button>
      </div>
    );

    switch (this.state.viewMode) {
      case 'round-stats':
        return (
          <div>
            {headerBar}
            <StatsTable whoAmI='player1' playerID={this.props.playerID} />
          </div>
        )

      case 'overall-stats':
        return (
          <div>
            {headerBar}
            <StatsTable whoAmI='player2' playerID={this.props.playerID} />
          </div>
        )

      case 'announcements':
        return (
          <div>
            {headerBar}
            <h1>Announcements:</h1>
            <AnnouncementsTable playerID={this.props.playerID} />
          </div>
        );

      case 'new-round':
        return (
          <div>
            {headerBar}
            <RoundForm submittedRoundCallback={this.submittedRoundCallback} playerID={this.props.playerID} teamName={this.props.teamName}/>
          </div>
        );

      case 'journal':
        return (
          <div>
            {headerBar}
            <PlayerJournal coach={false} playerID={this.props.playerID} />
          </div>
        );
    }

    return (
      <div>
        <StatsTable whoAmI='player' playerID={this.props.playerID} />
        {buttons}
        <AnnouncementsTable playerID={this.props.playerID} />
      </div>
    );
  }
}

export default PlayerViewContainer;
