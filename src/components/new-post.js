import React, { Component } from 'react';
import { createPost } from '../actions/index';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
    this.onCreatePost = this.onCreatePost.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onCoverChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  onCreatePost() {
    createPost(this.state, this.props.history);

    this.setState({
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    });
  }

  render() {
    return (
      <form id="note-add">
        <input id="input-bar" type="text" onChange={this.onTitleChange} placeholder="new post title" value={this.state.title} />
        <input id="input-bar" type="text" onChange={this.onContentChange} placeholder="new post content" value={this.state.content} />
        <input id="input-bar" type="text" onChange={this.onTagsChange} placeholder="new post tags" value={this.state.tags} />
        <input id="input-bar" type="text" onChange={this.onCoverChange} placeholder="new post cover url" value={this.state.cover_url} />
        <button id="submit-button" type="button" onClick={this.onCreatePost}>Create a post!</button>
      </form>
    );
  }
}

export default NewPost;
