import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Logo from '../images/Logo.svg';
import Profile from '../images/me.png';
import { Helmet } from 'react-helmet';
import TextPressure from '../blocks/TextAnimations/TextPressure/TextPressure';
import DecryptedText from '../blocks/TextAnimations/DecryptedText/DecryptedText';
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText';
import Waves from '../blocks/Backgrounds/Waves/Waves';
import checkTouchDevice from '../utils/checkTouch';

export default function Home() {
  const isTouch = checkTouchDevice();
  const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-50').trim();

  return (
    <div className="wrapper home">
      <Helmet><title>1C3 | Rafael Silva</title></Helmet>
      <section>
        <div className='logo'>
          <img src={Logo} alt="Logo" />
        </div>
        {isTouch ?
          <h1 className='title'>Rafael Silva</h1> : <TextPressure
            text="RAFAEL SILVA"
            fontFamily="Emberly"
            className='title'
            flex={false}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor="var(--white-color)"
            strokeColor="var(--accent-color)"
            minFontSize={80}
          />}

        <ShinyText disabled={false} speed={4.8} className='subtitle' />


        <Link to="/projects">projects</Link>
        <Waves
          lineColor={lineColor}
          backgroundColor="var(--gray-1-color)"
          waveSpeedX={0.01}
          waveSpeedY={0.01}
          waveAmpX={64}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={0}
          xGap={12}
          yGap={24}
        />
      </section>
      <section>
        <div>
          <br/>
          ...wip...
        </div>
      </section>

    </div>
  );
}