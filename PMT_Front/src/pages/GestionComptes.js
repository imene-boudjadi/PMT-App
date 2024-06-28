// Home.js
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import ListeGestionComptes from '../components/ListeGestionComptes';
import AjoutUser from '../components/PopUps/AjoutUser';
import "../css styling/Home.css"
import Footer from '../components/Footer'; 
import { faSearch, faEdit, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GestionComptes = () => {


  //the ajouter depart pop up window
  const [isPopupOpen, setPopupOpen] = useState(false);
    
  const handleAjouterUserClick = () => {
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
    <div>
        <HorizontalNavbar/>
        <VerticalNavbar/>
        
        <div className="home-content">
            <div className="home-box">
                <h1>Gestion des Comptes</h1>
            </div>

            <div className="btn-liste">
              <button  onClick={() => handleAjouterUserClick()}>Ajouter un Utilisateur</button>
              <br /><br />
            </div>

            <ListeGestionComptes/>



            
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
                          <AjoutUser onClose={handlePopupClose} />
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
};

export default GestionComptes;