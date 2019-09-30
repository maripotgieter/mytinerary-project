import React, { Component } from 'react';


class Carousel extends Component {
  render() {

    const activities = this.props.activities.activities;

    return (
      <React.Fragment>

        <div className="scene">
          <div className="carousel">{activities.map((info, i) => (
            <div className="carousel__cell" key={i}>{info}</div>
            ))}
          </div>
        </div>

      </React.Fragment>
    )
  }
}


export default Carousel;