import React, {useEffect, useState} from 'react';
import axios from '../axios'; 
import AjoutPMT from '../components/PopUps/AjoutPMT';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';


const PMTElements = () => {

   

    //the ajouter PMT pop up window
  const [isPopupPMTOpen, setPopupPMTOpen] = useState(false);
  
  const handleAjouterPMTClick = () => {
    setPopupPMTOpen(true);
  };

  //to close the edit window:
  const handlePopupPMTClose = () => {
    setPopupPMTOpen(false);
  };



  //getting the existing PMT: 
  const [yearD, setYearD] = useState([]);
  const [yearF, setYearF] = useState([]);

  useEffect(() => {
    fetchExistingPMT();
  }, []);


  const fetchExistingPMT = async () => {
    try {
      const response = await axios.get('/PMTexistants');
      const existingPMT = response.data;
      const yearDebArray = existingPMT.map(pmt => pmt.anneeDeb);
      const yearFinArray = existingPMT.map(pmt => pmt.anneeFin);
      setYearD(yearDebArray);
      setYearF(yearFinArray);
    } catch (error) {
      console.log('Error fetching PMT:', error);
    }
  };


 // Gestion de la sélection d'année
  const lastSelectedYear = localStorage.getItem('selectedYear') ;
  const [selectedYear, setSelectedYear] = useState(lastSelectedYear); 


  const handleYearChange = (event) => {
    const selectedValue = event.target.value;
    const year = selectedValue.substring(0, 4); // Extract the first 4 characters
    setSelectedYear(selectedValue);
    localStorage.setItem('selectedYear', year); // Store only the year in localStorage
    localStorage.setItem('fullSelectedYear', selectedValue); // Store only the year in localStorage
  };
  
  

  //adding the condition on the color change in the links:
  const location = useLocation(); // Get the current location

  // Define the button data
  const buttonData = [
    { label: 'Acceuil', link: '/PageDeGarde' },
    { label: 'Prévision de Départ Clôture', link: '/PrevisionsDepart' },
    { label: 'Prévision de Recrutement', link: '/PrevisionsRecrutement' },
    { label: 'Mouvement des Effectifs  par CSP', link: '/MvtEffectifCsp' },
    { label: 'Mouvement des Effectifs par Activité', link: '/MvtEffectifAct' },
    { label: 'Evolution des Effectifs par CSP', link: '/EvolEffectifCsp' },

  ];

  const renderSelect = location.pathname === '/PageDeGarde' ? (
    <select
      className="custom-select-year"
      value={selectedYear}
      onChange={handleYearChange}
    >
      <option value="" disabled>
        Année PMT
      </option>
      {yearD && yearF && yearD.map((year, index) => (
        <option key={index} value={`${year} - ${yearF[index]}`}>
          {`${year} - ${yearF[index]}`}
        </option>
      ))}
    </select>
  ) : null;


  return (
    <div>
        <div className="btn-pmt">
            <button><FontAwesomeIcon icon={faPlus} size = "3x" onClick={() => handleAjouterPMTClick()} /></button>
        </div>

        {renderSelect}



        <div className="table-options">
          <br /><br />
            {buttonData.map((button, index) => (
            <button
              key={index}
              className={location.pathname === button.link ? '' : 'btn-other-color'}
              onClick={() => window.location.href = button.link}
            >
              {button.label}
            </button>
          ))}
        </div>

         {/* the AjouterPMT popup window Functionality*/}
      <div>
        {isPopupPMTOpen && (
          <div>
            <div className="overlay" onClick={handlePopupPMTClose} />
            <div className="popup-container">
              <div className="popup">
                <div className="popup-header">
                  <button className="close-button" onClick={handlePopupPMTClose}>
                    <FontAwesomeIcon icon={faClose}  />
                  </button>
                </div>
                <div className="popup-content-scrollable">
                  <AjoutPMT onClose={handlePopupPMTClose} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PMTElements;
