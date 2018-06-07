import React, { Component } from 'react';
import ViewContainer from './Components/ViewContainer';
import logo from './logo.svg';
import './App.css';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div className="App">
        <ViewContainer />
      </div>
    );
  }
}

export default App;
