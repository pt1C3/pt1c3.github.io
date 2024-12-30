import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './projectsList.css';
import Tilt from 'react-parallax-tilt';
import { Helmet } from 'react-helmet';
import projects from '../projects.json'; // Import the JSON data


const categories = ["Branding", "UI/UX", "Other"];

// Function to import and sort images from a directory
const importAllThumbnails = (r) => {
  let images = {};
  r.keys().forEach((item) => {
    // Extract the base filename without the extension
    const key = item.replace('./', '').split('.')[0];
    images[key] = r(item);
  });

  // Sort keys numerically
  const sortedKeys = Object.keys(images).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  // Return an object with sorted keys
  const sortedImages = {};
  sortedKeys.forEach((key) => {
    sortedImages[key] = images[key];
  });

  return sortedImages;
};

// Import images from the 'images' directory
const thumbnails = importAllThumbnails(require.context('../images/projects/thumbnails', false, /\.(png|jpe?g|svg|webp)$/));

const BottomNav = ({ selectedCategories, onSelectCategory, footerRef }) => {
  useEffect(() => {
    const adjustBottomBarPosition = () => {
      const bottomBar = document.querySelector('.bottom-bar');
      const footer = footerRef.current;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top < viewportHeight) {
        bottomBar.style.bottom = `${viewportHeight - footerRect.top}px`; // 16px for some padding
      } else {
        bottomBar.style.bottom = '0';
      }
    };

    window.addEventListener('scroll', adjustBottomBarPosition);
    window.addEventListener('resize', adjustBottomBarPosition);
    adjustBottomBarPosition();

    return () => {
      window.removeEventListener('scroll', adjustBottomBarPosition);
      window.removeEventListener('resize', adjustBottomBarPosition);
    };
  }, [footerRef]);

  return (
    <div className="bottom-bar">
      {categories.map((category) => (
        <Link
          key={category}
          to=""
          className={selectedCategories.includes(category) ? "selected" : ""}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default function ProjectsList({ footerRef }) {
  // Check if its a touch device, where hover effects are not available
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  // Reference to the projects grid, so that we can observe the project cards, and show project info without hover
  const projectsGridRef = useRef(null);

  // Selected project category
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State to track loaded images
  const [loadedImages, setLoadedImages] = useState({});

  // Handle project category selection
  const handleSelectCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  // Handle image load, so the images arent reloaded when changing categories
  const handleImageLoad = (id) => {
    setLoadedImages((prevLoadedImages) => ({
      ...prevLoadedImages,
      [id]: true,
    }));
  };

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

  useEffect(() => {
    if (!isTouchDevice) return;

    // Use Intersection Observer to detect when elements are fully visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('show-info');
            }, 100); // Delay to trigger a little after it's completely visible
          } else {
            entry.target.classList.remove('show-info');
          }
        });
      },
      { threshold: 1.0 }
    );

    // Get all project cards and observe them
    const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
    projectCards.forEach((card) => observer.observe(card));

    return () => {
      projectCards.forEach((card) => observer.unobserve(card));
    };
  }, [isTouchDevice]);

  // Transform an array of categories into a string
  function categoriesToString(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return '';
    }
    return arr.join(' & ');
  }



  const filteredProjects = selectedCategories.length === 0
    ? projects
    : projects.filter((project) =>
      selectedCategories.every((category) => project.categories.includes(category))
    );

  return (
    <>
      <Helmet> <title>Projects - 1C3 | Rafael Silva</title></Helmet>
      <div className="wrapper projects-list">
        <header className='header'>
          <h1 className='title'>Projects</h1>
          <p className='subtitle'>A portfolio of <span>thoughtfully</span> crafted designs with purpose and poise.</p>
        </header>
        <section className='grid-container'>
          <div className='projects-grid' ref={projectsGridRef}>
            {
              filteredProjects.map((item) => (
                thumbnails[item.id] && ( // If it has thumbnail image
                  <Tilt
                  tiltReverse={true}
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  perspective={1600}
                  transitionSpeed={1600}
                  gyroscope={true}
                  glareEnable={false}
                  easing="cubic-bezier(.03,.98,.52,.99)"
                    key={item.id}>
                    <Link to={"/project/" + item.id} className='project-card'>
                      <img
                        src={thumbnails[item.id]}
                        alt={item.title}
                        onLoad={() => handleImageLoad(item.id)} // Handle image load
                        style={{ display: loadedImages[item.id] ? 'block' : 'none' }} // Show image only when loaded
                      />
                      {!loadedImages[item.id] && <div className="image-placeholder">Loading...</div>}
                      <div className='info'>
                        <h2 className='title'>{item.title}</h2>
                        <h4 className='category'>{categoriesToString(item.categories)}</h4>
                        <hr className='divider' />
                        <p className='description'>{item.description}</p>
                      </div>
                    </Link>
                  </Tilt>
                )

              ))
            }
          </div>
        </section>
      </div>
      <BottomNav selectedCategories={selectedCategories} onSelectCategory={handleSelectCategory} footerRef={footerRef} />
    </>
  )
}