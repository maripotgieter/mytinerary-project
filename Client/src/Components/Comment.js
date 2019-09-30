import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

class Comment extends Component {
  render() {
    console.log(this.props.comments)
    return (
      <div>{this.props.comments}
      </div>
    )
  }
}

export default Comment;