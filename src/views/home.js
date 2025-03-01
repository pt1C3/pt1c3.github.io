import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Logo from '../images/Logo.svg';
import Profile from '../images/me.png';
import { Helmet } from 'react-helmet';
import TextPressure from '../blocks/TextAnimations/TextPressure/TextPressure';
import BlurText from '../blocks/TextAnimations/BlurText/BlurText';
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

        <div className='links'>
          <Link to="/projects">projects</Link>
          <Link to="/about">about me</Link>
        </div>

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
        <BlurText
          text="I'm a *web* *designer* and *developer* with a keen eye for aesthetics and functionality. Blending *design* with *code*, I craft intuitive, visually striking digital experiences that balance *creativity* and *usability*."
          delay={20}
          animateBy="words"
          direction="top"
        />
        <BlurText
          text="While my focus is on web design and development, I also dabble in *graphic* *design*, bringing a refined artistic touch to my work."
          delay={20}
          animateBy="words"
          direction="top"
        />
        <BlurText
          text="When I’m not building sleek interfaces, you’ll probably find me *sketching* *portraits* or diving into music and film. I’m *eager* *to* *create*, and *push* *boundaries* in the digital space."
          delay={20}
          animateBy="words"
          direction="top"
        />

      </section>
    </div>
  );
}