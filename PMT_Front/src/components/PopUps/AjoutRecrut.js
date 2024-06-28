import React, { useState } from 'react';
import axios from '../../axios';



const AjoutRecrut = ({ onClose }) => {

  const [motif , setMotif ] = useState('');
  const [modeP , setMode ] = useState('');
  const [NiveauRequis , setNiveauRequis ] = useState('');
  const [Diplome, setDiplome ] = useState('');
  const [Specialite, setSpecialite ] = useState('');
  const [Experience, setExperience ] = useState('');
  const [SpecifitesPoste ,  setSpecificite] = useState('');
  const [lieuTravail , setLieuTravail ] = useState('');
  const [anneeRecrut, setAnnee ] = useState('');
  const [intituleP, setIntituleP ] = useState('');
  const [echelle , setEchelle] = useState('');
  const [codeSTR, setCodeSTR] = useState('');
  const [csp ,setCSP ] = useState('');
  const [nbEmploye , setNombre ] = useState('');
  const [observation, setObservation ] = useState('');
 



  const [exist, setExist] = useState(false);
  const [error, setError] = useState('');


  const storedAnnee = localStorage.getItem('selectedYear');
  const anneepmt = parseInt(storedAnnee);

  



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const response = await axios.post('/AjouterPrevRecrut', { 
      anneepmt, //annee debut du pmt
      motif, // Rempl, deficit ou PDvp
      modeP, // INT ou EXT
      NiveauRequis,
      Diplome,
      Specialite,
      Experience,
      SpecifitesPoste,
      lieuTravail,
      anneeRecrut,
      intituleP,
      echelle,
      codeSTR,
      csp,
      nbEmploye,
      observation
    });
    window.location.href = '/PrevisionsRecrutement';


    } catch (error) {
      if((error.response.data == "Erreur : PMT inexistant") ||
      (error.response.data == "Erreur : cette année n'appartient pas à ce PMT")||
      (error.response.data == "Erreur : Cette prévision de recrutement existe déjà pour ce poste, cette année et ces paramètres.") ){
        setError(error.response.data);
      }
      else{
        setError("Erreur :  données incorrectes !");
      }
      setExist(true);
      console.error('Ajout failed:', error.response.data);
    }
};




  

  return (
    <div className="edit-form">
      <div className="edit-form-title">
        <h2>Formulaire de Modification</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        <h2 style={{color: '#f48220'}}>Poste Demandé</h2>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="codeSTR">Code Fonction</label>
            <input type="text" value={codeSTR} onChange={(e) => setCodeSTR(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="poste">Intitulé poste</label>
            <input type="text" value={intituleP} onChange={(e) => setIntituleP(e.target.value)} required/>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="csp">CSP</label>
            <select className="custom-select" value={csp} onChange={(e) => setCSP(e.target.value)} required>

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
          <div className="input-group">
            <label htmlFor="echelle">Echelle</label>
            <input type="text" value={echelle} onChange={(e) => setEchelle(e.target.value)} required/>
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
        <br /><br />
        <h2 style={{color: '#f48220'}}>Profil Recherché</h2>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="Diplome">Diplôme</label>
            <input type="text" value={Diplome} onChange={(e) => setDiplome(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label htmlFor="NiveauRequis">Niveau Requis</label>
            <input type="text" value={NiveauRequis} onChange={(e) => setNiveauRequis(e.target.value)}required />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="Specialite">Spécialité </label>
            <input type="text" value={Specialite} onChange={(e) => setSpecialite(e.target.value)}  required/>
          </div>
          <div className="input-group">
            <label htmlFor="Experience">Expérience</label>
            <input type="text" value={Experience} onChange={(e) => setExperience(e.target.value)} required/>
          </div> 
        </div>

        <div className="input-row">
          <div className="input-group">
              <label htmlFor="SpecifitesPoste">Spécificités du Poste</label>
              <input type="text" value={SpecifitesPoste} onChange={(e) => setSpecificite(e.target.value)} required/>
            </div>
        </div>
        <br /><br />
        <h2 style={{color: '#f48220'}}>Besoins de Recrutement</h2>

        <div className="input-row">
          <div className="input-group">
              <label htmlFor="motif">Motif</label>
              <select className="custom-select" value={motif} onChange={(e) => setMotif(e.target.value)} required>

              <option disabled value=""></option>           
                <option value="Rempl">Rempl</option>
                <option value="Deficit">Deficit</option>
                <option value="PDvp">Projet Dev</option>

              </select> 
          </div>
            <div className="input-group">
            <label htmlFor="modeP">Mode de recrutement</label>
              <select className="custom-select" value={modeP} onChange={(e) => setMode(e.target.value)} required>

              <option disabled value=""></option>            
                <option value="INT">Interne</option>
                <option value="EXT">Externe</option>

              </select>
            </div>
            <div className="input-group">
            <label htmlFor="nbEmploye">Nombre d'Employés à recruter</label>
              <input type="text" value={nbEmploye} onChange={(e) => setNombre(e.target.value)} required/>
               
            </div>
        </div>

        <br /><br />
        <h2 style={{color: '#f48220'}}>Autres Informations</h2>
        <div className="input-row">
        
          <div className="input-group">
            <label htmlFor="anneeRecrut">Année</label>
            <input type="text" value={anneeRecrut} onChange={(e) => setAnnee(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label htmlFor="observation">Observation</label>
            <input type="text" value={observation} onChange={(e) => setObservation(e.target.value)} required/>
          </div>
        </div>
        
        {exist && <p className="ajout-failed">{error}</p>}
        
        <button type="submit" id="ajout-btn">Enregistrer</button>
      </form>
    </div>
  );
};

export default AjoutRecrut;
