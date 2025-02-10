const checkTouchDevice = () => {
    // Check if the body has the 'touch-device' class
    return document.body.classList.contains('touch-device');
  };
  
  export default checkTouchDevice;