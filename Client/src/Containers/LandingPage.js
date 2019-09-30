import React, { Component } from 'react';
import './LandingPage.css';
import Header from '../Components/Header'
import DynamicCarousel from '../Components/DynamicCarousel';

class LandingPage extends Component {
  signUpPage = () => {
  
    window.location.href = "http://localhost:3000/web/signup";

  }
  loginPage = () => {
  
    window.location.href = "http://localhost:3000/web/login"

  }
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <DynamicCarousel></DynamicCarousel>

        <div className="button-footer">
          <button className="signup-button" onClick={ () => this.signUpPage()}>BECOME A MYTINERARY MEMBER</button>
          <button className="login-button"  onClick={ () => this.loginPage()}>I'M ALREADY A MYTINERARY MEMBER</button>
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;


