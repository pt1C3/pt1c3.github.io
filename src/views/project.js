import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import projects from '../projects.json'; // Import the JSON data
import './project.css';
import Logo from '../images/Logo Symbol.svg';
import ProjectMobile from '../components/project-mobile';
import ProjectDesktop from '../components/project-desktop';
import { Helmet } from 'react-helmet';
import Arrow from '../images/arrow.svg';
import Menu from '../images/menu.svg';

import Tilt from 'react-parallax-tilt';

export default function Project() {
    const { projectID } = useParams();
    const [project, setProject] = useState();
    const [toolsColumns, setToolsColumns] = useState(2);
    const [currentBrandingIndex, setCurrentBrandingIndex] = useState(0);

    useEffect(() => {
        const foundProject = projects.find(p => p.id === +projectID);
        if (foundProject) {

            // Function to dynamically import images
            const importImage = async (path) => {
                try {
                    const image = await import(`../${path}`);
                    return image.default;
                } catch (err) {
                    return null;
                }
            };

            const promises = [];
            promises.push(
                importImage(`images/projects/logos/${projectID}.svg`).then(logo => {
                    foundProject.logo = logo;
                })
            );

            // Import branding images if it's a Branding project
            if (foundProject.categories?.includes('Branding')) {
                if (!foundProject.branding) {
                    foundProject.branding = [];
                    for (let i = 0; i < foundProject.branding_amount; i++) {
                        promises.push(
                            importImage(`images/projects/branding/${projectID}/${i}.webp`).then(image => {
                                foundProject.branding.push(image);
                            })
                        );
                    }
                }
            }

            // Import mobile images if it's a UI/UX project
            if (foundProject.categories?.includes('UI/UX')) {
                if (foundProject.mobile_project_images) {
                    promises.push(
                        Promise.all(
                            foundProject.mobile_project_images.map(item =>
                                importImage(`images/projects/mobile/${projectID}/${item.id}.webp`).then(src => ({
                                    ...item,
                                    src
                                }))
                            )
                        ).then(images => {
                            foundProject.mobile_project_images = images;
                        })
                    );
                }

                // Import desktop images
                if (foundProject.desktop_project_images) {
                    promises.push(
                        Promise.all(
                            foundProject.desktop_project_images.map(item =>
                                importImage(`images/projects/desktop/${projectID}/${item.id}.webp`).then(src => ({
                                    ...item,
                                    src
                                }))
                            )
                        ).then(images => {
                            foundProject.desktop_project_images = images;
                        })
                    );
                }
            }

            // Import other image if it's an "Other" category project
            if (foundProject.categories?.includes('Other')) {
                promises.push(
                    importImage(`images/projects/other/${projectID}.webp`).then(otherImage => {
                        foundProject.otherImage = otherImage;
                    })
                );
            }

            // Determine the number of columns for tools
            const numItems = foundProject.tools.length;
            if (numItems <= 4) {
                setToolsColumns(2);
            } else if (numItems <= 6) {
                setToolsColumns(3);
            } else {
                setToolsColumns(4);
            }

            // Import tool images
            promises.push(
                Promise.all(
                    foundProject.tools.map(item =>
                        importImage(`images/tools/${item.identifier}.svg`).then(src => ({
                            ...item,
                            src
                        }))
                    )
                ).then(images => {
                    foundProject.tools = images;
                })
            );

            Promise.all(promises).then(() => {
                setProject(foundProject);
                console.log(foundProject);
            });
        }
    }, [projectID]);

    const handleNextBrandingImage = () => {
        setCurrentBrandingIndex((prevIndex) => (prevIndex + 1) % project.branding.length);
    };

    const handlePreviousBrandingImage = () => {
        setCurrentBrandingIndex((prevIndex) => (prevIndex - 1 + project.branding.length) % project.branding.length);
    };

    if (!project) {
        return <div className="text-center">Loading...</div>;
    }

    function changeProject(bool) {
        if (bool) {
            if (+projectID + 1 <= projects.length) {
                return +projectID + 1;
            } else {
                return 1;
            }
        } else {
            if (+projectID - 1 !== 0) {
                return +projectID - 1;
            } else {
                return projects.length;
            }
        }
    }


    return (
        <>
            <Helmet><title>{project.title + " - 1C3"}</title> </Helmet>
            <div className='nav project-nav'>
                    <Link to="/portfolio">
                        <img src={Logo} alt="Logo" />
                    </Link>

                    <div className='projects-nav'><Link to={'/project/' + changeProject(false)}><img src={Arrow} alt='Go to the previous project' /> Previous</Link> <Link to="/projects"><img src={Menu} alt='Go to projects' /></Link><Link to={'/project/' + changeProject(true)}>Next <img src={Arrow} alt='Go to the next project' /></Link></div>
            </div>
            <div className='wrapper project-page'>
                <div>
                    {project.logo ?
                        <img className='logo' src={project.logo} alt={`${project.title} logo`} /> : <h1 className='text-center'>{project.title}</h1>}
                    <p className='branding-description'>{project.branding_description}</p>
                </div>
                {project.categories?.includes('Branding') && <div className='branding'>
                    <Tilt
                        tiltReverse={true}
                        tiltMaxAngleX={0}
                        tiltMaxAngleY={12}
                        perspective={1600}
                        transitionSpeed={1600}
                        gyroscope={true}
                        glareEnable={false}
                        tiltAxis="y"
                        easing="cubic-bezier(.03,.98,.52,.99)"
                    >
                        <img className='branding-image' src={project.branding[currentBrandingIndex]} alt={`${project.title} branding sample ${currentBrandingIndex + 1}`} />
                        <button className='left' onClick={handlePreviousBrandingImage}><img src={Arrow} alt='Check previous branding sample' /> </button>
                        <button className='right' onClick={handleNextBrandingImage}><img src={Arrow} alt='Check next branding sample' /> </button>

                    </Tilt>
                    <div className='branding-indicators'>
                        {project.branding.map((_, index) => (
                            <div
                                key={index}
                                className={`indicator ${index === currentBrandingIndex ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>
                </div>}
                {project.categories?.includes('Other') && <div className='other'>
                    <img src={project.otherImage} alt={project.title} />
                </div>}
                {(project.mobile_project_images || project.desktop_project_images) && <p className='interface-description'>{project.interface_description}</p>}

                {project.mobile_project_images?.map((item, index) => (
                    item.paragraph && (
                        <ProjectMobile key={index} item={item} />
                    )
                ))}
                {project.desktop_project_images?.map((item, index) => (
                    item.paragraph && (
                        <ProjectDesktop key={index} item={item} />
                    )
                ))}
                <div className='tools'>
                    <h2>Software i used</h2>
                    <div className='tools-grid' style={{ gridTemplateColumns: `repeat(${toolsColumns}, 1fr)` }}>
                        {project.tools?.map((tool, index) => (
                            <div key={index}>
                                <div className='image-container'>
                                    <img src={tool.src} alt={tool.name + " Logo"} />
                                </div>
                                {tool.identifier === 'figma' ? <a className='tool-name' href={tool.figma_link} target="_blank" title="Check Figma File" rel="noreferrer">{tool.name}</a> : <p className='tool-name'>{tool.name}</p>}
                                {tool.comment && <p className='comment'>{tool.comment}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

