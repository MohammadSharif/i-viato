import React, { Component } from 'react';
import './App.css';
import background from './img/background.jpg';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="app-bg" alt="background" />
          <SignUp />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
