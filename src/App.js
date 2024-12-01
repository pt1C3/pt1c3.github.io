import './App.css';
import bgImage from './images/background.png';
import Cursor from './cursor';
import Content from './views/content';
import ProjectsList from './views/projectsList';
import Home from './views/home';
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Project10 from './views/projects/10';
import { useEffect } from 'react';
import GrainOverlay from "./components/grain";

const Logo = () => {
  return (
    <div className='logo'>
      <Link to="/">RAFAEL SILVA</Link>
    </div>
  )
}
function App() {
  const location = useLocation();

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}
    >
      <GrainOverlay />
      <Cursor />
      {location.pathname !== '/' && ( // se não estiver na home, mostra o logo
        <Logo />

      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path='/contact' element={<Content />} />
        <Route path="/project/10" element={<Project10 />} />
      </ Routes>

    </div>
  );
}

export default App;
