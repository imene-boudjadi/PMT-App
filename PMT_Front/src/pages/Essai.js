import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = (tableId) => {
  const doc = new jsPDF();

  const table = document.getElementById(tableId);

  html2canvas(table).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    doc.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
    doc.save('table.pdf');
  });
};

const Essai = () => {
  return (
    <div>
      <table id="my-table" className="data-table">
      
        <thead>
          <tr>
            <th>Code Activité</th>
            <th>Activité</th>
            <th>Rappel situation des effectifs au 31/12/</th>
            <th colSpan="7">Prévision cloture </th>
            <th colSpan="7">Prévision cloture </th>

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
         <tr>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
          <td>hello</td>
         </tr>
        </tbody>
      
      </table>
      <button onClick={() => generatePDF('my-table')}>Download PDF</button>
    </div>
  );
};

export default Essai;
