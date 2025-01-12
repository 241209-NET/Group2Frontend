import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext'; 
import { useNavigate } from 'react-router-dom';

import Review from './Review';

export default function Profile() {
    const { currentUser, logout, changePassword } = useUserContext();
    const navigate = useNavigate();

    function SignOut() {
        return (
            <button onClick={() => {logout(); navigate('/home');}}>Logout</button>
        );
    }

    const [pressedChangePasswordButton, setPressedChangePasswordButton] = useState(false);
    const [password, setPassword] = useState('');

    function UpdatePassword() {
        return (
            <div>
                <button onClick={() => setPressedChangePasswordButton(true)}>Change Password</button>
                {pressedChangePasswordButton && (
                    <div>
                        <input
                            className="user-input"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="New Password"
                        />
                        <button 
                            onClick={() => {
                                changePassword(password); 
                                setPressedChangePasswordButton(false);
                            }}
                        >
                            Set New Password
                        </button>
                    </div>
                )}
            </div>
        );
    }

    if (!currentUser) {
        navigate('/home');
        return null;
    }

    return (
        <div className="user-container">
            <h2>{currentUser}</h2>
            <div>
                <SignOut />
                <UpdatePassword />
            </div>

            
        </div>
       
        
    );
}