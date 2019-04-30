import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import PostList from './posts';
import Post from './post';
import NewPost from './new-post';

import '../style.scss';

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

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
