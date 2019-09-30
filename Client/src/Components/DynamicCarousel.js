import React, { Component } from 'react';
import Slide from '../Components/Slide';
import city from '../images/city_photo.jpeg';
import city1 from '../images/city2_photo.jpeg';
import city2 from '../images/city3_photo.jpeg';
import city3 from '../images/city4_photo.jpeg';
import city4 from '../images/city5_photo.jpeg';
import city5 from '../images/city6_photo.jpeg';
import city6 from '../images/paris_photo.jpeg';

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
   
  }

const imageArray = [
 city,
 city1,
 city2,
 city3,
 city4,
 city5,
 city6,

];

class DynamicCarousel extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
          images: [
            city,
           
          ],
      }
    }
    componentDidMount = ()  => {
      setInterval(() => this.setState({images: shuffleArray(imageArray)}), 5000);
   }
    render() {
    
      return (
        <div className="slider">
        {
          this.state.images.slice(0, 1).map((image, i) => ( 
            <Slide key={i} image={image}  ></Slide>
          )) 
        }  
        </div>
      );
    }
}

export default DynamicCarousel;
