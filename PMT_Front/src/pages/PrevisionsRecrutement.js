import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import DataTablePR from '../components/DataTablePR';
import PMTElements from '../components/PMTElements';
import AjoutRecrut from '../components/PopUps/AjoutRecrut';
import Footer from '../components/Footer';

import "../css styling/DataTable.css";
import "../css styling/PMT.css"



const PrevisionsRecrutement= () => {

  const storedAnnee = localStorage.getItem('selectedYear');
  const anneeDebPmt = parseInt(storedAnnee);

  //to make the buttons disabled if it's not the currentYear: 
  const currentYear = new Date().getFullYear();
  const isCurrentYear = anneeDebPmt === currentYear;

  //we need it in titles
  const fullAnnee = localStorage.getItem('fullSelectedYear');

 
  //for the edit functionality:
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleIconClick = () => {
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
          onClick={() => handleIconClick()}>Ajouter un Besoin <br /> de Recrutement
        </button>
          <br /><br />
      </div>

      <DataTablePR /> 

      {/* the Edit Functionality*/}
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
                    <AjoutRecrut onClose={handlePopupClose}  />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
     
      
    </div>
    <Footer />
    
  
  </div>
  );
}

export default PrevisionsRecrutement;
