import React, { Component } from 'react';
import City from '../Components/City';
import Hamburger from '../Components/Hamburger';
import profile from '../images/profile_picture.png';
import './Cities.css';
import SearchFilter from '../Components/SearchFilter';
import { connect } from 'react-redux';
import * as actionCreator from '../Store/Actions/actions';
import logo from '../images/official_logo4.png'; 


class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities,
      isLoaded: false,
    };
    this.myCallback = this.myCallback.bind(this);
    this.filterList = this.filterList.bind(this);
  }
  componentDidMount = () => {
    console.log("I have mounted")
    this.props.fetchCities();
    this.props.createGoogleUser(window.location.search);
  }
  componentDidUpdate = () => {

  }
  handleButtonValue = (cityName) => {
    var city = cityName.charAt(0).toLowerCase() + cityName.slice(1);
    console.log(city)
    window.location.href = "itinerary/" + city;

  }

  myCallback = (valueDataFromChild, dataFromChild) => {
    this.setState({ [valueDataFromChild]: dataFromChild });
    this.filterList(dataFromChild);
  }
  filterList = (data) => {
    var updatedList = this.props.cities;
    updatedList = updatedList.filter(function (item) {
      var cityName = item.city;
      return cityName.toLowerCase().search(data.toLowerCase()) !== -1;
    });
    this.setState({ cities: updatedList });
  }

  render() {
    if (this.props.cities.length > 0) {
      const cities = this.state.cities
      if (!this.state.isLoaded)
        this.setState({
          cities: this.props.cities,
          isLoaded: true,
        })
      return (
        <React.Fragment>
        
        <div id="corner-logo"><img src={logo} alt=""/></div>
          <header>
            <Hamburger></Hamburger>
          </header>
          <SearchFilter callbackFromParent={this.myCallback}></SearchFilter>
        
          {
            cities.map((info, i) => (
              <a key={i} value={info.city} onClick={() => { this.handleButtonValue(info.city) }}><City info={info}></City>
              </a>
            ))

          }

        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <div id="corner-logo"><img src={logo} alt=""/></div>
          <header>
            <Hamburger></Hamburger>
          </header>
          <div>Loading ...</div>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    userAdded: state.userAdded,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCities: () => dispatch(actionCreator.fetchCities()),
    createGoogleUser: (code) => dispatch(actionCreator.createGoogleUser(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Cities);





