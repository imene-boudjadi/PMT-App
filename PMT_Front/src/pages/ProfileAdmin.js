// Home.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import axios from '../axios'; 

import Footer from '../components/Footer'; 

import '../css styling/Profile.css'



const ProfileAdmin = () => {

    const [userInitial, setUserInitial] = useState(null);
    const [user, setUser] = useState(userInitial);


    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nouveauMotDePasse, setPasswordN] = useState('');
    const [ancienMotDePasse, setPasswordO] = useState('');

    const matricule = localStorage.getItem('matricule');

    const [error, setError] = useState('');
    const [exist, setExist] = useState('');



    //for the eye in the password input in order to show it or not:
    const [showPassword, setShowPassword] = useState(false);




    useEffect(() =>{
        fetchUserInfo(matricule);
    }, []);

    useEffect(() => {
        setUser(userInitial); // Only set user if userInitial is not empty
        // console.log(' userInitial:', userInitial);
        // console.log(' user:', user);
        // console.log(' user.nom:', user.nom); // Use optional chaining to prevent errors
    }, [userInitial]);


    //to prefill the inputs with the user's infos before updating them
    useEffect(() => {
        if (userInitial && userInitial[0]) {
            const userData = userInitial[0];
            setNom(userData.nom);
            setPrenom(userData.prenom);
            // Set other fields as needed
        }
    }, [userInitial]);



    const fetchUserInfo = async (matricule) => {
        try {
          const response = await axios.get(`/user/${matricule}`);
          const fetchedUser = response.data.user;
          setUserInitial(fetchedUser);
          console.log(' user matricule:', userInitial.matricule);
          console.log(' fetchedUser:', fetchedUser[0]);
         
        //   console.log(' userInitial:', userInitial);
      
        //   // Use userInitial directly here
        //   console.log(' user nom (within fetchUserInfo):', userInitial.user.nom);
        const profile = localStorage.getItem('profil');
        console.log('profile:', profile)
      
        } catch (error) {
          console.log(' user matricule:', matricule);
          console.log('Error fetching user:', error);
        }
      };
      

    const handleSubmit = async (event) => {
        event.preventDefault();

        const matricule = localStorage.getItem('matricule');
        try {
            const response = await axios.put('/modifierProfilAdmin', { 
            matricule, 
            nom, 
            prenom, 
            ancienMotDePasse, 
            nouveauMotDePasse
        });
          
        console.log('Modifié avec succés');
        window.location.href = '/ProfileAdmin';
  
        } catch (error) {

            setError("Erreur :  données incorrectes !")
            setExist(true);
            console.log('matricule: ', matricule);
          console.error('update failed:', error.response.data);
        }
        
    };


    
  return (
    <div>
        <HorizontalNavbar/>
        <VerticalNavbar/>
    
        <div className="profile-content">
            <div className="profile-box">
                <h1>Mon Profile</h1>
            </div>
            <div className="profile-card">

                <div className="user-icon">
                    <div className="circle">
                        <FontAwesomeIcon icon={faUser} size="5x" />
                    </div>

                    {user && user[0] ? (
                        <div className="user-info">
                            <h4>{user[0].nom}</h4>
                            <h4>{user[0].prenom}</h4>
                            <h4>{user[0].matricule}</h4>
                        </div>
                    ) : (
                        <div className="loading">Loading user information...</div>
                    )}

                </div>

                <div className="vertical-line" />

                <div className="edit-user-form">

                        <form onSubmit={handleSubmit}>
                            <div className="input-row">
                                <div className="input-group">
                                    <div className='user-field'>
                                        <label htmlFor="nom">Nom</label>
                                        <input
                                            type="text"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className='user-field'>
                                        <label htmlFor="password">Ancien Mot de passe</label>
                                        <div className="password-input-container">
                                            <input
                                                 type='password'
                                                 
                                                 name="password" required
                                                 value={ancienMotDePasse} onChange={(e) => setPasswordO(e.target.value)}
                                            />
                                            
                                        </div>
                                    </div>


                                    
                                </div>
                        
                                <div className="input-group">
                                <div className='user-field'>
                                        <label htmlFor="prenom">Prénom</label>
                                        <input
                                            type="text"
                                            value={prenom}
                                            onChange={(e) => setPrenom(e.target.value)}
                                        />
                                    </div >
                                    <br />
                                    <div className='user-field'>
                                        <label htmlFor="password">Nouveau Mot de passe</label>
                                        <div className="password-input-container">
                                            <input
                                                 type='password'
                                                 
                                                 name="password" 
                                                 value={nouveauMotDePasse} onChange={(e) => setPasswordN(e.target.value)}
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Modifier</button>
                        </form>
                    
                    
                </div>
                
                    
            </div>
        </div>

        <Footer />

    </div>
  );
};

export default ProfileAdmin;