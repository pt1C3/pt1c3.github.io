import './App.css';
import bgImage from './images/background.png';
import Cursor from './cursor';
import ProjectsList from './views/projectsList';
import Home from './views/home';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import Project from './views/project';
import { useState, useEffect, useRef } from 'react';
import Footer from './components/footer';
import LogoSVG from './images/Logo Symbol.svg';

const Logo = () => {
  return (
    <div className='nav'>
      <Link to="/portfolio">
        <img src={LogoSVG} />
      </Link>
    </div>
  )
}
function App() {
  const location = useLocation();
  const footerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);


  useEffect(() => {
    // Add touch-device class to the body if it's a touch device
    const handleResize = () => {
      // Detect if the device is a touch device
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchDevice);
      // Add or remove the 'touch-device' class to the body
      document.body.classList.toggle('touch-device', touchDevice);
    };
    handleResize();

  }, []);

  return (
    <div className="App"  >
      
      <Cursor />
      {!location.pathname.includes('/portfolio') && !location.pathname.includes('/project/') && <Logo />}
      <Routes>
        <Route path="/portfolio" element={<Home />} />
        <Route path="/projects" element={<ProjectsList footerRef={footerRef} />} />
        <Route path="/project/:projectID" element={<Project />} />
        <Route path="*" element={<Navigate to="/portfolio" />} />
      </ Routes>
      <Footer ref={footerRef} />

    </div>
  );
}

export default App;
