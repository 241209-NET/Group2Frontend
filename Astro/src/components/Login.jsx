import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUserContext();
    const navigate = useNavigate();

    async function HandleLogin(event) {
        event.preventDefault();
    
        const user = { username, password };
    
        try {
            const response = await axios.post('https://p2-astro.azurewebsites.net/api/User/login', {
                username: username,
                password: password,
            });
    
            if (response.status === 200 && response.data) {
                const retrievedUsername = response.data.username;
                login(retrievedUsername); // Save user data in the context
                alert('Logged in successfully!');
                navigate('/home');
            } else {
                // If the response is invalid, alert the user
                alert('Invalid username or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            
            // Check if the error is from an invalid login attempt (e.g., Unauthorized)
            if (error.response && error.response.status === 401) {
                alert('Invalid username or password. Please try again.');
            } else {
                alert('An error occurred during login. Please try again.');
            }
        }
    }

    return (
        <div className="user-container">
            <h2>Login to your account</h2>
            <form onSubmit={HandleLogin}>
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
                <button type="submit" className="user-button">
                    Submit
                </button>
            </form>
        </div>
    );
}