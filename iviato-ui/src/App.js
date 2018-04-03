import React, { Component } from 'react';
import './App.css';
import LoginScreen from './components/Login/LoginScreen';
import MainDashboard from './components/Dashboard/MainDashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <MainDashboard />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
