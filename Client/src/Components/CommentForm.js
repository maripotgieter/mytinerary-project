import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';


class CommentForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const message =  this.getMessage.value;
    const comments = {
      "post": message,
      "time": new Date(),
      "ref": this.props.reference,
    }
   
    this.props.postingComments(comments);
    
  }
  render () {

    return (
      <div>
        <h1>Create comment</h1>
        <form onSubmit={this.handleSubmit}>
          <input required type="text" placeholder="Enter your comment..." ref={(input)=>this.getMessage = input}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    commentAdded: state.commentAdded,
  };

};
const mapDispatchToProps = (dispatch) => {
  return {
    postingComments: (comments) => dispatch(actionCreator.postingComments(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(CommentForm);

