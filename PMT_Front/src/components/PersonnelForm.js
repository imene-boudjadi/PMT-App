// Home.js
import React, { useState , useEffect} from 'react';
import axios from '../axios';


const PersonnelForm = () => {


  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [sexe, setSexe] = useState('');
  const [dateNaiss, setDateNaiss] = useState('');
  const [lieuTravail, setLieuTravail] = useState('');
  const [designationD, setDesignationD] = useState('');
  const [valeurD, setValeurD] = useState('');
  const [matricule, setMatricule] = useState('');
  // const [csp, setCsp] = useState('');
  const [echelle, setEchelle] = useState('');
  const [intituleP, setIntituleP] = useState('');
  const [codeSTR, setCodeSTR] = useState('');
  const [csp, setCSP] = useState('');
  const [dateRecrut, setDateRecrut] = useState('');
  const [designationS, setDesignationS] = useState('');

  const [exist, setExist] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {
      const response = await axios.post('/ajouterPers', { 
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

      console.log('Ajouté avec succes');
      window.location.href = '/ListePersonnel';

      } catch (error) {
        console.log('SEXE: ', sexe);
        if(error.response.data == "Erreur : Employe existe déjà !"){
          setError(error.response.data);
        }
        if(error.response.data == "Erreur : Le matricule est trop long."){
          setError(error.response.data);
        }
        if(error.response.data == "Erreur: Le matricule n'est pas valide."){
          setError(error.response.data);
        }
        else{
          setError("Erreur :  données incorrectes !")
        }
          
          setExist(true);
        console.error('Ajout failed:', error.response.data);
      }
  };





  //to make the structure select dynamic:
const [selectedDirection, setSelectedDirection] = useState('');
const [selectedDepartment, setSelectedDepartment] = useState('');




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
    <div >
      <div className="form-title">
        <h2>Formulaire d'Ajout</h2>
      </div>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prenom</label>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="sexe">Sexe</label>
            <select className="custom-select" value={sexe} onChange={(e) => setSexe(e.target.value)} required >
            <option disabled value="" ></option>
              <option value = 'F'>Feminin</option>
              <option value ='M'>Masculin</option>
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
            <input type="text" value={designationD} onChange={(e) => setDesignationD(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="ValDipl">Valeur diplôme</label>
            <input type="text" value={valeurD} onChange={(e) => setValeurD(e.target.value)} required/>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="matricule">Matricule</label>
            <input type="text" value={matricule} onChange={(e) => setMatricule(e.target.value)} required/>
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

          {/*
          */}
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="echelle">Echelle</label>
            <input type="text" value={echelle} onChange={(e) => setEchelle(e.target.value)} required />
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
            <input type="date" value={dateRecrut} onChange={(e) => setDateRecrut(e.target.value)} required/>
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
        <br />
        <button type="submit" id="ajout-btn">Ajouter</button>
      </form>
      </div>
    </div>
  );
};

export default PersonnelForm;