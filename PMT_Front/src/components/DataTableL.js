// DataTable.js
import React, { useState, useEffect } from 'react';
import axios from '../axios'; 

import EditForm from './PopUps/EditForm'; 
import "../css styling/Edit.css"
import { faSearch, faEdit, faClose, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';







const DataTableL = () => {

  

  //the integration with the backend:
  let [employees, setEmployees] = useState([]);
  const [nbEmployees, setNB] = useState();
  const [filteredData, setFilteredData] = useState(employees);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredData(employees);
  }, [employees, nbEmployees]);
  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/employees');
      const fetchedEmployees = response.data.employees;
      setNB(response.data.totalEmployees);
      setEmployees(fetchedEmployees); // Update the state with fetched data

      console.log(' employeesFetch:',fetchedEmployees);
      console.log(' employees2:',employees);
      console.log(' nb:',nbEmployees);
    } catch (error) {
      
      console.log('Error fetching employees:', error);
    }
  };

  
  //for the search functionality:
  const [motsCles, setSearchTerm] = useState('');
  
  //for the pagination:
 // const [currentPage, setCurrentPage] = useState(1);
  //const [itemsPerPage, setItemsPerPage] = useState(5);  // Number of items per page, and the default value is 5

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    
    try {
      const response = await axios.get(`/RechercherEmployees/${motsCles}`);
      setFilteredData(response.data.employees);
      setNB(response.data.totalEmployees);
      console.log('response:', response.data.employees);
      console.log('searchTerm:', motsCles);
      console.log('response:', response);
    } catch (error) {
      console.log('Error fetching SEARCH:', error);
      console.log('searchTerm:', motsCles);
    }
  };
  

/*
  //for the pagination functionality: 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Change this line

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
*/
  //for the edit functionality:
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleIconClick = (item) => {
    setPopupOpen(true);
    setSelectedEmployee(item);
    console.log('SELECTEDeMPLYEE',selectedEmployee )
  };

  //to close the edit window:
  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  


//to download the table: 
  const generatePDF = (tableId) => {
    const doc = new jsPDF();
  
    const table = document.getElementById(tableId);

    const title = 'Liste du Personnels';

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
      doc.save('Liste du Personnels.pdf');
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
          <div  className="table-nb-employees-container">
            <div className="table-container">
            <table id="my-table" className="data-table">
              
                <thead >
                  <tr>
                    <th style={{ width: '3%' }}>N°</th>
                    <th style={{ width: '10%' }}>Code Fonction</th>
                    <th style={{ width: '20%' }}>Désignation Structure</th>
                    <th style={{ width: '15%' }}>Matricule</th>
                    <th style={{ width: '20%' }}>Nom</th>
                    <th style={{ width: '20%' }}>Intitulé Poste</th>
                    <th style={{ width: '10%' }}>Echelle</th>
                    <th style={{ width: '5%' }}>CSP</th>
                    <th style={{ width: '15%' }}>Date Recrutement</th>
                    <th style={{ width: '15%' }}>Date Naissance</th>
                    <th style={{ width: '5%' }}>Sexe</th>
                    <th style={{ width: '20%' }}>Diplôme</th>
                    <th style={{ width: '5%' }}>Valeur Diplôme</th>
                    <th className='form-action' style={{ width: '5%' }}>Action</th>
                  </tr>
                </thead>
          
                <tbody>
                  {/*<p>valeur de currentData: {currentData}</p>*/}
                  {filteredData.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ width: '10%' }}>{index + 1}</td>
                        <td style={{ width: '10%' }}>
                        {item.postes.map(poste => (
                          <div key={poste.idPoste}>{poste.codeSTR}</div>
                        ))}
                      </td>
                      <td style={{ width: '20%' }}>
                        {item.structures.map(structure => (
                          <div key={structure.idStructure}>{structure.designationS}</div>
                        ))}
                      </td>
                      <td style={{ width: '15%' }}>{item.matricule}</td>
                      <td style={{ width: '20%' }}>{item.nom} {item.prenom}</td>
                      <td style={{ width: '20%' }}>
                        {item.postes.map(poste => (
                          <div key={poste.idPoste}>{poste.intituleP}</div>
                        ))}
                      </td>
                      <td style={{ width: '20%' }}>
                        {item.postes.map(poste => (
                          <div key={poste.idPoste}>{poste.echelle}</div>
                        ))}
                      </td>
                      <td style={{ width: '5%' }}>
                        {item.postes.map(poste => (
                          <div key={poste.idPoste}> {/* Add your condition here */}
                          {poste.csp === "ING+" && "C"}
                          {poste.csp === "CU" && "CU"}
                          {poste.csp === "AC" && "AC"}
                          {poste.csp === "CS" && "CS"}
                          {(poste.csp === "TS" || poste.csp === "TECHNICIEN" || poste.csp === "AUTRE") && "M"}
                          {(poste.csp === "TECHNIQUE" || poste.csp === "ADM" || poste.csp === "AIDE") && "E"}
                      </div>
                        ))}
                      </td>
                      <td style={{ width: '15%' }}>{item.dateRecrut}</td>
                      <td style={{ width: '15%' }}>{item.dateNaiss}</td>
                      <td style={{ width: '5%' }}>{item.sexe}</td>
                      <td style={{ width: '20%' }}>
                        {item.diplomes.map(diplome => (
                          <div key={diplome.idDipl}>{diplome.designationD}</div>
                        ))}
                      </td>
                      <td style={{ width: '5%' }}>
                        {item.diplomes.map(diplome => (
                          <div key={diplome.idDipl}>{diplome.valeurD}</div>
                        ))}
                      </td>
                      <td style={{ width: '5%' }}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ cursor: 'pointer', color: '#f48220' }}
                          onClick={() => handleIconClick(item)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
            </div>
            <div className="nb-employees">
              <p>{nbEmployees} employés</p>
            </div>
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
            */}
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

        {/* the Edit Functionality*/}
        <div>
          {isPopupOpen && (
            <div>
              <div className="overlay" onClick={handlePopupClose} />
              <div className="popup-container">
                <div className="popup">
                  <div className="popup-header">
                    <button className="close-button" onClick={handlePopupClose}>
                      <FontAwesomeIcon icon={faClose}  />
                    </button>
                  </div>
                  <div className="popup-content-scrollable">
                    <EditForm onClose={handlePopupClose} selectedEmployee={selectedEmployee} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
          

    </div>
  );
};

export default DataTableL;

