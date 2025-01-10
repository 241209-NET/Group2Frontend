import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserContext  from './UserContext';
import axios from 'axios';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //some reason this causes site not to run
    //const { login } = useUserContext();
  
    async function handleLogin(event) {

        /*
        event.preventDefault(); 
    
        try {
            //REPLACE WITH ACTUAL BACKEND LATER
            const response = await axios.get(`http://localhost:5080/api/user/login`, {
                username,
                password,
            });

            if (response.data.success) {
                login(); 
            } else {
            }

        } catch (error) {

            console.error("Login error:", error);

        }
        */

        alert("FINISH CODE LATER");



    }
        

    return (
        <div className="user-container">
            <h2>Login to your account</h2>

            <div>
                <div>
                    <input
                        className="user-input"
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

                <button type="submit" onClick={handleLogin} className="user-button">Submit</button>

            </div>

        </div>
    );
}