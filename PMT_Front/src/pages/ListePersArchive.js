import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


import DataTableLP from '../components/DataTableLP';
import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import Footer from '../components/Footer';

import "../css styling/DataTable.css"


const ListePersonnel= () => {


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
    <div >
     
    <div className="navbars">
      <HorizontalNavbar />
      <VerticalNavbar />
    </div>

    <div className="liste-content">
      <div className="liste-box">
        <h1>Liste du Personnel Archivé</h1>
      </div>
      <br /><br /><br /><br /><br /><br /><br />
      
     
        <DataTableLP />
      
    </div>
    <Footer />
    
  
  </div>
  );
}

export default ListePersonnel;
