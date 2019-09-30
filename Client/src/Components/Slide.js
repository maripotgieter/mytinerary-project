import React from 'react';


const Slide = ({ image }) => {
 const styles = {
   backgroundImage: 'url('+ image +')',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
 }
  return <div className="slides" style={styles}></div>
}
    
export default Slide;
