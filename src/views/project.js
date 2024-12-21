import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projects from '../projects.json'; // Import the JSON data
import './project.css';
import LogoSVG from '../images/Logo Symbol.svg';

export default function Project() {
    const { projectID } = useParams();
    const [project, setProject] = useState(null);
    const [mobileImages, setMobileImages] = useState([]);
    const [desktopImages, setDesktopImages] = useState([]);
    const [toolsColumns, setToolsColumns] = useState(2);
    const [toolsImages, setToolsImages] = useState([]);

    useEffect(() => {
        const foundProject = projects.find(p => p.id === +projectID);
        if (foundProject) {
            // Dynamically import the logo
            import(`../images/projects/logos/${projectID}.svg`)
                .then(logo => {
                    setProject({ ...foundProject, logo: logo.default });
                })
                .catch(err => {
                    console.error('Image not found', err);
                    setProject(foundProject);
                });

            // Dynamically import mobile images
            if (foundProject.mobile_project_images) {
                Promise.all(
                    foundProject.mobile_project_images.map(item =>
                        import(`../images/projects/mobile/${projectID}/${item.id}.png`)
                            .then(image => ({ ...item, src: image.default }))
                            .catch(err => {
                                console.error('Image not found', err);
                                return { ...item, src: null };
                            })
                    )
                ).then(images => setMobileImages(images));
            }

            // Dynamically import desktop images
            if (foundProject.desktop_project_images) {
                Promise.all(
                    foundProject.desktop_project_images.map(item =>
                        import(`../images/projects/desktop/${projectID}/${item.id}.png`)
                            .then(image => ({ ...item, src: image.default }))
                            .catch(err => {
                                console.error('Image not found', err);
                                return { ...item, src: null };
                            })
                    )
                ).then(images => setDesktopImages(images));
            }
            const numItems = foundProject.tools.length;
            if (numItems <= 4) {
                setToolsColumns(2);
            } else if (numItems <= 6) {
                setToolsColumns(3);
            } else {
                setToolsColumns(4);
            }

            Promise.all(
                foundProject.tools.map(item =>
                    import(`../images/tools/${item.identifier}.svg`)
                        .then(image => ({ ...item, src: image.default }))
                        .catch(err => {
                            console.error('Image not found', err);
                            return { ...item, src: null };
                        })
                )
            ).then(images => setToolsImages(images));

        }
    }, [projectID]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='nav project-nav'>
                <Link to="/portfolio">
                    <img src={LogoSVG} alt="Logo" />
                </Link>
                <p>PAH</p>
            </div>
            <div className='wrapper project-page'>
                <div>
                    <img className='logo' src={project.logo} alt={`${project.title} logo`} />
                    <p className='branding-description'>{project.branding_description}</p>
                </div>
                <div className='branding'>
                    branding
                    vai precisar de trabalho
                </div>
                <p className='interface-description'>{project.interface_description}</p>
                {mobileImages.map((item, index) => (
                    item.paragraph && (
                        <div className='mobile' key={index}>
                            <div className='image-container'> <img src={item.src} alt={item.title} /></div>

                            <div className='item-description'>
                                <h2>{item.title}</h2>
                                <p>{item.paragraph}</p>
                            </div>
                        </div>
                    )
                ))}
                {desktopImages.map((item, index) => (
                    item.paragraph && (
                        <div className='desktop' key={index}>
                            {item.src && <img src={item.src} alt={item.title} />}
                            <div>
                                <h2>{item.title}</h2>
                                <p>{item.paragraph}</p>
                            </div>
                        </div>
                    )
                ))}
                <div className='tools'>
                    <h2>Software i used</h2>
                    <div className='tools-grid' style={{ gridTemplateColumns: `repeat(${toolsColumns}, 1fr)` }}>
                        {toolsImages.map((tool, index) => (
                            <div key={index}>
                                <div classname='image-container'>
                                    <img src={tool.src} alt={tool.name + " Logo"} />
                                </div>
                                {tool.identifier === 'figma' ? <a className='tool-name' href='https://www.google.pt' target="_blank" title="Check Figma File">{tool.name}</a> : <p className='tool-name'>{tool.name}</p>}


                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

