import '../App.css';
import './NavBar.css';


import { useState } from 'react';

import { Link } from 'react-router-dom'

import { useUserContext } from './UserContext';

export default function NavBar() {

    const { currentUser, logout } = useUserContext()

    return (
        <nav className="navBar">
          {currentUser === null ? (
            <>
                <Link to="/login" className='link'>Login</Link>
                <Link to="/signup" className='link'>Signup</Link>
                <Link to="/home" className='link'>Home</Link>
            </>
          ) : (
            <>
              
              <Link to="/profile" className='link'>View Profile</Link>
              <Link to="/login" className='link'>Change user</Link>
              <Link to="/signup" className='link'>New Account</Link>
              <Link to="/home" className='link'>Home</Link>
             
            </>
          )}
        </nav>
      );
}