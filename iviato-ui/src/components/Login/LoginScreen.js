import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './LoginScreen.css';
class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      isLogin:true
    }
  }
  handleClick(event){
    // console.log("event",event);
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<SignUp parentContext={this} onClick={() => this.handleClick()}/>);
      this.setState({
                     loginscreen:loginscreen,
                     isLogin:false
                   })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<SignIn parentContext={this} onClick={() => this.handleClick()}/>);
      this.setState({
                     loginscreen:loginscreen,
                     isLogin:true
                   })
    }
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(
      <SignIn
        parentContext={this}
        onClick={() => this.handleClick()}
        appContext={this.props.parentContext}/>
    );
    this.setState({ loginscreen:loginscreen });
  }
  render() {
    return (
      <div>
        <div className="loginscreen">
          {this.state.loginscreen}
          <div className="app-bg" alt="background" />
        </div>
      </div>
    );
  }
}

export default LoginScreen;
