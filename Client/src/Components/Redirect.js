// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actionCreator from '../Store/Actions/actions';

// class Redirect extends Component {

//     componentDidMount = () => {
//         this.props.createGoogleUser(window.location.search);
//       }
//     render() {
//         return (
//             <div>Redirect page</div>
//             )
// }}

// const mapStateToProps = (state) => {
//     return {
//         userAdded: state.userAdded,
//     };
  
//   };
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         createGoogleUser: (code) => dispatch(actionCreator.createGoogleUser(code))
//     }
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps
//   )(Redirect);