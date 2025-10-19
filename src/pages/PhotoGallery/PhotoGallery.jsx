import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Dummy data - Replace with your Cloudinary API data
  const dummyPhotos = [
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
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
      width: 500,
      height: 300,
      title: "Forest Path",
      category: "Nature"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
      width: 400,
      height: 600,
      title: "Mist Mountains",
      category: "Landscape"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&h=400&fit=crop",
      width: 500,
      height: 400,
      title: "Autumn Colors",
      category: "Nature"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=400&fit=crop",
      width: 300,
      height: 400,
      title: "Waterfall",
      category: "Water"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=500&fit=crop",
      width: 600,
      height: 500,
      title: "Valley View",
      category: "Landscape"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=400&h=300&fit=crop",
      width: 400,
      height: 300,
      title: "Ocean Waves",
      category: "Water"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=500&h=600&fit=crop",
      width: 500,
      height: 600,
      title: "Forest Light",
      category: "Nature"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPhotos(dummyPhotos);
      setLoading(false);
    }, 1000);
  }, []);

  // Cloudinary Integration Example (Uncomment when ready)
  /*
  useEffect(() => {
    const fetchCloudinaryPhotos = async () => {
      try {
        // Replace with your Cloudinary cloud name and folder
        const response = await fetch(
          `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/list/YOUR_FOLDER.json`
        );
        const data = await response.json();
        
        const photos = data.resources.map((resource, index) => ({
          id: resource.public_id,
          src: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_800/${resource.public_id}.${resource.format}`,
          width: resource.width,
          height: resource.height,
          title: resource.context?.custom?.caption || `Photo ${index + 1}`,
          category: resource.context?.custom?.category || 'General'
        }));
        
        setPhotos(photos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchCloudinaryPhotos();
  }, []);
  */

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
          <p>Visual journey towards inner peace</p>
        </div>
        <div className="loading-spinner">
          
          <div className="spinner"></div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="photo-gallery-container">
      {/* Header */}
      <div className="gallery-header">
        <h1>Moments of Peace</h1>
        <p>Visual journey towards inner peace and mindfulness</p>
        <div className="header-stats">
          <span>📸 {photos.length} moments captured</span>
          <span>🌿 Find your peace</span>
        </div>
      </div>

      {/* Photo Grid */}
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

      {/* Modal for enlarged view */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            <div className="modal-info">
              <h3>{selectedPhoto.title}</h3>
              <span className="category-badge">{selectedPhoto.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Cloudinary Setup Instructions */}
      <div className="setup-info">
        <h3>💡 How to Connect Cloudinary</h3>
        <div className="setup-steps">
          <p>1. Create a free account at <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer">cloudinary.com</a></p>
          <p>2. Upload your photos to Cloudinary dashboard</p>
          <p>3. Replace the dummy data with the Cloudinary API code above</p>
          <p>4. Your photos will appear here automatically!</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;