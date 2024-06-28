import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../axios';
import "../css styling/LoginForm.css";

const LoginForm = () => {


    const [matricule, setmatricule] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [error, setError] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);


    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await axios.post('/login', { matricule, password });
        const matriculee = response.data.administrateurId;
        const profil = response.data.profil;
        setAuthenticated(true);


        // Simulated token storage or usage (replace with your actual logic)
        localStorage.setItem('matricule', matriculee);
        localStorage.setItem('profil', profil);
        localStorage.setItem('isAuthenticated', isAuthenticated );

        console.log('matricule: ', matriculee)
        console.log('profil: ', profil)
        console.log('Login successful');
        console.log('isAuthenticated: ', isAuthenticated)
        if (isAuthenticated){
            navigate('/Acceuil');
        }
        //navigate('/Acceuil');

        } catch (error) {
            setError(error.response.data);
        console.error('Login failed:', error.response.data);
        setLoginFailed(true);
        console.log('matricule: ', matricule)
        console.log('password: ', password)
        }
    };

    return (

        <div> 
            {/* <img src={require('./sonatrachlogo.jpg').default} alt="LogoSonatrach" className="logo" /> */}
            <img src={process.env.PUBLIC_URL + '/logoSonatrach.png'} alt="LogoSonatrach" id="logo" />
                <div className="login-box">
                    <h1> Connexion</h1>
                    <form  onSubmit={handleSubmit}>
                        <label for="matricule" id="user">matricule</label>
                        <input 
                            type='text' 
                            placeholder="Entrer votre nom d'utilisateur" 
                            id="username" 
                            name="matricule" required
                            value={matricule} onChange={(e) => setmatricule(e.target.value)}
                        />

                        <label for="password" id="pass">Mot de passe</label>
                        <input 
                            type='password'
                            placeholder='Entrer votre mot de passe' 
                            id="password" 
                            name="password" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {loginFailed && <p className="login-failed">{error}</p>}
                        <br />
                        <button type="submit" className='login-btn'>Se connecter</button>
                    </form>
                </div>
      
        </div>
    )
}

export default LoginForm;