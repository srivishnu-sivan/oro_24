import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/index.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__copyright">
            © 2025 <span>ORO24 Facilities Management, All Rights Reserved.</span>
          </div>
         
          <nav className="footer__links">
            <a href="/terms" className="footer__link">Terms & Conditions</a>
            <a href="/privacy" className="footer__link">Privacy Policy</a>
            <a href="/cookies" className="footer__link footer__link--medium">Cookies Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;