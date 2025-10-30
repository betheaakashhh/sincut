import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('');
    const [showDebug, setShowDebug] = useState(false);


  // Dynamic API base URL - works in both local and production
  const getApiBase = () => {
    // If we're in production (deployed on Vercel), use the production backend URL
    if (process.env.NODE_ENV === 'production') {
      // Replace with your actual deployed backend URL
      return process.env.REACT_APP_BACKEND_URL || 'https://sincut-razorpay.vercel.app';
    }
    // In development, use localhost
    return 'http://localhost:5000';
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_BASE = getApiBase();
        console.log('Fetching photos from:', `${API_BASE}/api/photos`);
        
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
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
        {dataSource === 'cloudinary' && (
          <div className="success-message">
            ✅ Successfully loaded {photos.length} images from your Cloudinary account!
          </div>
        )}
        {dataSource === 'sample' && (
          <div className="warning-message">
            ℹ️ Using sample images. Check if backend is properly connected.
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

           {/* Collapsible Debug Footer */}
      <div className={`setup-footer ${selectedPhoto ? 'hidden' : ''}`}>
        <button
          className="toggle-debug-btn"
          onClick={() => setShowDebug((prev) => !prev)}
        >
          {showDebug ? ' Hide' : 'Get to Know About Images'}
        </button>

        {showDebug && (
          <div className="setup-info">
            <h3>Gallery Information</h3>
            <div className="setup-steps">
              <p><strong>Environment:</strong> {process.env.NODE_ENV || 'development'}</p>
              <p><strong>Backend URL:</strong> {getApiBase()}</p> 
              <p>Our gallery showcases real and authentic photographs captured from genuine moments.
These images are for display and inspiration purposes only and are copyright protected.</p>
              
              
              {dataSource === 'cloudinary' ? (
                <div className="status-success">
                  <p>✅ <strong>Cloudinary is connected and working!</strong></p>
                  <p>All photos displayed in this gallery are authentic and original. These images are protected by copyright, and unauthorized use or reproduction is strictly prohibited.</p>
                  <p>Thank you for respecting the creative rights of photographers and artists.</p>
                  <p>If you have any questions, clarifications, or suggestions regarding the images, please reach out to us through the Contact section available in the navbar.</p>
                  
                  
                </div>
              ) : (
                <div className="status-warning">
                  <p>⚠️ <strong>Using sample images</strong></p>
                  <p>This usually means:</p>
                  <ul>
                    <li>Backend is not deployed or not accessible</li>
                    <li>Backend URL is incorrect in production</li>
                    <li>Cloudinary credentials are missing in production</li>
                  </ul>
                </div>
              )}
              
              <div className="debug-links">
                <a href={`${getApiBase()}/api/cloudinary-debug`} target="_blank" rel="noopener noreferrer">
                  🔧 Check Backend Connection
                </a>
                <a href={`${getApiBase()}/api/photos`} target="_blank" rel="noopener noreferrer">
                  📸 Test Photos Endpoint
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default PhotoGallery;