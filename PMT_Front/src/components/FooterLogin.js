import React from 'react';
import '../css styling/FooterLogin.css';

const FooterLogin = () => {
  return (
    <footer className="footerLog">
      <p>© {new Date().getFullYear()} <span><a href="https://sonatrach.com/">Sonatrach</a></span>. Tous droits réservés.</p>
    </footer>
  );
};

export default FooterLogin;