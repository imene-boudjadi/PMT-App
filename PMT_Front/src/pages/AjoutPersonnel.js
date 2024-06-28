// Home.js
import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import PersonnelForm from '../components/PersonnelForm';
import Footer from '../components/Footer'; 

import "../css styling/AjoutPersonnel.css"

const AjoutPersonnel = () => {


//for the login
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');


  useEffect(()=>{
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      console.log('isAuthenticated: ', isAuthenticated)
      if ( isAuthenticated == 'false'){
          navigate('/');	
      }

  },[]);

  return (
    <div>
      <HorizontalNavbar/>
      <VerticalNavbar/>
      <div className="ajout-content">
        <div className="ajout-box">
          <h1>Ajout du Personnel</h1>
        </div>
        
        <div className="card-container">
          <div className="card">
            <div className="scrollable-content">
              <PersonnelForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default AjoutPersonnel;