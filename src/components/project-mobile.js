import React from 'react';

export default function ProjectMobile({ item }) {
    return (
        <div className='mobile'>
            <div className='image-container'>
                <img src={item.src} alt={item.title} />
            </div>
            <div className='item-description'>
                <h2>{item.title}</h2>
                <p>{item.paragraph}</p>
            </div>
        </div>
    );
};

