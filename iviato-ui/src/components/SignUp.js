import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ToastContainer, toast, style } from 'react-toastify';
import './SignUp.css';
import logo from '../img/iviato.png';

style({ colorError: "#d14545", fontFamily: "Roboto" });

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmed: '',
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
      } else if(this.state.password !== this.state.confirmed){
        this.setState({toastId: toast.error("Error: Passwords do not match")});
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
      <div className="SignUp-Card">
        <img src={logo} className="iviato-header" alt="logo" />
        <ToastContainer autoClose={5000}/>
        <div className="input-fields">
          <h4 className="form-header">First Name</h4>
          <TextField
            value={this.state.firstname}
            onChange={this.onChange}
            hintText='Johnny'
            type="text"
            name="firstname"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
          <h4 className="form-header">Last Name</h4>
          <TextField
            value={this.state.lastname}
            onChange={this.onChange}
            hintText="Appleseed"
            type="text"
            name="lastname"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
          <h4 className="form-header">Username*</h4>
          <TextField
            value={this.state.username}
            onChange={this.onChange}
            hintText="email@sjsu.edu"
            type="email"
            name="username"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
          <h4 className="form-header">Password*</h4>
          <TextField
            value={this.state.password}
            onChange={this.onChange}
            hintText="Password"
            type="password"
            name="password"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
          <h4 className="form-header">Confirm Password*</h4>
          <TextField
            value={this.state.confirmed}
            onChange={this.onChange}
            hintText="Confirm Password"
            type="password"
            name="confirmed"
            underlineFocusStyle={{borderColor: '#4AA9F4'}}
            className="input-field"
          />
        </div>
        <div className="button-div">
          <RaisedButton
            label="Cancel"
            backgroundColor='#9ca8bc'
            labelColor='#FFFFFF'
            style={{width: "40%"}}
            onClick={() => this.props.onClick()}/>
          <RaisedButton
            label="Sign Up"
            backgroundColor='#4AA9F4'
            labelColor='#FFFFFF'
            style={{width: "40%"}}
            onClick={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

export default SignUp;