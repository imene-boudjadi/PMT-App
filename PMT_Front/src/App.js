import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Aide from './pages/Aide';
import ProfileAdmin from './pages/ProfileAdmin';
import ProfileUser from './pages/ProfileUser';
import ListePersonnel from './pages/ListePersonnel';
import ListePersArchive from './pages/ListePersArchive';
import AjoutPersonnel from './pages/AjoutPersonnel';
import Login from './pages/Login';
import Essai from './pages/Essai';
import PrevisionsDepart from './pages/PrevisionsDepart';
import PrevisionsRecrutement from './pages/PrevisionsRecrutement';
import MvtEffectifCsp from './pages/MvtEffectifCsp';
import EvolEffectifsCsp from './pages/EvolEffectifsCsp';
import MvtEffectifAct from './pages/MvtEffectifAct';
import GestionComptes from './pages/GestionComptes';
import PageDeGarde from './pages/PageDeGarde';


 


const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return (
    <div>
      <Router>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/Essai" element={<Essai />} />
          <Route path="/Acceuil" element={<Home />} />
          {/* <Route path="/Aide" element={<Aide />} /> */}
          <Route path="/ProfileAdmin" element={<ProfileAdmin />} />
          <Route path="/ProfileUser" element={<ProfileUser />} />
          <Route path="/ListePersonnel" element={<ListePersonnel />} />
          <Route path="/ListePersArchive" element={<ListePersArchive />} />
          <Route path="/AjoutPersonnel" element={<AjoutPersonnel />} />
          <Route path="/PageDeGarde" element={<PageDeGarde />} />
          <Route path="/PrevisionsDepart" element={<PrevisionsDepart />} />
          <Route path="/PrevisionsRecrutement" element={<PrevisionsRecrutement />}/>
          <Route path="/MvtEffectifCsp" element={<MvtEffectifCsp />} />
          <Route path="/MvtEffectifAct" element={<MvtEffectifAct />} />
          <Route path="/EvolEffectifCsp" element={<EvolEffectifsCsp />} />
          <Route path="/GestionDesComptes" element={<GestionComptes />} />   
        </Routes>
      </Router>
    </div>
  );
};

export default App;
