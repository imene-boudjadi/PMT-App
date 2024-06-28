import React, { useState , useEffect} from 'react';
import axios from '../../axios';



const AjoutDepart = ({ onClose }) => {

  const [matricule, setMatricule] = useState('');  
  const [motif, setMotif] = useState('');
  const [anne, setAnnee] = useState(new Date().getFullYear());
  const [observation, setObservation] = useState('');

  const [isMutation, setIsMutation] = useState(false);
  const [error, setError] = useState('');
  const [exist, setExist] = useState(false);
  
  const anneDeb = parseInt(anne)


  const handleMotifChange = (event) => {
    setMotif(event.target.value);
    if (event.target.value === 'mutation') {
      setIsMutation(true);
    } else {
      setIsMutation(false);
    }
  };



  const handleAjoutDep = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/ajouterDep`, { 
        matricule,
        motif,
        anneDeb,
        observation
        
      }); 
      window.location.href = '/PrevisionsDepart';

    } catch (error) {
      if((error.response.data == "Erreur : matricule invalide") || (error.response.data == "Erreur : PMT inexistant")|| (error.response.data =="Erreur : Employe n'existe pas")|| (error.response.data =="Erreur : Previson de depart deja existante")||(error.response.data =="Erreur : cet employé est deja demissionné")||(error.response.data =="Erreur : cet employé est déjà retraité")||(error.response.data =="Erreur : cet employé est deja muté")||(error.response.data =="Erreur : la nouvelle structure est la meme que l'ancienne")){
        setError(error.response.data);
      }
      else{
        setError("Erreur :  données incorrectes !")
      }
      setExist(true);
      console.log(error);
    }
  }




  //to make the structure select dynamic:
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [availableDepartments, setAvailableDepartments] = useState([]);


  

  const directions = ['DC DSI','DISIT', 'DISI', 'DPAQ', 'DSSI'];

  const departmentsByDirection = {
    'DC DSI': ['DEPARTEMENT SUPPORT', 'ASSISTANT', ' '],
    'DISIT': ['DEPARTEMENT RESEAUX & TELECOMMUNICATIONS', 'DEPARTEMENT HEBERGEMENT & DATA CENTER', 'DEPARTEMENT SYSTEMES & SERVICES IT', 'DEPARTEMENT HELP DESK', "DEPARTEMENT CENTRE D'INNOVATION"],
    'DISI': ['DEPARTEMENT DEVELOPPEMENT & MAINTENANCE APPLICATIVE', 'DEPARTEMENT INTEGRATION SI GESTION', 'DEPARTEMENT INTEGRATION SI METIERS', 'DEPARTEMENT GESTION & INTEGRITE DATA', 'DEPARTEMENT ADMINISTRATION BDD & APPLICATION' ],
    'DPAQ': ['DEPARTEMENT QUALITE & METHODES', 'DEPARTEMENT PLANIFICATION, SUIVI DES REALISATIONS & REPORTING', 'DEPARTEMENT ASI'],
    'DSSI': ['DEPARTEMENT MANAGEMENT SECURITE SI', 'DEPARTEMENT SECURITE OPERATIONNELLE SI', 'DEPARTEMENT SECURITE SYSTEMES INFORMATIQUES INDUSTRIELS' ],
    
  };

  const handleDirectionChange = (event) => {
    const direction = event.target.value;
    setSelectedDirection(direction);
    setSelectedDepartment(''); // Reset the department when changing direction
  
    if (departmentsByDirection[direction]?.length === 0) {
      // If there are no departments for the selected direction, set designationS to direction
      setObservation(direction);
    } else {
      setObservation(''); // Reset designationS if department is not selected
    }
  };
  
  
  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
  
    if (selectedDirection && department) {
      setObservation(`${selectedDirection} - ${department}`);
    } else {
      setObservation(selectedDirection); // If department is not selected, set designationS to direction
    }
  };
  



  useEffect(() => {
    console.log('newStructure:', observation);
  }, [observation]);






  return (
    <div className="edit-form">
      <div className="edit-form-title">
        <h2>Ajouter un Nouveau Départ</h2>
        <div>
  
</div>
      </div>
      <form onSubmit={handleAjoutDep}>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="matricule">Matricule</label>
            <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} required  />
          </div>
          <div className="input-group">
            <label htmlFor="année">Année</label>
            <input type="text" value={anne}  required disabled />
          </div>
        </div >

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="motif">Motif</label>
              <select className="custom-select" value={motif} onChange={handleMotifChange} required>
                  <option   disabled value="" ></option>
                  <option value="demission">Démission</option>
                  <option value="mutation">Mutation</option>
              </select>
            </div>
            {isMutation ? (
              
              <div className="input-group">
               <div>
                  <label htmlFor="direction">Nouvelle Direction</label>
                  <select className="custom-select" value={selectedDirection} onChange={handleDirectionChange} required>
                    <option disabled value=""></option>
                    {directions.map((direction, index) => (
                      <option key={index} value={direction}>
                        {direction}
                      </option>
                    ))}
                  </select>
                </div>
                      <br /><br />
                <div>
                  <label htmlFor="department">Nouveau Départment</label>
                  <select className="custom-select" value={selectedDepartment} onChange={handleDepartmentChange}required>
                    <option disabled value=""></option>
                    {departmentsByDirection[selectedDirection]?.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            ) : (
              <div className="input-group">
                <label htmlFor="observation">Observation</label>
                <input
                  type="text"
            
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  
                />
              </div>
            )}
          </div>
 
        
          {exist && <p className="ajout-failed">{error}</p>}
        
        <button type="submit" id="ajout-btn">Ajouter</button>
      </form>
    </div>
  );
};

export default AjoutDepart;
