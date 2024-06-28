import React, { useState } from 'react';
import axios from '../../axios';



const EditFormG = ({ onClose, selectedUser }) => {

  
  const [nom, setNom] = useState(selectedUser ? selectedUser.nom : '');
  const [prenom, setPrenom] = useState(selectedUser ? selectedUser.prenom : '');
  const [matricule, setMatricule] = useState(selectedUser ? selectedUser.matricule:'');
 
  const [exist, setExist] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const response = await axios.put('/modifierUser', { 
      matricule,
      nom,
      prenom,
    });
    const { token } = response.data;
    console.log('token: ', token);

    
    console.log('Modifié avec succes');
    window.location.href = '/GestionDesComptes';

    } catch (error) {
      setError("Erreur :  données incorrectes !")
      setExist(true);
      console.error('modification failed:', error.response.data);
      console.error('matricule:', matricule);

    }
};




  

  return (
    <div className="edit-form">
      <div className="edit-form-title">
        <h2>Formulaire de Modification</h2>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="input-row">
          <div className="input-group">
            <label htmlFor="matricule">Matricule</label>
            <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} disabled  />
          </div>
          
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prenom</label>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required  />
          </div>
        </div>
       
       

         
        
       
        {exist && <p className="ajout-failed">{error}</p>}
        
        <button type="submit" id="ajout-btn">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditFormG;
