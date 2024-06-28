// DataTable.js
import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { faSearch, faEdit, faClose, faCheckCircle, faDownload  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DataTableMvtCsp = () => {
 


 //l'affichage:
const storedAnnee = localStorage.getItem('selectedYear');
const anneeDebPmt = parseInt(storedAnnee);

const [MvtCSP, setMVT] = useState([]);
const [dataa, setDataa]= useState('');

//the integration with the backend:
   useEffect(() => {
    fetchInfoCSP();
   }, []);

   useEffect(() => {
    setMVT(dataa);
    console.log(' dataa:',dataa);
    console.log(' MVT:',MvtCSP);
   }, [dataa]);

  const currentYear = new Date().getFullYear();
  const fetchInfoCSP = async () => {
    try {
      const response = await axios.get(`/AfficherMvmCSP/${anneeDebPmt}`);
      const data = response.data;
      setDataa(data);
      
      console.log(' data:',data);
      console.log(' annee:',anneeDebPmt);
    } catch (error) {
      
      console.log('Error fetching employees:', error);
    }
  };





 //to download the table: 
 const generatePDF = (tableId) => {
  const doc = new jsPDF();

  const table = document.getElementById(tableId);
  const title = `Mouvement des Effectifs par CSP ${storedAnnee}`;

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
    const filename = `MVT_EFF_CSP ${storedAnnee}.pdf`;
    doc.save(filename);
  });
};







const [columnTotals, setColumnTotals] = useState({
  RappelEffectifs: 0,
  PrevisionsCloture_Departs_Definitifs: 0,
  PrevisionsCloture_Departs_Internes: 0,
  PrevisionsCloture_Departs_Total: 0,
  PrevisionsCloture_Recrutements_Externes: 0,
  PrevisionsCloture_Recrutements_Internes: 0,
  PrevisionsCloture_Recrutements_Total: 0,
  PrevisionsCloture_Effectifs: 0,
  Previsions_Departs_Definitifs: 0,
  Previsions_Departs_Internes: 0,
  Previsions_Departs_Total: 0,
  Previsions_Recrutements_Externes: 0,
  Previsions_Recrutements_Internes: 0,
  Previsions_Recrutements_Total: 0,
  Previsions_Effectifs: 0,
});

// Calculate column totals whenever MvtCSP changes
useEffect(() => {
  const updatedColumnTotals = {
    RappelEffectifs: 0,
    PrevisionsCloture_Departs_Definitifs: 0,
    PrevisionsCloture_Departs_Internes: 0,
    PrevisionsCloture_Departs_Total: 0,
    PrevisionsCloture_Recrutements_Externes: 0,
    PrevisionsCloture_Recrutements_Internes: 0,
    PrevisionsCloture_Recrutements_Total: 0,
    PrevisionsCloture_Effectifs: 0,
    Previsions_Departs_Definitifs: 0,
    Previsions_Departs_Internes: 0,
    Previsions_Departs_Total: 0,
    Previsions_Recrutements_Externes: 0,
    Previsions_Recrutements_Internes: 0,
    Previsions_Recrutements_Total: 0,
    Previsions_Effectifs: 0,
    // Initialize the rest of the keys
  };

  Object.keys(MvtCSP).forEach((csp) => {
    const cspData = MvtCSP[csp];
    updatedColumnTotals.RappelEffectifs += parseInt(cspData.RappelEffectifs);
    updatedColumnTotals.PrevisionsCloture_Departs_Definitifs += parseInt(
      cspData.PrevisionsCloture.Departs.Definitifs
    );
    updatedColumnTotals.PrevisionsCloture_Departs_Internes += parseInt(
      cspData.PrevisionsCloture.Departs.Internes
    );
    updatedColumnTotals.PrevisionsCloture_Departs_Total += parseInt(
      cspData.PrevisionsCloture.Departs.Total
    );
    updatedColumnTotals.PrevisionsCloture_Recrutements_Externes += parseInt(
      cspData.PrevisionsCloture.Recrutements.Externes
    );
    updatedColumnTotals.PrevisionsCloture_Recrutements_Internes += parseInt(
      cspData.PrevisionsCloture.Recrutements.Internes
    );
    updatedColumnTotals.PrevisionsCloture_Recrutements_Total += parseInt(
      cspData.PrevisionsCloture.Recrutements.Total
    );
    updatedColumnTotals.PrevisionsCloture_Effectifs += parseInt(
      cspData.PrevisionsCloture.Effectifs
    );
    updatedColumnTotals.Previsions_Departs_Definitifs += parseInt(
      cspData.Previsions.Departs.Definitifs
    );
    updatedColumnTotals.Previsions_Departs_Internes += parseInt(
      cspData.Previsions.Departs.Internes
    );
    updatedColumnTotals.Previsions_Departs_Total += parseInt(
      cspData.Previsions.Departs.Total
    );
    updatedColumnTotals.Previsions_Recrutements_Externes += parseInt(
      cspData.Previsions.Recrutements.Externes
    );
    updatedColumnTotals.Previsions_Recrutements_Internes += parseInt(
      cspData.Previsions.Recrutements.Internes
    );
    updatedColumnTotals.Previsions_Recrutements_Total += parseInt(
      cspData.Previsions.Recrutements.Total
    );
    updatedColumnTotals.Previsions_Effectifs += parseInt(cspData.Previsions.Effectifs);

  });

  setColumnTotals(updatedColumnTotals);
}, [MvtCSP]);



  return (
    <div className="data-table-elements-container">
      
      <div className="search-download-container">
        
        <button style={{marginLeft: '92%', borderRadius: '50%'}} onClick={() => generatePDF('my-table')}>
          <FontAwesomeIcon icon={faDownload} style={{fontSize: '110%'}}  />
        </button>
        
      </div>
      
        <div className="scrollable-container">
        <div className="table-container">
        <table id="my-table" className="data-table">
        <thead>
          <tr>
            <th>CSP</th>
            <th>Rappel situation des effectifs au 31/12/{anneeDebPmt - 2}</th>
            <th colSpan="7">Prévisions cloture {anneeDebPmt - 1}</th>
            <th colSpan="7">Prévisions {anneeDebPmt}</th>

          </tr>
          <tr>
            <th></th>
            <th></th>
            <th colSpan="3">Departs</th>
            <th colSpan="3">Recrutements</th>
            <th>Effectifs</th>
            <th colSpan="3">Departs</th>
            <th colSpan="3">Recrutements</th>
            <th>Effectifs</th>
          </tr>
          <tr>
              <th></th>
              <th></th>
              <th>Definitifs</th>
              <th>Internes</th>
              <th>Total Depart</th>
              <th>Externe</th>
              <th>Interne</th>
              <th>Total Recrutement</th>
              <th></th>


              <th>Definitifs</th>
              <th>Internes</th>
              <th>Total Depart</th>
              <th>Externe</th>
              <th>Interne</th>
              <th>Total Recrutement</th>
              <th></th>

          </tr>
        </thead>
        <tbody>
          {Object.keys(MvtCSP).map((csp) => (
            <tr key={csp}>
              <td>{csp}</td>
              <td> {MvtCSP[csp].RappelEffectifs} </td>

              <td>{MvtCSP[csp].PrevisionsCloture.Departs.Definitifs}</td>
              <td>{MvtCSP[csp].PrevisionsCloture.Departs.Internes}</td>
              <td>{MvtCSP[csp].PrevisionsCloture.Departs.Total}</td>
              <td>{MvtCSP[csp].PrevisionsCloture.Recrutements.Externes}</td>
              <td>{MvtCSP[csp].PrevisionsCloture.Recrutements.Internes}</td>
              <td>{MvtCSP[csp].PrevisionsCloture.Recrutements.Total}</td>
              <td> {MvtCSP[csp].PrevisionsCloture.Effectifs} </td>

              <td>{MvtCSP[csp].Previsions.Departs.Definitifs}</td>
              <td>{MvtCSP[csp].Previsions.Departs.Internes}</td>
              <td>{MvtCSP[csp].Previsions.Departs.Total}</td>
              <td>{MvtCSP[csp].Previsions.Recrutements.Externes}</td>
              <td>{MvtCSP[csp].Previsions.Recrutements.Internes}</td>
              <td>{MvtCSP[csp].Previsions.Recrutements.Total}</td>
              <td> {MvtCSP[csp].Previsions.Effectifs} </td>
            </tr>
            
          ))}
           
         {/* Display the row with column totals */}
         <tr>
          <td>Total</td>
          <td>{columnTotals.RappelEffectifs}</td>
          <td>{columnTotals.PrevisionsCloture_Departs_Definitifs}</td>
          <td>{columnTotals.PrevisionsCloture_Departs_Internes}</td>
          <td>{columnTotals.PrevisionsCloture_Departs_Total}</td>
          <td>{columnTotals.PrevisionsCloture_Recrutements_Externes}</td>
          <td>{columnTotals.PrevisionsCloture_Recrutements_Internes}</td>
          <td>{columnTotals.PrevisionsCloture_Recrutements_Total}</td>
          <td>{columnTotals.PrevisionsCloture_Effectifs}</td>
          <td>{columnTotals.Previsions_Departs_Definitifs}</td>
          <td>{columnTotals.Previsions_Departs_Internes}</td>
          <td>{columnTotals.Previsions_Departs_Total}</td>
          <td>{columnTotals.Previsions_Recrutements_Externes}</td>
          <td>{columnTotals.Previsions_Recrutements_Internes}</td>
          <td>{columnTotals.Previsions_Recrutements_Total}</td>
          <td>{columnTotals.Previsions_Effectifs}</td>
        </tr>
        </tbody>
      </table>
          </div>
        </div>
       

       

    </div>
  );
};

export default DataTableMvtCsp;
    ;

