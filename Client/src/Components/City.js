import React from 'react';
import { Component } from 'react';

class City extends Component{
  constuctor() {
    // this.routeChange = this.routeChange.bind(this);
    

   
  }
  routeChange(city) {
    console.log("Changing the route")
    // let path = `newPath`;
    // this.props.history.push(path);
    // window.location = "itinerary";
  }
  render() {
    
    const styles = {
      backgroundImage: 'url('+ this.props.info.pano +')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }
    return <div className="city" style={styles}><span>{this.props.info.city}</span></div>
  }
}
    
export default City;