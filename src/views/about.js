import React from 'react';
import SpotifySection from '../components/spotifySection';
import './about.css';
import checkTouchDevice from '../utils/checkTouch';

export default function About(){
    const isTouch = checkTouchDevice();

    return (
        <div className="wrapper about">
            <section style={{height: '100vh'}}></section>
            <SpotifySection isTouch={isTouch}/>
        </div>
    );
};


