import '../App.css';
import './NavBar.css';


import { useState } from 'react';

import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navBar">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/home">Home</Link>
        </nav>
    );
}