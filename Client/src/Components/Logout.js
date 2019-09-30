import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';

class Logout extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        var token = localStorage.getItem("token");
        this.props.logoutUser(token);

    }
    render() {
        return (
            <React.Fragment>
                <input onClick={this.handleSubmit} type="submit" name="logout_submit" value="Logout" />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLoggedOut: state.userLoggedOut,
    };

};
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (token) => dispatch(actionCreator.logoutUser(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Logout);