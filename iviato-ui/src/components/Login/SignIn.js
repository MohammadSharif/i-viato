import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ToastContainer, toast, style } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import './SignIn.css';
import logo from '../../img/iviato.png';

import { login, isAuthorized } from '../../util/User';

style({ colorError: "#d14545", fontFamily: "Roboto" });

/**
 * The SignIn class encapsulates all sign in functionality for the application.
 * It handles user input as well as authentication of users.
 * @extends Component
 */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      toastId: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.attemptSignIn = this.attemptSignIn.bind(this);
  }

  /**
   * The onChange function is responsible for handling each input field.
   * As the user types into the field, we must update the state to store
   * the input.
   * @param  {[type]} e User input
   * @return {[type]}   No return value, state is altered.
   */
  onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  /**
   * The onSubmit function is responsible for checking that all information
   * was properly entered by the user.
   * @param  {[type]} e Submit button click
   * @return {[type]}   No return value
   */
  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    if(!toast.isActive(this.state.toastId)){
      if (!this.validateEmail()){
        this.setState({toastId: toast.error("Please enter a valid email.")});
      } else if(this.state.password === ''){
        this.setState({toastId: toast.error("No password was specified.")});
      } else {
        this.attemptSignIn();
      }
    }
  }

  attemptSignIn(){
    login(this.state.username, this.state.password)
      .then(() => {
        toast.success("Login successful");
        this.setState({redirect: true});
      })
      .catch(() => {
        toast.error("Login unsuccessful");
      });
  }

  /**
   * Helper method to ensure that an email is actually a valid formatted email
   * @return {[boolean]} True if valid, False otherwise
   */
  validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username)) {
      return (true)
    }
    return (false)
  }

  render() {
    if (this.state.redirect && isAuthorized().token) {
      return <Redirect push to="/home" />;
    }
    return (
      <div className="SignIn-Card">
        <ToastContainer autoClose={5000}/>
        <img src={logo} className="iviato-header" alt="logo" />
        <div className="input-fields">
          <h4 className="form-header">Username</h4>
          <TextField
            value={this.state.username}
            onChange={this.onChange}
            hintText="email@sjsu.edu"
            type="email"
            name="username"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
          <h4 className="form-header">Password</h4>
          <TextField
            value={this.state.password}
            onChange={this.onChange}
            hintText="Password"
            type="password"
            name="password"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
        </div>
        <div className="button-div">
          <RaisedButton
            label="Register"
            backgroundColor='#9ca8bc'
            labelColor='#FFFFFF'
            style={{width: "40%"}}
            onClick={() => this.props.onClick()}/>
          <RaisedButton
            label="Sign In"
            backgroundColor='#4AA9F4'
            labelColor='#FFFFFF'
            style={{width: "40%"}}
            onClick={this.onSubmit}
            />
        </div>
      </div>
    );
  }
}

export default SignIn;
