import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import '../../styles/index.scss';

const ServiceDetails = ({ serviceId }) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails(serviceId);
    } else {
      setServiceDetails(null);
    }
  }, [serviceId]);

  const fetchServiceDetails = async (id) => {
    try {
      setLoading(true);
      const response = await apiService?.getServiceDetails(id);
      
      let details = null;
      if (response?.Service && Array.isArray(response.Service) && response.Service.length > 0) {
        details = {
          ...response.Service[0],
          ServiceFeatures: response.ServiceFeatures || [],
          ServiceImages: response.ServiceImages || []
        };
      } else if (response) {
        details = response;
      }
      
      setServiceDetails(details);
    } catch (error) {
      console.error('Error fetching service details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!serviceId) {
    return (
      <section className="service-details">
        <div className="service-details__container">
          <h2 className="service-details__title">Service Detail</h2>
          <div className="service-details__placeholder">
            Select a service to view details
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="service-details">
        <div className="service-details__container">
          <h2 className="service-details__title">Service Detail</h2>
          <div className="loading-state">
            Loading service details...
          </div>
        </div>
      </section>
    );
  }

  if (!serviceDetails) {
    return (
      <section className="service-details">
        <div className="service-details__container">
          <h2 className="service-details__title">Service Detail</h2>
          <div className="empty-state">
            Service details not available
          </div>
        </div>
      </section>
    );
  }

  const serviceName = serviceDetails?.ServiceName || 'Premium Deep Cleaning';
  const servicePrice = serviceDetails?.BasePrice || serviceDetails?.Price || 329.99;
  const serviceDescription = serviceDetails?.Description || 'Our Premium Deep Cleaning service is a top-to-bottom intensive cleaning solution designed to restore the freshness, hygiene, and appearance of your home or office. It goes far beyond regular cleaning and is ideal for move-ins/outs, seasonal cleaning, post-renovation, or deep sanitization.';
  const serviceDuration = serviceDetails?.EstimatedDuration || '3-4 hours';
  const teamSize = serviceDetails?.TeamSize || '2-3 Cleaners';
  const propertyType = serviceDetails?.PropertyType || '1 BR';
  
  const primaryImage = serviceDetails?.PrimaryImage || 
    (serviceDetails?.ServiceImages && serviceDetails.ServiceImages.length > 0 
      ? serviceDetails.ServiceImages[0]?.ImageURL 
      : '/images/img_pexels_karolina_250x540.png');
  
  const getImageUrl = (img) => {
    if (!img) return '/images/img_pexels_karolina_250x540.png';
    if (img.startsWith('http')) return img;
    if (img.startsWith('/public/')) return `https://o24living.com${img}`;
    return img;
  };

  const inclusions = [
    'a. Bedrooms & Living Areas',
    'b. Kitchen',
    'c. Bathrooms',
    'd. Extras (upon request or additional charge)'
  ];

  return (
    <section className="service-details">
      <div className="service-details__container">
        <h2 className="service-details__title">Service Detail</h2>
        
        <div className="service-details__content">
          <div className="service-details__header">
            <h3 className="service-details__service-name">
              {serviceName}
            </h3>
            <div className="service-details__price">
              <span className="currency-symbol"><img src="./images/Dhinar.png" alt="" /></span>
              <span>{servicePrice}</span>
            </div>
          </div>
          
          <div className="service-details__image">
            <img
              src={getImageUrl(primaryImage)}
              alt={serviceName}
              onError={(e) => {
                e.target.src = '/images/img_pexels_karolina_250x540.png';
              }}
            />
          </div>
          
          <div className="service-details__section">
            <p className="service-details__section-title">Service Description:</p>
            <p className="service-details__description">
              {serviceDescription}
            </p>
          </div>
          
          <div className="service-details__section">
            <p className="service-details__section-title">Service Timing & Duration:</p>
            <div className="service-details__table">
              <div className="service-details__table-header">
                <span>Property Type</span>
                <span>Estimated Duration</span>
                <span>Team Size</span>
              </div>
              <div className="service-details__table-row">
                <span>{propertyType}</span>
                <span>{serviceDuration}</span>
                <span>{teamSize}</span>
              </div>
            </div>
          </div>
          
          <div className="service-details__section">
            <p className="service-details__section-title">What's Included:</p>
            <ul className="service-details__inclusions">
              {inclusions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <button className="service-details__add-button" onClick={() => console.log('Add to cart:', serviceId)}>
           <img src="/images/Add.png" /> ADD
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;