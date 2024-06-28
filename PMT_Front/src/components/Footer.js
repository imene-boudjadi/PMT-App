// Footer.js
import React from 'react';
import '../css styling/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} <span><a href="https://sonatrach.com/">Sonatrach</a></span>. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
