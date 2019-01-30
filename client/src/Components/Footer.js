import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well } from 'react-bootstrap';
import Popup from "reactjs-popup";

class Footer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openAbout: false,
      openContact: false,
      width: 0,
      height: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.openAbout = this.openAbout.bind(this);
    this.closeAbout = this.closeAbout.bind(this);
    this.openContact = this.openContact.bind(this);
    this.closeContact = this.closeContact.bind(this);
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

  openAbout() {
    this.setState({ openAbout: true });
  }

  closeAbout() {
    this.setState({ openAbout: false });
  }

  openContact() {
    this.setState({ openContact: true });
  }

  closeContact() {
    this.setState({ openContact: false });
  }

  render() {

    const aboutPopup = (
      <Popup
          open={this.state.openAbout}
          closeOnDocumentClick
          onClose={this.closeAbout}
        >
          <div>
            <span>
              <div>
                <header>
                  <h1>About CollegeGolfStats</h1>
                </header>
                <Well>
                      CollegeGolfStats is a free platform for college golf
                      (or high school) teams to easily track their personal
                      and team statistics. Originally the platform was designed
                      for the Middlebury Men's Golf team, but the goal is for many
                      more programs to use the application as well. View the Contact
                      section of the website to connect with us!
                </Well>
              </div>
            </span>
          </div>
        </Popup>
    );

    const contactPopup = (
      <Popup
          open={this.state.openContact}
          closeOnDocumentClick
          onClose={this.closeContact}
        >
          <div>
          <span>
            <div>
              <header>
                <h1>Contact CollegeGolfStats</h1>
              </header>
              <Well>
                    CollegeGolfStats was developed by Middlebury Men's Golf team
                    member Reid Buzby. For further inquires or help you can contact
                    him at reidbuzby@gmail.com
              </Well>
            </div>
          </span>
          </div>
        </Popup>
    );

    return (
      <Navbar style={{ position: 'fixed', bottom: -20, width: this.state.width }}>
        <Nav>
          <NavItem onClick={() => this.openAbout()}>About</NavItem>
          <NavItem onClick={() => this.openContact()}>Contact</NavItem>
          {aboutPopup}
          {contactPopup}
        </Nav>
      </Navbar>
    );
  }
}

export default Footer;
