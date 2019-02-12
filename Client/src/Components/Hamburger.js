import React, { Component } from 'react';
// import profile from '../images/';

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
        <div className="top">
			<a href="#" className="menu_icon" onClick={this.toggleState}><i className="material-icons">dehaze</i></a>
		</div>

        <nav className = {`
        "menu"
        ${this.state.condition ? "show" :"hide"}`}>
		<a href="/web/signup" className="item_menu">Create Account</a>
		<a href="/web/login" className="item_menu">Login</a>
		
	</nav>
        </div>
    );
}
}


export default Hamburger;