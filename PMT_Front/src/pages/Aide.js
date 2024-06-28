// Aide.js
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import Footer from '../components/Footer'; 

import '../css styling/Aide.css'

const Aide = () => {
   
    const [selected, setSelected] = useState(null)//#endregion

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



    

    const toggle = (i) => {
        if (selected === i){
            return setSelected(null)
        }

        setSelected(i)
    } 
  
  return (
    <div>
        <HorizontalNavbar/>
        <VerticalNavbar/>
        <div className='aide-content'>
            <h1>Salut, Comment puis-je vous aider ?</h1>
            <img
                src={process.env.PUBLIC_URL + '/FAQ Photo.png'}
                alt="FAQImage"
                className="top-right-image"
            />
            <div className='accordion'>
                {data.map((item, i) => (
                    <div className='item'>

                        <div className="question" onClick={() => toggle(i)}>

                            <div className="title">
                                <FontAwesomeIcon icon={faCircle} style={{ fontSize: '10px', color: '#34444C' }} />
                                <h3>{item.question}</h3>
                            </div>

                            <span> {selected === i ? <FontAwesomeIcon icon={faMinus} style={{ color: 'rgba(128, 128, 128, 0.5)' }} />: <FontAwesomeIcon icon={faPlus} style={{ color: 'rgba(128, 128, 128, 0.5)' }}/>} </span>

                        </div>
                        <div className= {selected === i ? 'answer show':'answer'} >
                            {item.answer}
                        </div>

                    </div>
                ))}
            </div>

        </div>
        <Footer />

    </div>
  );
};

const data = [
    {
        question: ' Comment accéder à la page Mon profile ?',
        answer:
            "Pour le faire, il suffit d'appuyer sur le bouton 'profile' qui se situe en haut à droite apparaissant dans la bar orange."
    },
    {
        question: ' Comment consulter la liste des employés ?',
        answer:
            "Dans la bar de navigation verticale à gauche, appuyez sur 'Liste du Personnel', vous pourrez ainsi visualiser la liste mais aussi d'effectuer les opérations de modification et d'ajout. "
    },
    {
        question: ' Question qui exprime comment acceder au 1er tableau ?',
        answer:
            'Lorem ipsum dlor sity amet'
    },
    {
        question: ' Question qui exprime comment acceder au 1er tableau ?',
        answer:
            'Lorem ipsum dlor sity amet'
    },

]

export default Aide;
