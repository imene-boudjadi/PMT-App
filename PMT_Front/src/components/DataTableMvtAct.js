// DataTable.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; 

import { faSearch, faEdit, faClose, faCheckCircle , faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DataTableMvtAct = () => {



 //l'affichage:
 const storedAnnee = localStorage.getItem('selectedYear');
 const anneeDebPmt = parseInt(storedAnnee);
 
 const [MvtAct, setMVT] = useState([]);
 const [dataa, setDataa]= useState('');
 
 //the integration with the backend:
    useEffect(() => {
     fetchInfoAct();
    }, []);
 
    useEffect(() => {
     setMVT(dataa);
     console.log(' dataa:',dataa);
     console.log(' MVT:',MvtAct);
    }, [dataa]);
 
   const currentYear = new Date().getFullYear();
   const fetchInfoAct = async () => {
     try {
       const response = await axios.get(`/AfficherMvmActivite/${anneeDebPmt}`);
       const data = response.data;
       setDataa(data);
       
       console.log(' data:',data);
       console.log(' annee:',anneeDebPmt);
     } catch (error) {
       
       console.log('Error fetching mouvements:', error);
       console.log(' data:',dataa);
     }
   };
 
 


 //to download the table: 
 const generatePDF = (tableId) => {
  const doc = new jsPDF();

  const table = document.getElementById(tableId);
  const title = `Mouvement des Effectifs par Activités ${storedAnnee}`;

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

    const filename = `MVT_EFF_ACT ${storedAnnee}.pdf`;
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
  // Add more keys for each column in the table
});

// Calculate column totals whenever MvtAct changes
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

  Object.keys(MvtAct).forEach((activité) => {
    const activitéData = MvtAct[activité];
    updatedColumnTotals.RappelEffectifs += parseInt(activitéData.RappelEffectifs);
    updatedColumnTotals.PrevisionsCloture_Departs_Definitifs += parseInt(
      activitéData.PrevisionsCloture.Departs.Definitifs
    );
    updatedColumnTotals.PrevisionsCloture_Departs_Internes += parseInt(
      activitéData.PrevisionsCloture.Departs.Internes
    );
    updatedColumnTotals.PrevisionsCloture_Departs_Total += parseInt(
      activitéData.PrevisionsCloture.Departs.Total
    );
    updatedColumnTotals.PrevisionsCloture_Recrutements_Externes += parseInt(
      activitéData.PrevisionsCloture.Recrutements.Externes
    );
    updatedColumnTotals.PrevisionsCloture_Recrutements_Internes += parseInt(
      activitéData.PrevisionsCloture.Recrutements.Internes
    );
    updatedColumnTotals.PrevisionsCloture_Recrutements_Total += parseInt(
      activitéData.PrevisionsCloture.Recrutements.Total
    );
    updatedColumnTotals.PrevisionsCloture_Effectifs += parseInt(
      activitéData.PrevisionsCloture.Effectifs
    );
    updatedColumnTotals.Previsions_Departs_Definitifs += parseInt(
      activitéData.Previsions.Departs.Definitifs
    );
    updatedColumnTotals.Previsions_Departs_Internes += parseInt(
      activitéData.Previsions.Departs.Internes
    );
    updatedColumnTotals.Previsions_Departs_Total += parseInt(
      activitéData.Previsions.Departs.Total
    );
    updatedColumnTotals.Previsions_Recrutements_Externes += parseInt(
      activitéData.Previsions.Recrutements.Externes
    );
    updatedColumnTotals.Previsions_Recrutements_Internes += parseInt(
      activitéData.Previsions.Recrutements.Internes
    );
    updatedColumnTotals.Previsions_Recrutements_Total += parseInt(
      activitéData.Previsions.Recrutements.Total
    );
    updatedColumnTotals.Previsions_Effectifs += parseInt(activitéData.Previsions.Effectifs);
    
  });

  setColumnTotals(updatedColumnTotals);
}, [MvtAct]);





 

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
            <th>Code Activité</th>
            <th>Activité</th>
            <th>Rappel situation des effectifs au 31/12/{anneeDebPmt - 2}</th>
            <th colSpan="7">Prévisions cloture {anneeDebPmt - 1}</th>
            <th colSpan="7">Prévisions {anneeDebPmt}</th>

          </tr>
          <tr>
            <th></th>
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
          {Object.keys(MvtAct).map((activité) => (
            <tr key={activité}>
              
              <td>{MvtAct[activité].code} </td>
              <td>{activité}</td>
              <td> {MvtAct[activité].RappelEffectifs} </td>

              <td>{MvtAct[activité].PrevisionsCloture.Departs.Definitifs}</td>
              <td>{MvtAct[activité].PrevisionsCloture.Departs.Internes}</td>
              <td>{MvtAct[activité].PrevisionsCloture.Departs.Total}</td>
              <td>{MvtAct[activité].PrevisionsCloture.Recrutements.Externes}</td>
              <td>{MvtAct[activité].PrevisionsCloture.Recrutements.Internes}</td>
              <td>{MvtAct[activité].PrevisionsCloture.Recrutements.Total}</td>
              <td> {MvtAct[activité].PrevisionsCloture.Effectifs} </td>

              <td>{MvtAct[activité].Previsions.Departs.Definitifs}</td>
              <td>{MvtAct[activité].Previsions.Departs.Internes}</td>
              <td>{MvtAct[activité].Previsions.Departs.Total}</td>
              <td>{MvtAct[activité].Previsions.Recrutements.Externes}</td>
              <td>{MvtAct[activité].Previsions.Recrutements.Internes}</td>
              <td>{MvtAct[activité].Previsions.Recrutements.Total}</td>
              <td> {MvtAct[activité].Previsions.Effectifs} </td>
            </tr>
          ))}
            {/* Display the row with column totals */}
        <tr>
          <td>Total</td>
          <td></td> {/* Empty cell for the "Activité" column */}
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

export default DataTableMvtAct;
    ;

