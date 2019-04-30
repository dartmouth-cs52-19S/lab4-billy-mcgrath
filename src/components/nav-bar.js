import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Billys Blog</NavLink></li>
        <li><NavLink to="/posts/new">Create Post</NavLink></li>
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
