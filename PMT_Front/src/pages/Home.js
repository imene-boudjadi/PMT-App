// Home.js
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import PieChart from '../components/PieChart';
import Histogram from '../components/Histogram';
import "../css styling/Home.css"
import Footer from '../components/Footer'; 


const Home = () => {

  //to display it in the title
  const currentYear = new Date().getFullYear();


//for the login
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(()=>{
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      console.log('isAuthenticated: ', isAuthenticated)
      if ( isAuthenticated == 'false'){
          navigate('/');	
      }

  },[]);

  return (
    <div>
      <HorizontalNavbar/>
      <VerticalNavbar/>
      
      <div className="home-content">
      <div className="home-box">
        <h1>Statistiques sur l'année {currentYear}</h1>
      </div>
     

      <div className="charts-container">
          <PieChart />
          <Histogram />
        </div>
      

      
    </div>
      <Footer />

    </div>
  );
};

export default Home;