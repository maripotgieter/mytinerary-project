import React, { Component } from 'react';
import Logout from '../Components/Logout';

class Hamburger extends Component {

  constructor(props) {
    super(props);
    this.state = { condition: false };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    const newState = this.state.condition === false ? true : false;
    this.setState({ condition: newState });
  }
  render() {
    return (

      <div>
        <span className="closebtn" onClick={this.toggleState}>&#9776;</span>
        <div className={`
        sidenav
        ${this.state.condition ? "show" : "hide"}`}>
          <a href="javascript:void(0)" className="closebtn" onClick={this.toggleState}>&times;</a>
          <a href="/web/signup">Create Account</a>
          <a href="/web/login" >Login</a>
          <Logout></Logout>
        </div>
      </div>
    );
  }
}

export default Hamburger;