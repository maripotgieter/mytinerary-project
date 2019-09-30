import React, { Component } from 'react';
import Activity from './Activity';
import CommentForm from './CommentForm';
import CommentBox from './CommentBox';
import Comment from './Comment';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';




class Itinerary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      buttonCondition: true,

    };

    this.toggleState = this.toggleState.bind(this);
  }

  componentDidMount = () => {
    console.log(this.props.reference)
    this.props.gettingComments(this.props.itineraries.author.name);
  }
  toggleState() {
    const newState = this.state.condition === false ? true : false;
    const buttonState = this.state.buttonCondition === false ? true : false;
    this.setState({
      condition: newState,
      buttonCondition: buttonState
    });
  }

  render() {
    const itinerary = this.props.itineraries;
    const activities = this.props.itineraries.details;
    if (this.props.comments.length > 0)
    if (this.props.comments[0].ref.includes(itinerary.author.name)) {
    itinerary.details.comments = this.props.comments;
    }
    return (
      <React.Fragment >
        <div className={`borderbox ${this.state.condition ? "expand" : "normal"}`}>
          <div className="itineraryBox">
            <div className="leftBox"><img src={itinerary.author.image} alt="" /><div>{itinerary.author.name}</div></div>
            <div className="rightBox">
              <div>{itinerary.details.title}</div>
              <div className="detailBox"><div>Likes: {itinerary.details.likes}</div><div>{itinerary.details.time} Hours</div><div>{itinerary.details.price}</div></div>
              <div className="hashtags">{itinerary.hashtags.map((info, i) => (
                <div key={i}>#{info}</div>
              ))}
              </div>
            </div>
          </div>
          <div className="dropdown">
            <button onClick={this.toggleState} className={`viewAllButton ${this.state.buttonCondition ? "show" : "hide"}`}>View All</button>
            <div className={`dropdowninfo ${this.state.condition ? "show" : "hide"}`}>
              <Activity activity={activities}></Activity>
              <button onClick={this.toggleState}>Close</button>
              {
                itinerary.details.comments.map((info, i) => (
               <Comment comments={info.post} key={i}></Comment>
                
                ))
              }
          

              
              
              {/* <CommentBox comments={this.props.comments} /> */}
              {/* <CommentForm reference={itinerary.author.name} /> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
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
)(Itinerary);