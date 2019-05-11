import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import PostList from './posts';
import Post from './post';
import SignIn from './sign-in';
import SignUp from './sign-up';
import NewPost from './new-post';
import NavBar from './nav-bar';
import RequireAuth from '../containers/requireAuth';

import '../style.scss';

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={PostList} />
          {/* eslint-disable-next-line new-cap */}
          <Route path="/posts/new" component={RequireAuth(NewPost)} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
