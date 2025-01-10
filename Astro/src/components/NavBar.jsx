import '../App.css';
import './NavBar.css';


import { useState } from 'react';

import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navBar">
            <Link to="/login" className='link'>Login</Link>
            <Link to="/signup" className='link'>Signup</Link>
            <Link to="/home" className='link'>Home</Link>
        </nav>
    );
}