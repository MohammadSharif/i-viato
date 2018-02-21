import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './SignIn.css';
import logo from '../img/iviato.png';
import { ToastContainer, toast, style } from 'react-toastify';

style({ colorError: "#d14545", fontFamily: "Roboto" });

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
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if(!toast.isActive(this.state.toastId)){
      if(this.state.username === ''){
        this.setState({toastId: toast.error("Error: No email entered.")});
      } else if (!this.validateEmail()){
        this.setState({toastId: toast.error("Error: Email not properly entered.")});
      } else if(this.state.password === ''){
        this.setState({toastId: toast.error("Error: No password entered.")});
      }
    }
  }

  validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username)) {
      return (true)
    }
    return (false)
  }

  render() {
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
