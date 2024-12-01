import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './home.css';
import flowerSVG from '../images/SVG/8 flower.svg';
import Logo from '../images/Logo.svg';
import Footer from '../components/footer';

export default function Home() {



    return (
        <div className="wrapper home">
            <section >
                <div>
                    <div className="first-details" >
                        <div className='logo'>
                            <img src={Logo} />
                        </div>

                        <h1 className='title'>Rafael Silva</h1>
                        <div className='subtitle' >Developer<span className='and'>&</span>Designer</div>
                        <Link to="/projects">projects</Link>

                    </div>

                </div>

            </section>
            <section >
                <div className='flowerSVG'>
                    <img src={flowerSVG} />
                </div>
                <div className='title' >
                    <h1><span className='subtitle'>From</span> Portugal</h1>
                    <h1><span className='subtitle'>With background in</span><br /> <Link to="https://ipv.pt" target="_blank">Multimedia Technologies and Design</Link></h1>
                </div>
            </section>
            <section>
                a
                <Footer />
            </section>
        </div>
    )
}