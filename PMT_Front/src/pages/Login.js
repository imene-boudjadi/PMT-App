import React, { Component, useState } from 'react';
import LoginForm from "../components/LoginForm";
import "../css styling/LoginForm.css";
import FooterLogin from '../components/FooterLogin';


const Login = () => {

    return (
<div id="login">
    <LoginForm/>
    <FooterLogin/>
</div>
    )
}

export default Login;