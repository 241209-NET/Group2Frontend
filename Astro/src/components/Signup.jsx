import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import  useUserContext  from './UserContext';

import Login from './Login';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const { login } = useUserContext();

    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

    /*
    async function isValidUsername(username) {
        try {
            const response = await axios.get(`https://Astro/Users/check/${username}`);
            return response.data.isAvailable;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async function addUser(user) {
        try {
            await axios.post('https://Astro/Users', user);
            login();
        } catch (error) {
            console.error('Error adding user', error);
        }
    }

    async function handleSignup() {

        if (!await isValidUsername(username)) {
            
            return;
        }

        // Check if password is strong
        if (!isValidPassword(password)) {

            return;
        }

        const newUser = { username, password };
        await addUser(newUser);
    }
        */

    const testUsername = "TestName";
    const testPassword = "TestPassword!123";
    function testHandleSignup() {

        if (testUsername === username && testPassword === password) {

            alert("success");

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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="password"
                />
            </div>

            <button className="user-button" onClick={testHandleSignup()}>Sign Up</button>

        </div>
    );
}