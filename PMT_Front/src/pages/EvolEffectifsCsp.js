import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import PMTElements from '../components/PMTElements';
import DataTableMvtCsp from '../components/DataTableMvtCsp';
import Footer from '../components/Footer';

import "../css styling/DataTable.css";
import "../css styling/PMT.css"
import DataTableEvlCsp from '../components/DataTableEvlCsp';






const MvtEffectifsCsp= () => {


  const storedAnnee = localStorage.getItem('selectedYear');
  const anneepmt = parseInt(storedAnnee);
 
   //to display it in the title
   const fullAnnee = localStorage.getItem('fullSelectedYear');

  const currentYear = new Date().getFullYear();

  const isCurrentYear = anneepmt === currentYear;





  //the ajouter depart pop up window
  const [isPopupOpen, setPopupOpen] = useState(false);
  
  const handleAjouterDepartClick = () => {
    setPopupOpen(true);
  };

  //to close the edit window:
  const handlePopupClose = () => {
    setPopupOpen(false);
  };






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
        <h1>PMT {fullAnnee}</h1>
      </div>

      <PMTElements/>
      <br /> <br />
      <DataTableEvlCsp  />
     
    </div>
    <Footer />
    
  
  
  </div>
  );
}

export default MvtEffectifsCsp;
