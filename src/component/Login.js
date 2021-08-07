import React, { Component } from 'react';
import '../css/Login.css';
import {loginUser} from "../state/action";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      error: '',
    };
  }

  onSubmitForm = () => {
    console.log('onSubmitForm', this.state);
    loginUser(this.state)
      .then(res => {
        this.setState({ error: '' });
        this.props.history.push('/userList');
      })
      .catch(err => this.setState({ error: err.message }));
  };

  changeFormValue = event => {
    console.log('changeFormValue::',event);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <h2>User Login</h2>
        <div class="container" id="container">
          <div class="form-container sign-in-container">
            <form onSubmit={e => e.preventDefault()}>
              <h1>Sign in</h1>&nbsp;
              <input type="text" name="login" placeholder="User Name" onChange={this.changeFormValue} required />
              <input type="password" name="password" placeholder="Password" onChange={this.changeFormValue} required />
              <button type="submit" onClick={this.onSubmitForm}>
                Sign In
              </button>
              {this.state.error !== '' && (
                <font color="red">
                  {' '}
                  <b>{this.state.error}</b>{' '}
                </font>
              )}
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button class="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button class="ghost" onClick={() => this.props.history.push('/signUp')} id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default LoginPage;