import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPosts } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
  };
}

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      this.props.posts.map((post) => {
        return (
          <div className="post-box" key={post.id}>
            <NavLink to={`/posts/${post.id}`}>
              <img src={post.cover_url} alt="Blog Cover" />
              <h1 className="post-title">{post.title}</h1>
              <p className="post-tags">Tags: {post.tags}</p>
            </NavLink>
          </div>
        );
      })
    );
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostList);
