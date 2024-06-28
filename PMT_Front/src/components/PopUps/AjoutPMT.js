import React, { useState } from 'react';
import axios from '../../axios';



const AjoutPMT = ({ onClose }) => {

 
  
  const [annee, setAnnee] = useState(new Date().getFullYear());  
  const [period, setPeriod] = useState('');

  const [error, setError] = useState('');
  const [exist, setExist] = useState(false);

  const anneDeb = parseInt(annee);
  const duree = parseInt(period);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async () => {
    setShowConfirmation(false);
    try {
      const response = await axios.post(`/ajouterPmt`, { 
        anneDeb,
        duree,
      }); 
      window.location.href = '/PrevisionsDepart';
    } catch (error) {
      if((error.response.data == "Erreur : PMT exist deja ")){
        setError(error.response.data);
      }
      else{
        setError("Erreur :  données incorrectes !")
      }
      setExist(true);
      console.log(error);
    }
  }


  

  return (
    <div className="edit-form">
      <div className="edit-form-title">
        <h2>Ajouter un Nouveau PMT</h2>
      </div>
      <form onSubmit={handleConfirmation}>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="année">Année</label>
            <input type="text" value={annee}  required disabled />
          </div>
          <div className="input-group">
            <label htmlFor="période">Période</label>
            <select className="custom-select" value={period} onChange={(e) => setPeriod(e.target.value)} required>
                <option   disabled value="" >Durée</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
            </select>
          </div>
        </div>
       
        {exist && <p className="ajout-failed">{error}</p>}

        <button type="button" id="ajout-btn" onClick={openConfirmation}>Créer</button>
      </form>


      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Voulez-vous vraiement créer ce PMT, aprés la création vous ne pourrez plus modifier le pmt précedant ?</p>
          <button onClick={handleConfirmation}>Confirmer</button>
          <button onClick={() => setShowConfirmation(false)}>Annuler</button>
        </div>
      )}

    </div>
  );
};

export default AjoutPMT;
