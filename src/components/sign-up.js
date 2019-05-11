import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../actions/index';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onUserChange(event) {
    this.setState({ username: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSignUp(event) {
    this.props.signupUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="new-post">
        <h1 className="create-post">Create an account!</h1>
        <form id="note-add">
          <input id="input-bar" type="text" onChange={this.onUserChange} placeholder="enter username" value={this.state.username} />
          <input id="input-bar" type="text" onChange={this.onEmailChange} placeholder="enter email" value={this.state.email} />
          <input id="input-bar" type="text" onChange={this.onPasswordChange} placeholder="password" value={this.state.password} />
          <button id="submit-button" type="button" onClick={this.onSignUp}>Create account!</button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
