import React, { Component } from 'react';
import logo from '../images/MYtineraryLogo[3938].png';
import arrow from '../images/circled-right-2[3937].png';
import Hamburger from '../Components/Hamburger';
import profile from '../images/profile_picture.png';


class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header><img src={profile} alt="profile"/><Hamburger></Hamburger></header>
        <div className = "Logo-section">
        <div className = "App-logo">
          <img src={logo} alt="logo"/>
          </div>
        <div className="Logo-heading">Find your perfect trip, designed by insiders who know and love their cities</div>
        </div>
        <div className="Button-section">
          <img src={arrow} alt="arrow"/>
          </div>
     
      </div>
    );
  }
}

export default Header;
