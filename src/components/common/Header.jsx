import React, { useState } from 'react';
import '../../styles/index.scss';

const NAV_ITEMS = ['Home', 'Packages', 'Our Services', 'Contact Us'];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <img
            src="/images/headerLogo.png"
            alt="ORO Home Services"
            className="header__logo"
          />
       
          <button
            className="header__hamburger"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
         
          <nav className="header__nav">
            <ul className="header__menu">
              {NAV_ITEMS.map((item, index) => (
                <li key={item} className="header__menu-item">
                  <a href="#" className={index === 0 ? 'is-active' : ''}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="header__actions">
              <button className="button button--secondary button--sm">
                EXPRESS
              </button>
              <button className="header__language">
                <img src="/images/flag.png" alt="English language" />
                <span>EN</span>
              </button>
              <button className="header__cart">
                <img src="/images/shopping-cart.svg" alt="Shopping cart" />
                <span className="badge">2</span>
              </button>
              <button className="header__search">
                <img src="/images/search2.png" alt="Search" />
              </button>
              <button className="header__login">
                <span>Login</span>
                <img src="/images/user.png" alt="User profile" />
              </button>
            </div>
          </nav>
        </div>
        {isMenuOpen && (
          <div className="header__mobile-menu">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;