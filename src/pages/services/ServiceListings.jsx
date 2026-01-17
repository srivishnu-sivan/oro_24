import React from 'react';
import Pagination from '../../components/ui/Pagination';
import '../../styles/index.scss';

const ServiceListings = ({
  services = [],
  loading,
  onServiceSelect,
  pageNumber,
  pageSize,
  totalPages,
  onPageChange,
  selectedServiceId
}) => {
  const defaultServices = [
    {
      ServiceID: 1,
      ServiceName: 'Premium Deep Cleaning',
      BasePrice: 329.99,
      PrimaryImage: '/images/img_pexels_karolina_168x174.png',
      EstimatedDuration: '5-6 hours',
      PropertyType: 'Studio',
      TeamSize: '3 Cleaners',
      Description: 'Deep clean with single disc machine & upholstery dry vacuuming.',
    },
    {
      ServiceID: 2,
      ServiceName: 'Basic Deep Cleaning',
      BasePrice: 329.99,
      PrimaryImage: '/images/img_pexels_mathilde_18278210.png',
      EstimatedDuration: '5-6 hours',
      PropertyType: '1 BR',
      TeamSize: '3 Cleaners',
      Description: 'Deep clean with single disc machine & upholstery dry vacuuming.',
    },
    {
      ServiceID: 3,
      ServiceName: 'Eco-Friendly Deep Cleaning',
      BasePrice: 329.99,
      PrimaryImage: '/images/img_pexels_karolina_168x174.png',
      EstimatedDuration: '5-6 hours',
      PropertyType: 'Studio',
      TeamSize: '3 Cleaners',
      Description: 'Deep clean with single disc machine & upholstery dry vacuuming.',
    },
  ];

  const displayServices = services?.length > 0 ? services : defaultServices;

  if (loading) {
    return (
      <section className="service-listings">
        <h2 className="service-listings__title">Service Type</h2>
        <div className="loading-state">
          Loading services...
        </div>
      </section>
    );
  }

  if (!loading && services.length === 0) {
    return (
      <section className="service-listings">
        <h2 className="service-listings__title">Service Type</h2>
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="empty-state__title">No Services Found</h3>
          <p className="empty-state__message">Try selecting a different category</p>
        </div>
      </section>
    );
  }

  return (
    <section className="service-listings">
      <h2 className="service-listings__title">Service Type</h2>
      <div className="service-listings__list">
        {displayServices.map((service) => {
          const serviceId = service?.ServiceID || service?.id;
          const serviceName = service?.ServiceName || service?.title;
          const servicePrice = service?.BasePrice || service?.Price || service?.price;
          const serviceImage = service?.PrimaryImage || service?.Image || service?.image;
          const serviceDuration = service?.EstimatedDuration || service?.Duration || service?.duration;
          const propertyType = service?.PropertyType || 'Studio';
          const teamSize = service?.TeamSize || '3 Cleaners';
          const serviceDescription = service?.Description || '';
          const isSelected = selectedServiceId === serviceId;

          const getImageUrl = (img) => {
            if (!img) return '/images/img_pexels_karolina_168x174.png';
            if (img.startsWith('http')) return img;
            if (img.startsWith('/public/')) return `https://o24living.com/${img}`;
            return img;
          };

          const getBadgeType = () => {
            if (serviceName.includes('Premium')) return 'Premium';
            if (serviceName.includes('Basic')) return 'Basic';
            if (serviceName.includes('Eco-Friendly')) return 'Eco-Friendly';
            if (parseFloat(servicePrice) > 200) return 'Premium';
            return '';
          };

          const badgeType = getBadgeType();

          return (
            <div
              key={serviceId}
              onClick={() => onServiceSelect?.(serviceId)}
              className={`service-listings__card ${isSelected ? 'service-listings__card--active' : ''}`}
            >
              <div className="service-listings__card-inner">
                <div className="service-listings__card-image">
                  <img
                    src={getImageUrl(serviceImage)}
                    alt={serviceName}
                    onError={(e) => {
                      e.target.src = '/images/img_pexels_karolina_168x174.png';
                    }}
                  />
                  {badgeType && (
                    <div className={`service-listings__card-badge badge--${badgeType.toLowerCase()}`}>
                      {badgeType}
                    </div>
                  )}
                </div>

                <div className="service-listings__card-content">
                 
                 <div className='service-listings__card-Alltitle'>
                      <h3 className="service-listings__card-title">
                    {serviceName}
                  </h3>

                  <p className="service-listings__card-description">
                    {serviceDescription}
                  </p>
                 </div>

                  <div className="service-listings__card-price-section">
                    <p className="service-listings__card-from">From only*</p>
                    <div className="service-listings__card-price">
                         <img src="/images/Dhinar.png" alt="" /> {parseFloat(servicePrice).toFixed(2)}
                    </div>

                               <button className="service-listings__card-btn">
                    <img src="/images/Add.png"/> ADD
                  </button>
                
                  </div>
               

              
                </div>
              </div>

              <div className="service-listings__card-chips">
                <div className="chip">
                  <img src="/images/clock.png" alt="" srcset="" /> Duration: {serviceDuration}
                </div>
                <div className="chip">
                 <img src="/images/userBlack.png" alt="" srcset="" />  {teamSize} Cleaners
                </div>
                <div className="chip">
                 <img src="/images/home.png" alt="" srcset="" />  {propertyType}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {displayServices.length > 0 && totalPages > 1 && (
        <div className="service-listings__pagination">
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
};

export default ServiceListings;