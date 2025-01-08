import '../App.css';

import { useState } from 'react';

import { Link } from 'react-router-dom'

export default function NavBar() {

    return ( 

        <nav className="navBar">
            <a href="/logian">Login</a>
            <a href="/signup">Signup</a>
            <a href="/home">Home</a>
            <a href="/About">About</a>
        </nav>
    
    )

}