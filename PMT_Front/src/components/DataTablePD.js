// DataTable.js
import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { faSearch, faEdit, faClose, faCheckCircle, faDownload  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from './data';

const DataTablePD = () => {

  let [pmt, setPMT] = useState([]);
  const [filteredData, setFilteredData] = useState(pmt);






/*
  //for the pagination functionality: 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Change this line

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  */

  //to change the color of the validate button
  const [backendResponse, setBackendResponse] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleIconClick = () => {
    setClicked(true);
  };




 //l'affichage:
const storedAnnee = localStorage.getItem('selectedYear');
const anneePMT = parseInt(storedAnnee);

//to make the buttons and clickable icons disabled if the selected year is not the currentyear:
const currentYear = new Date().getFullYear();
const isCurrentYear = anneePMT === currentYear;

//the integration with the backend:
   useEffect(() => {
    fetchPMT();
   }, []);


    useEffect(() => {
     fetchAndUpdate(); // Call the combined fetch and update function
     
   }, [pmt, anneePMT]);

   
   const fetchPMT = async () => {
     try {
       const response = await axios.get(`/PrevDep/${anneePMT}`);
       const pmtFetch = response.data;
       setPMT(pmtFetch);

       const newStructure = localStorage.getItem('newStructure');
       console.log('newStructure ', newStructure);
 

       console.log(' pmtFetch:',pmtFetch);
       console.log(' annee:',anneePMT);

     } catch (error) {
       console.log('Error fetching pmt:', error);
     }
   };


   //for the search functionality:
  const [motsCles, setSearchTerm] = useState('');
    
  //for the pagination:
  //const [currentPage, setCurrentPage] = useState(1);
  //const [itemsPerPage, setItemsPerPage] = useState(5);  // Number of items per page, and the default value is 5

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    
    try {
      const response = await axios.get(`/RecherchePrevDep/${anneePMT}/${motsCles}`);
      setFilteredData(response.data);
      console.log('prevision search:', response.data);
      console.log('searchTerm:', motsCles);
      console.log('response:', response);
    } catch (error) {
      console.log('Error fetching SEARCH:', error);
      console.log('searchTerm:', motsCles);
    }
  };




  //Integration de la fonctionalites Validation:
   const [matricule, setMatricule] = useState('');
   const [anneeDep, setAnnee] = useState('');

   const annee = parseInt(anneeDep) ;

   const fetchAndUpdate = () => {
     // Fetch the data
    setFilteredData(pmt); // Update filteredData
  }; 
  
   const handleValiderRet = async (event) => {
       event.preventDefault();
    try {
      const response = await axios.post(`/validerRet`, { 
        matricule,
        annee
      }); 
      fetchPMT(); 
      console.log(response.data);
      console.log("matricule: ", matricule);
      console.log("annee: ", annee);
      setBackendResponse(response.data);
      console.log('Current Backend Response:', backendResponse);
      fetchAndUpdate();


    } catch (error) {
      console.log(error);
    }
  }


   


  //to download the table: 
  const generatePDF = (tableId) => {
    const doc = new jsPDF();

    const table = document.getElementById(tableId);
    const title = `Prévisions de Départ ${storedAnnee}`;

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

      const filename = `DEPART_CL ${storedAnnee}.pdf`;
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
            
              <thead > 
                <tr>
                  <th style={{ width: '15%' }}>Matricule</th>
                  <th style={{ width: '20%' }}>Nom & Prénom</th>
                  <th style={{ width: '5%' }}>Code Activité</th>
                  <th style={{ width: '20%' }}>Intitulé Poste</th>
                  <th style={{ width: '4%' }}>CSP</th>
                  <th style={{ width: '5%' }}>Fonction</th>
                  <th style={{ width: '10%' }}>Lieu de Travail</th>
                  <th style={{ width: '10%' }}>Motif de Départs</th>
                  <th style={{ width: '10%' }}>Année de Départs</th>
                  <th style={{ width: '20%' }}>Observation</th> {/*On doit la remplacer par une page où s'affiche les informations de l'employé*/ }
                  <th className='form-action' style={{ width: '5%' }}>Action</th>
                </tr>
              </thead>
        
              <tbody>
                {/*<p>valeur de currentData: {currentData}</p>*/}
                {filteredData.map(item => (
                  <tr key={item.id}> 
                  
                      <td style={{ width: '15%' }}>
                      {item.matricule}
                    </td>
                    <td style={{ width: '20%' }}>
                    {item.nom} {item.prenom} 
                    </td>
                    <td style={{ width: '20%' }}>{item.codeAct}</td>
                    <td style={{ width: '4%' }}>
                    {item.intituleP}
                    </td>
                    <td style={{ width: '5%' }}>
                     {/* Add your condition here */}
                      {item.csp === "ING+" && "C"}
                      {item.csp === "CS" && "CS"}
                      {item.csp === "AC" && "AC"}
                      {item.csp === "CU" && "CU"}
                      {(item.csp === "TS" || item.csp === "TECHNICIEN" || item.csp === "AUTRE") && "M"}
                      {(item.csp === "TECHNIQUE" || item.csp === "ADM" || item.csp === "Aide") && "E"}
  
                    </td>
                    <td style={{ width: '5%' }}>{item.fonction}</td>
                    <td style={{ width: '10%' }}>{item.lieuTravail}</td>
                    <td style={{ width: '10%' }}>{item.codeDep}</td>
                    <td style={{ width: '20%' }}>{item.annee}</td>
                    <td style={{ width: '5%' }}>{item.observation}</td>
                    <td style={{ width: '5%' }}> 
                     {item.codeDep === 'retraite' ? ( <div style={{ fontSize: '24px' }}>
                       
                     <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={`verification-icon ${!isCurrentYear ? 'disabled' : ''}`}
                        style={{
                          cursor: !isCurrentYear ? 'not-allowed' : 'pointer',
                          color: item.verifie === 1 ? '#009d00' : '#ff0000',
                        }}
                        onClick={(e) => {
                          if (isCurrentYear) {
                            setMatricule(item.matricule);
                            setAnnee(item.annee);
                            handleValiderRet(e);
                          }
                        }}
                      />
                     </div>): ( <div></div> )} 
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

       

    </div>
  );
};

export default DataTablePD;

