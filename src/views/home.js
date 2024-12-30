import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';    
import './home.css';
import Logo from '../images/Logo.svg';
import Profile from '../images/me.png';
import { Helmet } from 'react-helmet';

export default function Home() {


  return (
    <div className="wrapper home">
      <Helmet><title>1C3 | Rafael Silva</title></Helmet>
      <section>
        <div>
          <div className="first-details">
            <div className='logo'>
              <img src={Logo} alt="Logo" />
            </div>
            <h1 className='title'>Rafael Silva</h1>
            <div className='subtitle'>Developer<span className='and'>&</span>Designer</div>
            <Link to="/projects">projects</Link>
          </div>
        </div>
      </section>
      <section>

      </section>
    </div>
  );
}