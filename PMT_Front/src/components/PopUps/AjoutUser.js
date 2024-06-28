import React, { useState } from 'react';
import axios from '../../axios';
import { faSearch, faEdit, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AjoutUser = ({ onClose }) => {

  const [matricule, setMatricule] = useState('');  
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [profil, setProfil] = useState('');

  const [error, setError] = useState('');
  const [exist, setExist] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/ajoutUser`, { 
        matricule,
        nom,
        prenom,
        profil
      }); 
      console.log(response.data);

      window.location.href = '/GestionDesComptes';

    } catch (error) {
      if((error.response.data =='Erreur : utilisateur existe déjà.')||(error.response.data =='Erreur : Le matricule est trop long.')||(error.response.data =='Erreur: Le matricule n\'est pas valide.')){
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
        <h2>Ajouter un Nouvel utilisateur</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
          <label htmlFor="matricule">Matricule</label>
                <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} required  />
          </div>

          <div className="input-group">
            <label htmlFor="nom">Nom</label>
              <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required  />
          </div>
        </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="prenom">Prénom</label>
              <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required  />
            </div>

            <div className="input-group">
              <label htmlFor="profil">Profil</label>
              {/* <input type="text" value={profil} onChange={(e) => setProfil(e.target.value)} required  /> */}

               <select
                className="custom-select"
                value={profil}
                onChange={(e) => setProfil(e.target.value)}
                required
              >
                <option disabled value=""></option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select> 
              
            

          </div>
 
        </div>

       <p style={{color: '#008000'}}>Note: Le mot de passe par défaut d'un utilisateur est: sonatrach</p>
        {exist && <p className="ajout-failed">{error}</p>}
        <button type="submit" id="ajout-btn">Ajouter</button>
      </form>
    </div>
  );
};

export default AjoutUser;
