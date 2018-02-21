import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './SignIn.css';
import logo from '../img/iviato.png';
class SignIn extends Component {
  render() {
    return (
      <div className="SignIn-Card">
        <img src={logo} className="iviato-header" alt="logo" />
        <div className="input-fields">
          <h4 className="form-header">Username</h4>
          <TextField
            hintText="email@sjsu.edu"
            type="email"
            name="email"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
          <h4 className="form-header">Password</h4>
          <TextField
            hintText="Password"
            type="password"
            name="pass"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
        </div>
        <div className="button-div">
          <RaisedButton
            label="Register"
            backgroundColor='#9ca8bc'
            labelColor='#FFFFFF'
            style={{width: "40%"}} />
          <RaisedButton
            label="Sign In"
            backgroundColor='#4AA9F4'
            labelColor='#FFFFFF'
            style={{width: "40%"}}/>
        </div>
      </div>
    );
  }
}

export default SignIn;
