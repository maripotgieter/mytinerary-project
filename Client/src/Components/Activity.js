import React, { Component } from 'react';
import Carousel from './Carousel';


class Activity extends Component {
    render() {
        const activities = this.props.activity;
        return (
            <React.Fragment >
                <div>Activities</div>
                <Carousel activities = {activities}></Carousel>   
            </React.Fragment>
        )

    }
}

export default Activity;