import React from 'react';
import '../../styles/index.scss';

const HeroSection = () => {
  return (
    <section className="services-hero">
      <div className="services-hero__container">
       
        {/* Text Content */}
        <div className="services-hero__content">
          <h1 className="services-hero__title">
            <span className="main-text">Tailored </span>
            <span className="main-text bold">Services</span>
            <span className="dash">—</span>
            <br className="line-break" />
            <span className="subtitle">
              Seamless, Sustainable, and Cost-Effective
            </span>
          </h1>
        </div>
        {/* Image */}
        <div className="services-hero__image">
          <img
            src="/images/Vase.png"
            alt="Vase with plant decoration"
          />
          <div className="gradient-overlay" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;