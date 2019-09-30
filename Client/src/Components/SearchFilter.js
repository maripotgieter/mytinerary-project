import React, { Component } from 'react';
// import Cities from '../Containers/Cities';

class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value
        this.props.callbackFromParent("value" , value);
        
    }
    render () {
    return <div className="inputFilter" >Find our current cities: <input value={this.props.value}
    onChange={this.handleInputChange} type="text" placeholder="Search..."/>
     </div>
    }
}

export default SearchFilter;