import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './LoginScreen.css';

/**
 * The LoginScreen class is the outer component for our application's entry point.
 * The LoginScreen consists of two inner components, Sign In and Sign Up which
 * each handle their specific functionalities.
 * @extends Component
 */
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

  /**
   * The handleClick function is responsible for handling the toggle between
   * a Sign In form and a Sign Up form for the web app. Depending on what the
   * current state of the form is, we will toggle to either Sign In or Sign Up.
   * @param  {[event]} This is the click event that occurs on the button.
   * @return {[void]}  No returned value, the current state is altered.
   */
  handleClick(event){
    // If the current state is the Sign In form, switch to Sign Up
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<SignUp parentContext={this} onClick={() => this.handleClick()}/>);
      this.setState({
                     loginscreen:loginscreen,
                     isLogin:false
                   })
    // If the current state is the Sign Up form, switch to the Sign In
    } else {
      var loginscreen=[];
      loginscreen.push(<SignIn parentContext={this} onClick={() => this.handleClick()}/>);
      this.setState({
                     loginscreen:loginscreen,
                     isLogin:true
                   })
    }
  }

  /**
   * The componentWillMount function handles initially setting the state to be
   * a Sign In form.
   * @return {[void]} Current state is altered, no return value.
   */
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

  /**
   * Renders the LoginScreen dynamically
   * @return {[div]} Returns HTML representing our LoginScreen
   */
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
