import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { useUserContext }  from './UserContext';

import { useNavigate } from 'react-router-dom';

import Login from './Login';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { currentUser, login } = useUserContext();

    const navigate = useNavigate();
      

    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }


    async function isValidUsername(username) {
        
        try {
            const response = await axios.get(`http://localhost:5080/api/User/${username}`);
            
            //return true is username is not taken
            if (response.data === null) {

                return true;

            }
            else {

                return false;

            }

        } 
        catch (error) {
            console.error("Error searching usernames: ", error);
            return false;
        }
    }

    async function addUser(user) {
        try {
            //CHANGE ROUTE LATER
            await axios.post(`http://localhost:5080/api/User`, user);
        } catch (error) {
            console.error('Error adding user ', error);
        }
    }

    async function HandleSignup() {

        if (!await isValidUsername(username)) {
            //alert("Invalid Username");
            return;
        }

        // Check if password is strong
        if (!isValidPassword(password)) {
            //alert("Invalid Password");
            return;
        }

        const newUser = { username, password };
        await addUser(newUser);
        login(username);
        
        alert(`Welcome, ${username}!`);

        navigate('/home');

    }


    const testUsername = "TestName";
    const testPassword = "TestPassword!123";
    function testHandleSignup() {

        if (!currentUser && (testUsername === username && testPassword === password)) {

            alert("success");
                navigate('/home');
                return null;
            }

        }

    




    return (
        
        <div className="user-container">
            <h2>Sign Up for an account</h2>

            <div>
                <input
                    className="user-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                />
            </div>

            <div>
                <input
                    className="user-input"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="password"
                />
            </div>

            <button className="user-button" onClick={HandleSignup()}>Sign Up</button>

        </div>
    );
}