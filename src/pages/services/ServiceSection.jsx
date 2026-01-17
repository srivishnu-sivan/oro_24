import React, { useRef } from 'react';
import '../../styles/index.scss';


const ServiceSection = ({ categories = [], selectedCategory, onCategoryChange }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -220 : 220,
      behavior: 'smooth',
    });
  };

  return (
    <section className="serviceSection">
      <div className="serviceSection__header">
        <p>Our Services</p>

        <div className="serviceSection__arrows">
          <img src="/images/leftArrow.png" onClick={() => scroll('left')}/>
          <img src="/images/rightArrow.png" onClick={() => scroll('right')}/>
        </div>
      </div>

      <div className="serviceSection__list" ref={scrollRef}>
        {categories.map((item) => {
          const isActive = selectedCategory === item.ServiceMasterID;

          return (
            <div
              key={item.ServiceMasterID}
              className={`service-card ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange(item.ServiceMasterID)}
            >
              <div className="service-card__icon">
                <img
                  src={`https://o24living.com${item.ImagePath}`}
                  alt={item.ServiceMasterName}
                />
              </div>
              <p>{item.ServiceMasterName}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceSection;
