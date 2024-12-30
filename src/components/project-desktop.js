import React from 'react';

export default function ProjectDesktop({ item, key }) {
    return (
        <div className='desktop' key={key}>
            {item.src && <img src={item.src} alt={item.title} />}
            <div>
                <h2>{item.title}</h2>
                <p>{item.paragraph}</p>
            </div>
        </div>
    );
};

