import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import ReactHelmet from 'react-helmet';
import './home.css';
import flowerSVG from '../images/SVG/8 flower.svg';
import Logo from '../images/Logo.svg';

export default function Home() {

    return (
        <div className="wrapper home">
            <ReactHelmet><title>1C3 | Rafael Silva</title></ReactHelmet>
            <section >
                <div>
                    <div className="first-details" >
                        <div className='logo'>
                            <img src={Logo} />
                        </div>

                        <h1 className='title'>Rafael Silva</h1>
                        <div className='subtitle'>Developer<span className='and'>&</span>Designer</div>
                        <Link to="/projects">projects</Link>

                    </div>

                </div>

            </section>
            <section >
                <div className='flowerSVG'>
                </div>
                <div className='title' >
                    <h1><span className='subtitle'>From</span> <span className='portugal-hover'>Portugal</span></h1>
                    <h1><span className='subtitle'>With background in</span><br /> <Link to="https://ipv.pt" target="_blank">Multimedia Technologies and Design</Link></h1>
                </div>
            </section>

        </div>
    )
}