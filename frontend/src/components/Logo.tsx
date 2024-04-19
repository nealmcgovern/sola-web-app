import React from 'react';
import logo from '../img/Sensologo.png'; // Tell webpack this JS file uses this image

const Logo = () => {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Logo;