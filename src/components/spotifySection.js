import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './spotifySection.css'; // Import the CSS file
import AnimatedList from '../blocks/Components/AnimatedList/AnimatedList';
import spotifyLogo from '../images/contacts/spotify full.svg';

import Loader from './loader';

export default function SpotifySection({ isTouch }) {
  const [currentPlayback, setCurrentPlayback] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://portfolio-backend-one-chi.vercel.app/spotify/info');
        setCurrentPlayback(response.data.currentPlayback);
        setRecentlyPlayed(response.data.recentlyPlayed);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggle = (index) => {
    if (isTouch) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className='social-media-info'>
      <div className='spotify'>
        <img className="spotify-logo" src={spotifyLogo} alt='Spotify Logo' />
        <div className='currently-playing'>
          <p className='font-bold'>Currently playing</p>

          <div className='image-container'>
            <a href={currentPlayback.item.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img src={currentPlayback.item.album.images[1].url} alt={`${currentPlayback.item.name}' album`} />
            </a>
          </div>
          <div className='song-details'>
            <a className='font-bold' href={currentPlayback.item.external_urls.spotify} target="_blank" rel="noopener noreferrer">{currentPlayback.item.name}</a>
            <span className='artists'>
              {currentPlayback.item.artists.map((artist, index) => (
                <>
                  <a key={artist.id} href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">{artist.name}</a>
                  {index < currentPlayback.item.artists.length - 1 && ', '}
                </>
              ))}
            </span>
          </div>

        </div>
        <div className='recently-played'>
          <p className='font-bold'>Recently played</p>
          <AnimatedList
            items={recentlyPlayed}
            onItemSelect={(item, index) => window.open(item.track.external_urls.spotify, '_blank')}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
            className={"recently-played-list"}
            itemClassName={"recently-played-item"}
          />
        </div>
      </div>
    </section>
  );
}