import React, { Component } from 'react';
import { createPost } from '../actions/index';
import { uploadImage } from '../s3';

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
    this.onCreatePost = this.onCreatePost.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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

  onImageUpload(event) {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
  }

  onCreatePost(history = this.props.history) {
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        this.setState({ cover_url: url });
        createPost(this.state, this.props.history);
      }).catch((error) => {
        history.push('/');
      });
    }

    this.setState({
      title: '',
      content: '',
      tags: '',
      cover_url: '',
    });
  }

  render() {
    return (
      <div className="new-post">
        <h1 className="create-post">Create a new post</h1>
        <form id="note-add">
          <input id="input-bar" type="text" onChange={this.onTitleChange} placeholder="new post title" value={this.state.title} />
          <input id="input-bar" type="text" onChange={this.onContentChange} placeholder="new post content" value={this.state.content} />
          <input id="input-bar" type="text" onChange={this.onTagsChange} placeholder="new post tags" value={this.state.tags} />
          <img id="preview" alt="preview" src={this.state.preview} />
          <input type="file" name="coverImage" onChange={this.onImageUpload} />
          <button id="submit-button" type="button" onClick={this.onCreatePost}>Create a post!</button>
        </form>
      </div>
    );
  }
}

export default NewPost;
