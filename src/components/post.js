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
    this.renderImage = this.renderImage.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
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
      this.setState({
        updatedPost: {
          title: this.props.currentPost.title,
          content: this.props.currentPost.content,
          tags: this.props.currentPost.tags,
          cover_url: this.props.currentPost.cover_url,
        },
      });
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
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.updatedPost);
  }

  onContentChange(event) {
    this.setState({
      updatedPost: {
        content: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.updatedPost);
  }

  onTagsChange(event) {
    this.setState({
      updatedPost: {
        tags: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.updatedPost);
  }

  onImageChange(event) {
    this.setState({
      updatedPost: {
        cover_url: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.updatedPost);
  }

  renderTitle() {
    if (this.state.isEditing) {
      return (
        <input id="title-change" type="text" onChange={this.onTitleChange} placeholder="update title" value={this.state.updatedPost.title} />
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
        <input id="content-change" type="text" onChange={this.onContentChange} placeholder="update content" value={this.state.updatedPost.content} />
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
        <input id="tag-change" type="text" onChange={this.onTagsChange} placeholder="update tags" value={this.state.updatedPost.tags} />
      );
    } else {
      return (
        <p className="blog-tags">{this.props.currentPost.tags}</p>
      );
    }
  }

  renderImage() {
    if (this.state.isEditing) {
      return (
        <input id="cover-change" type="text" onChange={this.onImageChange} placeholder="update image" value={this.state.updatedPost.cover_url} />
      );
    } else {
      return (
        <img className="blog-cover" src={this.props.currentPost.cover_url} alt="Blog Cover" />
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
        <div className="content">
          {this.renderImage()}
          {this.renderTitle()}
          {this.renderContent()}
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
