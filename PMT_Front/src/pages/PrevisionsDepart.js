import React, {useEffect, useState} from 'react';
import axios from '../axios'; 
import {useNavigate} from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import Footer from '../components/Footer';
import DataTablePD from '../components/DataTablePD';

import "../css styling/DataTable.css";
import "../css styling/PMT.css"
import AjoutDepart from '../components/PopUps/AjoutDepart';
import PMTElements from '../components/PMTElements';
import PageGardeElement from '../components/PageGardeElement';


const PrevisionsDepart= () => {


  const storedAnnee = localStorage.getItem('selectedYear');
  const anneepmt = parseInt(storedAnnee);
  
     //to display it in the title
  const fullAnnee = localStorage.getItem('fullSelectedYear');

//to make the buttons disabled if it's not the currentYear: 
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
      
      
 
        <div className="btn-liste-pmt">
          <button
            disabled={!isCurrentYear}
            className={`${!isCurrentYear ? 'disabled-button' : ''}`}
            onClick={() => handleAjouterDepartClick()}
          >
            Ajouter un Départ
          </button>
        </div>
    
      <DataTablePD  />


       {/* the Ajouter Depart popup window Functionality*/}
       <div>
        {isPopupOpen && (
          <div>
            <div className="overlay" onClick={handlePopupClose} />
            <div className="popup-container">
              <div className="popup">
                <div className="popup-header">
                  <button className="close-button" onClick={handlePopupClose}>
                    <FontAwesomeIcon icon={faClose}  />
                  </button>
                </div>
                <div className="popup-content-scrollable">
                  <AjoutDepart onClose={handlePopupClose} />
                </div>
              </div>
            </div>
          </div>
        )}

     
     
      
    </div>
    <Footer />
    
  
  </div>
  </div>
  );
}

export default PrevisionsDepart;
