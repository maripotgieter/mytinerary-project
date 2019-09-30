import React, { Component } from 'react';
import './SignUp.css';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';
import logo from '../images/official_logo4.png';


class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        // const username =  this.getUsername.value;
        const email = this.getEmail.value;
        const password = this.getPassword.value;
        const user = {
        //   "username": username,
          "email":email,
          "password": password,
        }
       
        this.props.loginUser(user);
        
      }

    render() {

        return (

            <React.Fragment>
            <div id="corner-logo"><img src={logo} alt=""/></div>
                <div id="login-box">
                
                    <div className="left">
                        <h1>Sign in</h1>

                        {/* <input type="text" name="username" placeholder="Username" ref={(input)=>this.getUsername = input} /> */}
                        <input type="text" name="email" placeholder="E-mail" ref={(input)=>this.getEmail = input} />
                        <input type="password" name="password" placeholder="Password" ref={(input)=>this.getPassword = input} />

                        <input onClick={this.handleSubmit} type="submit" name="signup_submit" value="Sign me in" />
                    </div>

                    <div className="or">OR</div>

                    <div className="right">

                        <button className="social-signin facebook">Log in with facebook</button>
                        {/* <button className="social-signin twitter">Log in with Twitter</button> */}
                        <button className="social-signin google" href="/auth/google">Log in with Google+</button>
                    </div>
                    
                </div>
            </React.Fragment>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userLoggedIn,
    };
  
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(actionCreator.loginUser(user))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps
  )(Login);
  

