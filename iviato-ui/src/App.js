import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './components/Login/LoginScreen';
import MainDashboard from './components/Dashboard/MainDashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            <Route exact path="/" component={LoginScreen} />
            <Route path="/home" component={MainDashboard} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
