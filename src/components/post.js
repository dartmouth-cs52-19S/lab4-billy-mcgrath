import React, { Component } from 'react';
// some imports
import { connect } from 'react-redux';
import marked from 'marked';
import { fetchPost, deletePost, updatePost } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      updatedPost: {
        title: '',
        content: '',
        tags: '',
        cover_url: '',
      },
    };

    this.renderEdit = this.renderEdit.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onEditClick = (event) => {
    if (this.state.isEditing) {
      this.props.updatePost(this.props.currentPost._id, this.state.updatedPost);
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  onDeleteClick = (event) => {
    this.props.deletePost(this.props.currentPost._id, this.props.history);
  }

  onTitleChange(event) {
    this.setState({
      updatedPost: {
        title: event.target.value,
        content: this.props.currentPost.content,
        tags: this.props.currentPost.tags,
        cover_url: this.props.currentPost.cover_url,
      },
    });
  }

  onContentChange(event) {
    this.setState({
      updatedPost: {
        title: this.props.currentPost.title,
        content: event.target.value,
        tags: this.props.currentPost.tags,
        cover_url: this.props.currentPost.cover_url,
      },
    });
  }

  onTagsChange(event) {
    this.setState({
      updatedPost: {
        title: this.props.currentPost.title,
        content: this.props.currentPost.content,
        tags: event.target.value,
        cover_url: this.props.currentPost.cover_url,
      },
    });
  }

  renderTitle() {
    if (this.state.isEditing) {
      return (
        <div className="changing">
          <p>Title: </p>
          <input id="title-change" type="text" onChange={this.onTitleChange} value={this.state.updatedPost.title} />
        </div>
      );
    } else {
      return (
        <h1 className="blog-title">{this.props.currentPost.title}</h1>
      );
    }
  }

  renderContent() {
    if (this.state.isEditing) {
      return (
        <div className="changing">
          <p>Content: </p>
          <input id="content-change" type="text" onChange={this.onContentChange} value={this.state.updatedPost.content} />
        </div>
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <p className="blog-content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
      );
    }
  }

  renderTags() {
    if (this.state.isEditing) {
      return (
        <div className="changing">
          <p>Tags: </p>
          <input id="tag-change" type="text" onChange={this.onTagsChange} value={this.state.updatedPost.tags} />
        </div>
      );
    } else {
      return (
        <p className="blog-tags">{this.props.currentPost.tags}</p>
      );
    }
  }

  renderEdit() {
    return (
      <button type="button" onClick={this.onEditClick} className="note-button"><i className="far fa-edit" /></button>
    );
  }

  renderDelete() {
    return (
      <button type="button" onClick={this.onDeleteClick} className="note-button"><i className="far fa-trash-alt" /></button>
    );
  }

  render() {
    console.log(this.state.updatedPost);
    return (
      <div className="blog-post">
        {this.renderEdit()}
        {this.renderDelete()}
        <img src={this.props.currentPost.cover_url} alt="Blog Cover" />
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderTags()}
      </div>
    );
  }
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
