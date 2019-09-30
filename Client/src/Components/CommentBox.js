import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';
import Comment from './Comment';

class CommentBox extends Component {


  componentDidMount = () => {
    console.log(this.props.reference)
    // this.props.gettingComments(this.props.reference);
  }

  render() {
            {/* <div key={i}>{info.post}</div> */}
  console.log(this.props)
    if (this.props.commentsLoaded === true) {
      console.log(this.props.comments)
      const comments = this.props.comments;
      return (
        <div>
          <h1>All Posts</h1>
          {
          comments.map((info, i) => (
           <Comment comments={info.post} key={i}></Comment>
            )) 

          }
        </div>
      );
    } else {
      return(
      <div>Loading....</div>
      )
    }

  }
} 

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    commentsLoaded: state.commentsLoaded,
  };

};
const mapDispatchToProps = (dispatch) => {
  return {
    gettingComments: (reference) => dispatch(actionCreator.gettingComments(reference))
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(CommentBox);

