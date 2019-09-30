import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';
import './Itineraries.css';
import Itinerary from '../Components/Itinerary';
// import homeButton from '../images/home-icon-silhouette.png';
// import backButton from '../images/left-arrow.png';


let cityUrl = window.location.pathname.split("/")[3]

class Itineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: this.props.itineraries,
      isLoaded: false,
    };
  }
  componentDidMount = () => {
    this.props.fetchItineraryForCity(cityUrl);
  }
  isObjectEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true
    } else {
      return false
    }
  }
  render() {

    console.log(this.props)
    if (this.isObjectEmpty(this.props.itineraries) === false) {

      const itineraries = this.props.itineraries.itinerary;
      const city = this.props.itineraries.city;
      if (!this.state.isLoaded)
        this.setState({
          itineraries: this.props.itineraries,
          isLoaded: true,
        })

        const styles = {
          backgroundImage: 'url('+ city["0"].src +')',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
        }
      return (
        <React.Fragment>
          <div className="city_image" style={styles}>{city["0"].city}</div>
          <div className="expand-border">
          <div>Available MYTineraries:</div>
          {
          itineraries.map((info, i) => (
            <Itinerary itineraries = {info} key={i}></Itinerary>
            )) 

          }
          </div>
          {/* <div id="footer">
            <img src={backButton} alt=""/>
            <img src={homeButton} alt=""/></div> */}
        </React.Fragment>
      )
    } else {
      return (
        <div>Loading ...</div>
      )
    }
  }

}
const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
  };

};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchItineraryForCity: (city) => dispatch(actionCreator.fetchItineraryForCity(city))
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Itineraries);

