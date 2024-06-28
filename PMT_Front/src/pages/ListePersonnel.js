import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import DataTableL from '../components/DataTableL';
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
      if (isAuthenticated === 'false' && window.location.pathname !== '/') {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);

  return (
    <div >
     
    <div className="navbars">
      <HorizontalNavbar />
      <VerticalNavbar />
    </div>

    <div className="liste-content">
      <div className="liste-box">
        <h1>Liste du Personnel</h1>
      </div>
      <div className="btn-liste">
        <button  onClick={() => window.location.href = '/AjoutPersonnel'}>Ajouter un Employé</button>
         <br /><br />
      </div>
      
     
        <DataTableL />
      
    </div>
    <Footer />
    
  
  </div>
  );
}

export default ListePersonnel;
