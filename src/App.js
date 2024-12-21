import './App.css';
import bgImage from './images/background.png';
import Cursor from './cursor';
import Content from './views/content';
import ProjectsList from './views/projectsList';
import Home from './views/home';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import Project from './views/project';
import { useEffect, useRef } from 'react';
import GrainOverlay from "./components/grain";
import Footer from './components/footer';
import LogoSVG from './images/Logo Symbol.svg';

const Logo = () => {
  return (
    <div className='nav'>
      <Link to="/home">
        <img src={LogoSVG} />
      </Link>
    </div>
  )
}
function App() {
  const location = useLocation();
  const footerRef = useRef(null);

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/*<GrainOverlay />*/}
      <Cursor />
      {location.pathname !== '/portfolio' && !location.pathname.includes('/project/') && <Logo />}
      <Routes>
        <Route exact path="/portfolio" element={<Home />} />
        <Route exact path="/projects" element={<ProjectsList footerRef={footerRef} />} />
        <Route exact path='/contact' element={<Content />} />
        <Route exact path="/project/:projectID" element={<Project />} />
      </ Routes>
      <Footer ref={footerRef} />

    </div>
  );
}

export default App;
