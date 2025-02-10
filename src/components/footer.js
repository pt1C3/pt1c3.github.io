import React, { useState, useEffect } from 'react';
import './footer.css';
import projects from '../projects.json';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../images/Logo.svg';
import email from '../images/contacts/email.svg';
import linkedin from '../images/contacts/linkedin.svg';
import github from '../images/contacts/github.svg';
import instagram from '../images/contacts/instagram.svg';
import behance from '../images/contacts/behance.svg';
import Loader from './loader';
const Footer = React.forwardRef((props, ref) => {
  const projectID = 1;
  const [project, setProject] = useState(null);
  useEffect(() => {
    const foundProject = projects.find(p => p.id === +projectID);

    if (foundProject) {
      // Initialize project state with found project
      setProject(foundProject);

      // Dynamically import the logo
      import(`../images/projects/logos/${projectID}.svg`)
        .then(logo => {
          setProject(prevProject => ({ ...prevProject, logo: logo.default }));
        })
        .catch(err => {
          console.error('Logo not found', err);
        });

      // Dynamically import the thumbnail
      import(`../images/projects/thumbnails/${projectID}.webp`)
        .then(thumbnail => {
          setProject(prevProject => ({ ...prevProject, thumbnail: thumbnail.default }));
        })
        .catch(err => {
          console.error('Thumbnail not found', err);
        });
    }
  }, [projectID]);

  function categoriesToString(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return '';
    }
    return arr.join(' & ');
  }

  return (
    <footer ref={ref}>
      <div>
        <h1>Contact me!</h1>
        <a href="mailto:rafaelsilva1c3@gmail.com" target='_blank' rel="noreferrer">
          <img src={email} alt='Email icon' />
          <p>rafaelsilva1c3@gmail.com</p>
        </a>
        <a href="https://linkedin.com/in/rafaelsilva1c3" target='_blank' rel="noreferrer">
          <img src={linkedin} alt='Linkedin icon' />
          <p>/in/rafaelsilva1c3</p>
        </a>
        <a href="https://github.com/pt1c3" target='_blank' rel="noreferrer">
          <img src={github} alt='Github icon' />
          <p>pt1C3</p>
        </a>
        <a href="https://instagram.com/1c3pt" target='_blank' rel="noreferrer">
          <img src={instagram} alt='Instagram icon' />
          <p>1c3pt</p>
        </a>
        <a href="https://behance.com/rafaelsilva1c3" target='_blank' rel="noreferrer">
          <img src={behance} alt='Behance icon' />
          <p>rafaelsilva1c3</p>
        </a>
        <div>
          <div className='logo'>
            <img src={Logo} alt="1C3 logo" />
          </div>
          <p>
            Passionate about <span className='font-bold'>design</span>, <span className='font-bold'>development</span>, and innovation.
          </p>
        </div>
      </div>
      <div>
        <div className='footer-nav'>
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => isActive ? 'footer-nav-item selected' : 'footer-nav-item'}
          >
            home
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => isActive ? 'footer-nav-item selected' : 'footer-nav-item'}
          >
            projects
          </NavLink>
        </div>
        {!project ? <p className='font-bold'>
         <Loader /></p> : <>
          <p className='font-bold'>Featured Project</p>
          <Link to={"/project/" + projectID} className='featured-project'>
            <div className='featured-project-info'>
              <img className="prj-logo" src={project.logo} alt={`${project.title} logo`} />
              <p className='font-bold prj-categories'>{categoriesToString(project.categories)}</p>
              <p>{project.description}</p>
            </div>
            <img className="prj-thumbnail" src={project.thumbnail} alt={project.title + " thumbnail"} />
          </Link>

        </>}


      </div>

    </footer>
  );
});

export default Footer;