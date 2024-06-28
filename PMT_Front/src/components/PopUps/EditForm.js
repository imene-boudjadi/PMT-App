import React, { useState , useEffect} from 'react';
import axios from '../../axios';



const EditForm = ({ onClose, selectedEmployee }) => {

  //initiate the inputs with the previous value: 
  const [nom, setNom] = useState(selectedEmployee ? selectedEmployee.nom : '');
  const [prenom, setPrenom] = useState(selectedEmployee ? selectedEmployee.prenom : '');
  const [sexe, setSexe] = useState(selectedEmployee ? selectedEmployee.sexe : 'F');
  const [dateNaiss, setDateNaiss] = useState(selectedEmployee ? selectedEmployee.dateNaiss:'');
  const [designationD, setDesignationD] = useState(
    selectedEmployee && selectedEmployee.diplomes.length > 0
      ? selectedEmployee.diplomes[0].designationD
      : ''
  );
  const [valeurD, setValeurD] = useState(
    selectedEmployee && selectedEmployee.diplomes.length > 0
      ? selectedEmployee.diplomes[0].valeurD
      : ''
  );
  const [matricule, setMatricule] = useState(selectedEmployee ? selectedEmployee.matricule:'');
  const [csp, setCSP] = useState(selectedEmployee ? selectedEmployee.csp:'');
  const [echelle, setEchelle] = useState(
    selectedEmployee && selectedEmployee.postes.length > 0
    ? selectedEmployee.postes[0].echelle:'');
  const [intituleP, setIntituleP] = useState(
    selectedEmployee && selectedEmployee.postes.length > 0
      ? selectedEmployee.postes[0].intituleP
      : ''
  );
  const [codeSTR, setCodeSTR] = useState( 
    selectedEmployee && selectedEmployee.postes.length > 0
    ? selectedEmployee.postes[0].codeSTR:'');

  const [dateRecrut, setDateRecrutt] = useState(selectedEmployee ? selectedEmployee.dateRecrut:'');
  const [designationS, setDesignationS] = useState(
    selectedEmployee && selectedEmployee.structures.length > 0
      ? selectedEmployee.structures[0].designationS
      : ''
  );
  const [lieuTravail, setLieuTravail] = useState(selectedEmployee ? selectedEmployee.lieuTravail : '');

  const [exist, setExist] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const response = await axios.post('/modifierPers', { 
      matricule,
      nom,
      prenom,
      dateNaiss,
      dateRecrut,
      sexe,
      lieuTravail,
      intituleP,
      echelle,
      codeSTR,
      csp,
      designationS,
      designationD,
      valeurD
    });
    const { token } = response.data;

    // Simulated token storage or usage (replace with your actual logic)
    localStorage.setItem('token', token);

    console.log('Modifié avec succes');
    window.location.href = '/ListePersonnel';

    } catch (error) {
      setError("Erreur :  données incorrectes !")
      setExist(true);
      console.error('modification failed:', error.response.data);
    }
};


//to make the structure select dynamic:
const [selectedDirection, setSelectedDirection] = useState(
  selectedEmployee && selectedEmployee.designationS
    ? selectedEmployee.designationS.split(' - ')[0]
    : ''
);
const [selectedDepartment, setSelectedDepartment] = useState(
  selectedEmployee && selectedEmployee.structures.length > 0
    ? selectedEmployee.structures[0].designationS.split(' - ')[1]
    : ''
);
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
    setDesignationS(direction);
  } else {
    setDesignationS(''); // Reset designationS if department is not selected
  }
};


const handleDepartmentChange = (event) => {
  const department = event.target.value;
  setSelectedDepartment(department);

  if (selectedDirection && department) {
    setDesignationS(`${selectedDirection} - ${department}`);
  } else {
    setDesignationS(selectedDirection); // If department is not selected, set designationS to direction
  }
};




useEffect(() => {
  console.log('newStructure:', designationS);
}, [designationS]);



  

  return (
    <div className="edit-form">
      <div className="edit-form-title">
        <h2>Formulaire de Modification</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prenom</label>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)}  required/>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="sexe">Sexe</label>
            <select className="custom-select" value={sexe} onChange={(e) => setSexe(e.target.value)} required>

              
              <option value="F">Feminin</option>
              <option value="M">Masculin</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="DateNaiss">Date de naissance</label>
            <input type="date" value={dateNaiss} onChange={(e) => setDateNaiss(e.target.value)} required />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="Dipl">Diplôme</label>
            <input type="text" value={designationD} onChange={(e) => setDesignationD(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label htmlFor="ValDipl">Valeur diplôme</label>
            <input type="text" value={valeurD} onChange={(e) => setValeurD(e.target.value)}required />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="matricule">Matricule</label>
            <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} disabled required/>
          </div>
          <div className="input-group">
          <label htmlFor="lieu">Lieu de Travail</label>
            <select className="custom-select" value={lieuTravail} onChange={(e) => setLieuTravail(e.target.value)} required>

            <option disabled value=""></option>
            <option value="ADRAR">ADRAR</option>
            <option value="CHLEF">CHLEF</option>
            <option value="LAGHOUAT">LAGHOUAT</option>
            <option value="OUM EL BOUAGHI">OUM EL BOUAGHI</option>
            <option value="BATNA">BATNA</option>
            <option value="BÉJAÏA">BÉJAÏA</option>
            <option value="BISKRA">BISKRA</option>
            <option value="BÉCHAR">BÉCHAR</option>
            <option value="BLIDA">BLIDA</option>
            <option value="BOUIRA">BOUIRA</option>
            <option value="TAMANRASSET">TAMANRASSET</option>
            <option value="TÉBESSA">TÉBESSA</option>
            <option value="TLEMCEN">TLEMCEN</option>
            <option value="TIARET">TIARET</option>
            <option value="TIZI OUZOU">TIZI OUZOU</option>
            <option value="ALGER">ALGER</option>
            <option value="DJELFA">DJELFA</option>
            <option value="JIJEL">JIJEL</option>
            <option value="SÉTIF">SÉTIF</option>
            <option value="SAÏDA">SAÏDA</option>
            <option value="SKIKDA">SKIKDA</option>
            <option value="SIDI BEL ABBÈS">SIDI BEL ABBÈS</option>
            <option value="ANNABA">ANNABA</option>
            <option value="GUELMA">GUELMA</option>
            <option value="CONSTANTINE">CONSTANTINE</option>
            <option value="MÉDÉA">MÉDÉA</option>
            <option value="MOSTAGANEM">MOSTAGANEM</option>
            <option value="MSILA">MSILA</option>
            <option value="MASCARA">MASCARA</option>
            <option value="OUARGLA">OUARGLA</option>
            <option value="ORAN">ORAN</option>
            <option value="EL BAYADH">EL BAYADH</option>
            <option value="ILLIZI">ILLIZI</option>
            <option value="BORDJ BOU ARRERIDJ">BORDJ BOU ARRERIDJ</option>
            <option value="BOUMERDÈS">BOUMERDÈS</option>
            <option value="EL TARF">EL TARF</option>
            <option value="TINDOUF">TINDOUF</option>
            <option value="TISSEMSILT">TISSEMSILT</option>
            <option value="EL OUED">EL OUED</option>
            <option value="KHENCHELA">KHENCHELA</option>
            <option value="SOUK AHRAS">SOUK AHRAS</option>
            <option value="TIPAZA">TIPAZA</option>
            <option value="MILA">MILA</option>
            <option value="AÏN DEFLA">AÏN DEFLA</option>
            <option value="NAÂMA">NAÂMA</option>
            <option value="AÏN TÉMOUCHENT">AÏN TÉMOUCHENT</option>
            <option value="GHARDAÏA">GHARDAÏA</option>
            <option value="RELIZANE">RELIZANE</option>

            </select>       
          </div>

          
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="echelle">Echelle</label>
            <input type="text" value={echelle} onChange={(e) => setEchelle(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label htmlFor="poste">Intitulé poste</label>
            <input type="text" value={intituleP} onChange={(e) => setIntituleP(e.target.value)} required/>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="codestr">Code Fonction</label>
            <input type="text" value={codeSTR} onChange={(e) => setCodeSTR(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label htmlFor="Daterec">Date de recrutement</label>
            <input type="date" value={dateRecrut} onChange={(e) => setDateRecrutt(e.target.value)} required/>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
              <label htmlFor="csp">CSP</label>
            <select className="custom-select" value={csp} onChange={(e) => setCSP(e.target.value)} required >
              <option disabled value=""></option> 
                <option value="ING+">ING+</option>
                <option value="CU">CU</option>
                <option value="AC">AC</option>
                <option value="CS">CS</option>
                <option value="TS">TS</option>
                <option value="TECHNICIEN">TECHNICIEN</option>
                <option value="TECHNIQUE">TECHNIQUE</option>
                <option value="AUTRE">AUTRE</option>
                <option value="ADM">ADM</option>
                <option value="AIDE">AIDE</option>
              </select>

            </div>
            <div className='input-group'>
              <label htmlFor="direction">Direction</label>
              <select className="custom-select" value={selectedDirection} onChange={handleDirectionChange} required>
                <option disabled value=""></option>
                {directions.map((direction, index) => (
                  <option key={index} value={direction}>
                    {direction}
                  </option>
                ))}
              </select>
            </div>
        </div>
        
        <div className="input-row">
          <div className="single">
            <label htmlFor="department">Nouveau Départment</label>
              <select className="custom-select" value={selectedDepartment} onChange={handleDepartmentChange} required>
                <option disabled value=""></option>
                {departmentsByDirection[selectedDirection]?.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
          </div>
        </div>
        
        {exist && <p className="ajout-failed">{error}</p>}
        
        <button type="submit" id="ajout-btn">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditForm;
