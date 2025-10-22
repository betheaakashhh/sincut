import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('');

  // API base URL - adjust if your backend is on different port
  const API_BASE = 'http://localhost:5000';

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching photos from backend...');
        const response = await fetch(`${API_BASE}/api/photos`);
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Photos data received:', data);
        
        setPhotos(data.photos || []);
        setDataSource(data.source || '');
        
        if (data.message) {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError(`Connection failed: ${error.message}`);
        // Use fallback dummy data
        setPhotos(getDummyPhotos());
        setDataSource('sample');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Dummy data fallback
  const getDummyPhotos = () => [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400&h=500&fit=crop",
      width: 400,
      height: 500,
      title: "Sunset Meditation",
      category: "Nature"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=600&h=400&fit=crop",
      width: 600,
      height: 400,
      title: "Mountain Peace",
      category: "Landscape"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=500&fit=crop",
      width: 300,
      height: 500,
      title: "Serene Waters",
      category: "Water"
    }
  ];

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="photo-gallery-container">
        <div className="gallery-header">
          <h1>Moments of Peace</h1>
          <p>Loading your visual journey...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Connecting to gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-gallery-container">
      <div className="gallery-header">
        <h1>Moments of Peace</h1>
        <p>Visual journey towards inner peace and mindfulness</p>
        <div className="header-stats">
          <span>📸 {photos.length} moments captured</span>
          <span>🌿 Find your peace</span>
          {dataSource && (
            <span className="data-source">
              {dataSource === 'cloudinary' ? '☁️ Cloudinary' : '📷 Sample'}
            </span>
          )}
        </div>
        
        {dataSource === 'cloudinary' && (
          <div className="success-message">
           Photos from the corners of the world where peace remains untouched.
          </div>
        )}
      </div>

      <div className="photo-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`photo-item ${photo.width > photo.height ? 'wide' : photo.height > photo.width ? 'tall' : 'square'}`}
            onClick={() => openModal(photo)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
            />
            <div className="photo-overlay">
              <div className="photo-info">
                <h4>{photo.title}</h4>
                <span className="category">{photo.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            <div className="modal-info">
              <h3>{selectedPhoto.title}</h3>
              <span className="category-badge">{selectedPhoto.category}</span>
              {dataSource === 'cloudinary' && (
                <div className="cloudinary-badge">☁️ Cloudinary</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="setup-info">
  <h3>📁 Cloudinary Status</h3>
  <div className="setup-steps">
    {dataSource === 'cloudinary' ? (
      <div className="status-success">
        <p>✨ These images capture real moments and emotions from around the world.</p>
        <p>If you have any doubts or want clarification, please reach out via the <strong>Contact</strong> section in the navbar.</p>
      </div>
    ) : (
      <div className="status-warning">
        <p>⚠️ Currently showing sample images.</p>
        <p>You can add your own images via Cloudinary to replace these samples.</p>
      </div>
    )}
    <div className="debug-link">
      📸 Embrace the serenity captured in each frame. Let these moments guide you to inner peace and mindfulness.
    </div>
  </div>
</div>
      <div className="footer-note">
        <div className="note-content">
          <a href={`${API_BASE}/api/cloudinary-debug`} target="_blank" rel="noopener noreferrer">
        🔧 Cloudinary Debug Info (for developers)
      </a>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;