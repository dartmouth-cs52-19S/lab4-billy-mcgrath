import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/index';


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { };
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut(event) {
    this.props.signoutUser(this.props.history);
  }

  render() {
    if (this.props.authenticated) {
      return (
        <nav>
          <ul>
            <li><NavLink exact to="/">Billys Blog</NavLink></li>
            <li><NavLink to="/posts/new">Create Post</NavLink></li>
            <li><button type="button" onClick={this.onSignOut} className="signout">Sign Out</button></li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul>
            <li><NavLink exact to="/">Billys Blog</NavLink></li>
            <li><NavLink to="/posts/new">Create Post</NavLink></li>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </ul>
        </nav>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
