import React from 'react';
import './footer.css';
import Logo from '../images/Logo.svg';

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref}>
      <div><h1>contacts</h1></div>
      <div><h1>pages</h1></div>
      <div>
        <div className='logo'>
          <img src={Logo} />
        </div>
        <p>
          Passionate about <span className='font-bold'>design</span>, <span className='font-bold'>development</span>, and innovation.
        </p>
      </div>
    </footer>
  );
});

export default Footer;