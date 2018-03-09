import React, { Component } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <LoginScreen />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
