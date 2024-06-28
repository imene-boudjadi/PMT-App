// DataTable.js
import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { faSearch, faEdit, faClose, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from './data';
import "../css styling/PMT.css";

const DataTablePR = () => {

  
  let [prevRecrut, setPrevRecrut] = useState([]);
  const [filteredData, setFilteredData] = useState(prevRecrut);







/*
  //for the pagination functionality: 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Change this line

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
*/
  
//on passe l'annee selectionnee en parametres:   
const storedAnnee = localStorage.getItem('selectedYear');
const anneeDebPmt = parseInt(storedAnnee);

//to make the buttons and clickable icons disabled if the selected year is not the currentyear:
const currentYear = new Date().getFullYear();
const isCurrentYear = anneeDebPmt === currentYear;

  useEffect(() => {
    fetchRecrutement();

  }, []);



  useEffect(() => {
    setFilteredData(prevRecrut);

  }, [prevRecrut]);
  
  const fetchRecrutement = async () => {
    try {
      const response = await axios.get(`/AfficherPrevRecrut/${anneeDebPmt}`);
      const prevRecrut = response.data.prevRecrutList;
      setPrevRecrut(prevRecrut);
      //  setPMT(fetchedPMT); // Update the state with fetched dat

      console.log(' prevRecrut:',prevRecrut);
      console.log(' prevRecrut:',anneeDebPmt);



    } catch (error) {
      console.log('Error fetching pmt:', error);
      console.log(' prevRecrut:',anneeDebPmt);

    }
  };
 


  //the delete functionality:

  //the confirmation before executing the deletion:
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [anneeRecrut, setAnnee] = useState('');
  const [idPoste, setIdPoste] = useState('');
  const [idRecrut, setIdRecrut] = useState('');
  const [idPmt, setIdPmt] = useState('');



  const handleDelete = async (anneeRecrut, idPoste,  idRecrut, idPmt) => {
    try {
      const response = await axios.delete(`/DeletePrevRecrut/${anneeRecrut}/${idPoste}/${idRecrut}/${idPmt}`); // Assuming your API endpoint for deleting a user is /users/:id
      fetchRecrutement();
      setShowDeleteConfirmation(false);
      console.log(' deleting prevision recrutement successful:');
    } catch (error) {
      console.log('Error deleting prevision recrutement:', error);
    }
  };


 
  const openDeleteConfirmation = (anneeRecrut, idPoste,  idRecrut, idPmt) => {
    setAnnee(parseInt(anneeRecrut));
    setIdPoste(parseInt(idPoste));
    setIdRecrut(parseInt(idRecrut));
    setIdPmt(parseInt(idPmt));

    setShowDeleteConfirmation(true);
  };


  //for the search functionality:
const [motsCles, setSearchTerm] = useState('');
    
//for the pagination:
//const [currentPage, setCurrentPage] = useState(1);
//const [itemsPerPage, setItemsPerPage] = useState(5);  // Number of items per page, and the default value is 5

const handleSearch = async (event) => {
  setSearchTerm(event.target.value);
  
  try {
    const response = await axios.get(`/RecherchePrevRecrut/${anneeDebPmt}/${motsCles}`);
    setFilteredData(response.data);
    console.log('prevision search:', response.data);
    console.log('searchTerm:', motsCles);
    console.log('response:', response.data);
  } catch (error) {
    console.log('Error fetching SEARCH:', error);
    console.log('searchTerm:', motsCles);
  }
};


 //to download the table: 
 const generatePDF = (tableId) => {
  const doc = new jsPDF();

  const table = document.getElementById(tableId);
  const title = `Prévisions de Recrutement ${storedAnnee}`;

  // Calculate title position and font size
  const titleX = doc.internal.pageSize.getWidth() / 2;
  const titleY = 15; // Adjust as needed
  const titleFontSize = 18; // Adjust as needed

  // Add the title to the PDF
  doc.setFontSize(titleFontSize);
  doc.text(title, titleX, titleY, { align: 'center' });


  html2canvas(table).then((canvas) => {
  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Calculate the position of the table image below the title
  const tableY = titleY + titleFontSize + 10;
  
  doc.addImage(imgData, 'PNG', 10, tableY, pdfWidth - 20, pdfHeight);
    const filename = `PREV_REC_CL ${storedAnnee}.pdf`;
    doc.save(filename);
  });
};




  return (
    <div className="data-table-elements-container">
      <div className="search-download-container">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher..."
            value={motsCles}
            onChange={handleSearch}
          />
        </div>
        <button style={{marginLeft: '75%', borderRadius: '50%'}} onClick={() => generatePDF('my-table')}>
          <FontAwesomeIcon icon={faDownload} style={{fontSize: '110%'}}  />
        </button>
        
      </div>
      
        <div className="scrollable-container">
        <div className="table-container">
          <table id="my-table"  className="data-table">
            <thead>
              <tr>
          
                <th style={{ width: '20%' }} colSpan={"6"}>Poste Demandé</th>
                <th style={{ width: '20%' }} colSpan={"5"}>Profil Recherché</th>

                <th style={{ width: '10%' }} colSpan="3">Motif Recrutement CDI</th>
          
                <th style={{ width: '20%' }} colSpan={"2"}>Autres Informations</th>

                <th className='form-action' style={{ width: '5%' }}></th>
              </tr>
              <tr>
              <th style={{ width: '5%' }}>Code Activité</th>
                <th style={{ width: '20%' }}>Intitulé Poste</th>
                <th style={{ width: '15%' }}>Catégorie</th>
                <th style={{ width: '4%' }}>CSP</th>
                <th style={{ width: '5%' }}>Fonction</th>
                <th style={{ width: '10%' }}>Lieu Travail</th>
          
                <th style={{ width: '20%' }}>Niveau requis</th>
                <th style={{ width: '20%' }}>Diplôme</th>
                <th style={{ width: '20%' }}>Spécialité</th>
                <th style={{ width: '20%' }}>Expérience</th>
                <th style={{ width: '20%' }}>Spécifités du Poste</th>
                <th >Motif</th>
                <th >Nombre</th>
                <th style={{ width: '7%' }}>Mode Recrutement</th>
                <th style={{ width: '10%' }}>Année</th>
                <th style={{ width: '20%' }}>Observation</th>
                <th className='form-action' style={{ width: '5%' }}>Action</th>
               
          
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.activite.codeAct}</td>
                  <td>{item.poste.intituleP}</td>
                  <td>{item.poste.echelle}</td>
                  <td> {item.poste.csp === "ING+" && "C"}
                      {item.poste.csp === "CS" && "CS"}
                          {item.poste.csp === "AC" && "AC"}
                          {item.poste.csp === "CU" && "CU"}
                        {(item.poste.csp === "TS" || item.poste.csp === "TECHNICIEN" || item.poste.csp === "AUTRE") && "M"}
                        {(item.poste.csp === "TECHNIQUE" || item.poste.csp === "ADM" || item.poste.csp === "Aide") && "E"}</td>
                  <td>{item.activite.fonction}</td>
                  <td>{item.LieuTravail}</td>
                  <td>{item.NiveauRequis}</td>
                  <td>{item.Diplome}</td>
                  <td>{item.Specialite}</td>
                  <td>{item.Experience}</td>
                  <td>{item.SpecifitesPoste}</td>
                  <td>{item.motif}</td>
                  <td >{item.nbEmploye}</td>
                  <td>{item.modeP}</td>
                  <td>{item.annee}</td>
                  <td>{item.observation}</td>
                  <td style={{ width: '5%' }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={`verification-icon ${!isCurrentYear ? 'disabled' : ''}`}
                        style={{ cursor: !isCurrentYear ? 'not-allowed' : 'pointer',
                                 color: '#ff0000' }}
                        onClick={() => openDeleteConfirmation(item.annee, item.poste.idPoste, item.idRecrut, item.idPmt)}
                      />
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
        <div className="pagin-container">
            {/*Pagination
            <div className="pagination">
              <ul>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                  <li
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
            {/*changing the number of items displayed per page
            <div className="items-per-page">
              
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(event) => setItemsPerPage(Number(event.target.value))}
              >
                <option value={100}>5</option>
                <option value={1000}>10</option>
                <option value={10000}>15</option>
                {/* Add more options as needed 
              </select>
            </div>
          */}
        </div>

       {/* Delete Confirmation Popup */}
       {showDeleteConfirmation && (
          <div className="confirmation-popup">
            <p>Voulez-vous vraiement supprimer cet utilisateur ?</p>
            <button onClick={() => handleDelete(anneeRecrut, idPoste,  idRecrut, idPmt)}>Confirm</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
          </div>
        )}

    </div>
  );
};

export default DataTablePR;

