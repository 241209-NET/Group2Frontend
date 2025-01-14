import './Profile.css';
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
            <button onClick={() => {logout(); navigate('/home');}} className="profile-button">Logout</button>
        );
    }

    const [pressedChangePasswordButton, setPressedChangePasswordButton] = useState(false);
    const [password, setPassword] = useState('');

    function UpdatePassword() {
        return (
            <div>
                <button onClick={() => setPressedChangePasswordButton(true)} className="profile-button">Change Password</button>
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
                            className="profile-button">
                            Set New Password
                        </button>
                        <button onClick={() => setPressedChangePasswordButton(false)} className="profile-button">
                            Cancel change password
                        </button>
                    </div>
                )}
            </div>
        );
    }

    const [pressedDeleteProfileButton, setPressedDeleteProfileButton] = useState(false);

    function DeleteProfile({ username, password}) {
        
        const [pressedConfirmDeleteProfileButton, setPressedConfirmDeleteProfileButton] = useState(false);
    
        async function handleDelete() {
            try {
                // REPLACE WITH ACTUAL BACKEND LATER
                const response = await axios.delete(`http://localhost:5080/api/user`, {
                    data: { username, password }, // Data should be in the body for DELETE requests
                });
    
                if (response.data.success) {
                    logout();
                }
            } catch (error) {
                console.error("Error deleting profile:", error);
            }
        }
    
        return (
            <div>
                {!pressedDeleteProfileButton && (
                    <button onClick={() => setPressedDeleteProfileButton(true)} className="profile-button">
                        Delete Account
                    </button>
                )}
    
                {pressedDeleteProfileButton && (
                    <div>
                        <p>Are you sure you want to delete this account?</p>
                        <button
                            onClick={() => {
                                setPressedConfirmDeleteProfileButton(true);
                                handleDelete();
                            }}
                        className="delete-button"
                        >
                            Yes, I want to delete this account
                        </button>
                        <button onClick={() => setPressedDeleteProfileButton(false)} className="profile-button">
                            No, I change my mind
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
                {!pressedDeleteProfileButton && (
                    <div>

                        <SignOut />
                        <UpdatePassword />

                    </div>
                )}
                {!pressedChangePasswordButton && (
                    <div>
                    <DeleteProfile />
                    </div>
                )}
            </div>

            
        </div>
       
        
    );
}