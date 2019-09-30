import React, { Component } from 'react';
import logo from '../images/official_logo4.png';
import arrow from '../images/circled-right-2[3937].png';
import Hamburger from '../Components/Hamburger';
import profile from '../images/profile_picture.png';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="white-box"></div>
        <div className="Logo-section">
          <div className="App-logo">
            <img src={logo} alt="logo" />

          </div>
        </div>


      </div>
    );
  }
}

export default Header;
