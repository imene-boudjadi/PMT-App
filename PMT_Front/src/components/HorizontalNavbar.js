// HorizontalBar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../css styling/HorizontalNavbar.css'; // Import your CSS file for styling (if any)

const HorizontalBar = () => {

  const profile = localStorage.getItem('profil');

  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform the logout action
    const isAuthenticated = localStorage.setItem('isAuthenticated', 'false');
     localStorage.setItem('matricule', '');
     localStorage.setItem('profil', '');
    localStorage.setItem('fullSelectedYear', '');
    localStorage.setItem('selectedYear', '');

    if(!isAuthenticated){
      navigate('/');
    }
    

    
  };
  



  return (
    <div className="horizontal-bar">
      <div className="user-icon">
        <a href={profile == 'admin' ? '/ProfileAdmin' : '/ProfileUser'}>
          <FontAwesomeIcon icon={faUser} />
        </a>

        <div className="logout-icon">
        <a href="#" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </a>
      </div>

      </div>
    </div>
  );
};

export default HorizontalBar;
