import React, {useEffect, useState} from 'react';
import axios from '../axios'; 
import {useNavigate} from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import Footer from '../components/Footer';
import DataTablePD from '../components/DataTablePD';

import "../css styling/DataTable.css";
import "../css styling/PMT.css"
import AjoutDepart from '../components/PopUps/AjoutDepart';
import PMTElements from '../components/PMTElements';


const PageGardeElement= () => {


  const storedAnnee = localStorage.getItem('selectedYear');
  const anneepmt = parseInt(storedAnnee);
  
     //to display it in the title
  const fullAnnee = localStorage.getItem('fullSelectedYear');


 


  return (
    <div  className="data-table-elements-container center-content">

        <div className="acceuil-wrapper">
          <h3 style={{color: '#34444c'}}>DIRECTION FORMATION & PLANIFICATION RH</h3>
          <h5 style={{color: '#34444c'}}>PLAN RESSOURCES HUMAINES</h5>
          <h5 style={{color: '#34444c'}}>PMT ET PLAN ANNUEL</h5>
        </div>
  
  </div>
  
  );
}

export default PageGardeElement;
