import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './UserContext';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const { logout, login } = useUserContext();
    const navigate = useNavigate();

    // Password validation regex
    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

    // Check if username is available
    async function isValidUsername(username) {
        try {
            const response = await axios.get(`https://p2-astro.azurewebsites.net/api/User/username/${username}`);
            //username is taken
            if (response.data) {
                alert(`Username "${username}" is already taken. Please choose another one.`);
                return false;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                //username is available
                return true;
            }
            alert('Error checking username: ', error);
            return false;
        }
        //other error occured
        return false;
    }

    // Add new user to the database
    async function addUser(user) {

        try {
            const response = await axios.post('https://p2-astro.azurewebsites.net/api/User/', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //alert('User added successfully: id ' + response.data.userId);
            logout();

            login(response.data);

        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                if (error.response.status === 400) {
                    console.error('Error 400:', error.response.data);
                }
            } else {
                console.error('Error adding user:', error);
            }
        }
    }

    // Handle signup process
    async function HandleSignup(event) {
        //Prevent form submission from refreshing the page
        event.preventDefault(); 

        if (!isValidPassword(password)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        if (!await isValidUsername(username)) {
            return;
        }

        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('invalid email address!');
            return;
        }

        

        const newUser = { username, password, email };

        await addUser(newUser);

        alert(`Welcome, ${username}!`);
        navigate('/home');
    }

    return (
        <div className="user-container">
            <h2>Sign Up for an account</h2>
            <form onSubmit={HandleSignup}>
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

                <div>
                    <input
                        className="user-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email"
                    />
                </div>

                <button type="submit" className="user-button">Sign Up</button>
            </form>
        </div>
    );
}