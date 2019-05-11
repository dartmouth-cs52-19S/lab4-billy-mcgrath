import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser } from '../actions/index';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.SignIn = this.SignIn.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }

  SignIn() {
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="new-post">
        <h1 className="create-post">Welcome back!</h1>
        <form id="note-add">
          <input id="input-bar" type="text" onChange={this.onEmailChange} placeholder="enter email" value={this.state.email} />
          <input id="input-bar" type="text" onChange={this.onPasswordChange} placeholder="password" value={this.state.password} />
          <button id="submit-button" type="button" onClick={this.SignIn}>Sign in!</button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
