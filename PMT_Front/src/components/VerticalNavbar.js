// VerticalNavbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faQuestion, faTableList, faHourglassEnd, faUsersCog, faArchive} from '@fortawesome/free-solid-svg-icons';
import '../css styling/VerticalNavbar.css'; // Import your CSS file for styling (if any)

const VerticalNavbar = ({ isVerticalNavbarOpen }) => {


  const isAuthenticated =  localStorage.getItem('isAuthenticated')  ;
  const profile =  localStorage.getItem('profil')  ;
 


  return (
    <div className="navbar-container">
      <div className="rectangle">
        <div class="logo">
            <img src={process.env.PUBLIC_URL + '/logo white.png'} alt="LogoW" />
        </div>
      </div>
      <div className="vertical-navbar">   
        <ul>
          <li><a href={isAuthenticated ? '/Acceuil' : '/'}><FontAwesomeIcon icon={faHome} /> Statistiques</a></li>
          <li><a href={isAuthenticated ? '/ListePersonnel' : '/'}><FontAwesomeIcon icon={faTableList} /> Liste du <br /> Personnel</a></li>
          <li><a href={isAuthenticated ? '/ListePersArchive' : '/'}><FontAwesomeIcon icon={faArchive} /> Liste du <br /> Personnel Archivé</a></li>
          <li><a href={isAuthenticated ? '/PageDeGarde' : '/'}><FontAwesomeIcon icon={faHourglassEnd} /> PMT </a></li>
          {profile === 'admin' && (
            <li><a href={isAuthenticated ? '/GestionDesComptes' : '/'}><FontAwesomeIcon icon={faUsersCog} /> Gestion des <br /> Comptes</a></li>
          )}          {/* <li><a href={isAuthenticated ? '/Aide' : '/LoginPage'}><FontAwesomeIcon icon={faQuestion} /> Aide</a></li> */}
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavbar;
