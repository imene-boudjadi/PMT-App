// DataTable.js
import React, { useState, useEffect } from 'react';
import axios from '../axios'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; 

import { faSearch, faEdit, faClose, faCheckCircle , faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from './data';

const DataTableEvlCsp = () => {
 


 //l'affichage:
const storedAnnee = localStorage.getItem('selectedYear');
const anneeDebPmt = parseInt(storedAnnee);


//pour recuperer la periode du pmt:
const fullYear = localStorage.getItem('fullSelectedYear');
const anneeFinPmt = parseInt(fullYear.substring(6,11));
const period = anneeFinPmt - anneeDebPmt;



const [EvolCSP, setEvol] = useState([]);
const [dataa, setDataa]= useState('');

//the integration with the backend:
   useEffect(() => {
    fetchInfoCSP();
   }, []);

   useEffect(() => {
    setEvol(dataa);
    console.log(' dataa:',dataa);
    console.log(' EVOL:',EvolCSP);
   }, [dataa]);

  const currentYear = new Date().getFullYear();
  const fetchInfoCSP = async () => {
    try {
      const response = await axios.get(`/EvolEffectifsCSP/${anneeDebPmt}`);
      const data = response.data;
      setDataa(data);
      
      console.log(' data:',data);
      console.log(' anneeD:',anneeDebPmt);
      console.log(' anneeF:',anneeFinPmt);
      console.log(' period:',period);


    } catch (error) {
      
      console.log('Error fetching Evolution CSP:', error);
    }
  };

 


   //to download the table: 
 const generatePDF = (tableId) => {
  const doc = new jsPDF();

  const table = document.getElementById(tableId);
  const title = `Evolution des Effectifs par CSP ${storedAnnee}`;

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
    const filename = `EVOL_EFF_CSP ${storedAnnee}.pdf`;

    doc.save(filename);
  });
};



//TO CREATE THE TOTAL: 
const [columnTotals, setColumnTotals] = useState({
  RealisationAn2: 0,
  RealisationAn1: 0,
  PrevCL: 0,
  // Add more keys for each year in the EvolutionEffectifs
});

useEffect(() => {
  // Step 2: Calculate column totals
  const updatedColumnTotals = {
    RealisationAn2: 0,
    RealisationAn1: 0,
    PrevCL: 0,
    // Initialize the rest of the keys
  };

  Object.keys(EvolCSP).forEach((csp) => {
    updatedColumnTotals.RealisationAn2 += parseInt(EvolCSP[csp].Effectifs.RealisationAn2);
    updatedColumnTotals.RealisationAn1 += parseInt(EvolCSP[csp].Effectifs.RealisationAn1);
    updatedColumnTotals.PrevCL += parseInt(EvolCSP[csp].Effectifs.PrevCL);
    // Accumulate values from the EvolutionEffectifs object
    // based on the keys for each year
  });

  setColumnTotals(updatedColumnTotals);
}, [EvolCSP]);


 // Step 1: Initialize state for dynamic column totals
 const [dynamicColumnTotals, setDynamicColumnTotals] = useState(
  new Array(period + 1).fill(0)
  
);

useEffect(() => {
  // Step 2: Calculate dynamic column totals
  const updatedDynamicColumnTotals = new Array(period + 1).fill(0);

  Object.keys(EvolCSP).forEach((csp) => {
    const cspData = EvolCSP[csp].EvolutionEffectifs; 


    // Using map to calculate dynamic column totals
    const dynamicTotalsForCsp = new Array(period + 1).fill(0).map((_, i) => {
     if (i== 0 ){
      return cspData[`PrevisionAn`] || 0;
     }else{
      return cspData[`PrevisionAn${i}`] || 0;
     }
      
    });

    for (let i = 0; i <= period; i++) {
      updatedDynamicColumnTotals[i] += parseInt(dynamicTotalsForCsp[i]);
    }
  });

  setDynamicColumnTotals(updatedDynamicColumnTotals);
}, [EvolCSP]);




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
            <th colSpan="3">Effectifs</th>
            <th colSpan={period+1}>Evolution des Effectifs</th>

          </tr>
          <tr>
            <th></th>
            <th >Réalisation au 31/12/{anneeDebPmt-2}</th>
            <th >Réalisation au 30/12/{anneeDebPmt-1}</th>
            <th>Prévision Clôture {anneeDebPmt-1} </th>

            {(() => {
                    const headers = [];
                    for (let i = 0; i <= period; i++) {
                        headers.push(<th key={i}>Prévision {anneeDebPmt + i}</th>);
                    }
                    return headers;
                })()}
          </tr>
        </thead>
        <tbody>
          {Object.keys(EvolCSP).map((csp) => (
            <tr key={csp}>
              <td>{csp}</td>

              <td>{EvolCSP[csp].Effectifs.RealisationAn2}</td>
              <td>{EvolCSP[csp].Effectifs.RealisationAn1}</td>
              <td>{EvolCSP[csp].Effectifs.PrevCL}</td>
              {Object.keys(EvolCSP[csp].EvolutionEffectifs).map((key, index) => (
                    <td key={index}>{EvolCSP[csp].EvolutionEffectifs[key]}</td>
                ))}

              
              
            </tr>
          ))}
          {/* Step 3: Display column totals */}
        <tr>
          <td>Total Permanent</td>
          <td>{columnTotals.RealisationAn2}</td>
          <td>{columnTotals.RealisationAn1}</td>
          <td>{columnTotals.PrevCL}</td>
         
          
          {/* Display dynamic column totals */}
          {dynamicColumnTotals.map((total, index) => (
            <td key={index}>{total}</td>
          ))}
        </tr>
          

        </tbody>
      </table>
          </div>
        </div>
       

       

    </div>
  );
};

export default DataTableEvlCsp;
    ;

