import './Profile.css';
import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext'; 
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Review from './Review';

export default function Profile() {
    const { currentUser, changePassword } = useUserContext();
    const { logout } = useUserContext();
    const navigate = useNavigate();

    function SignOut() {
        return (
            <button onClick={() => {navigate('/home'); logout();}} className="profile-button">Logout</button>
        );
    }

    const [pressedChangePasswordButton, setPressedChangePasswordButton] = useState(false);
    const [password, setPassword] = useState('');

    /*
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
    */

    const [pressedDeleteProfileButton, setPressedDeleteProfileButton] = useState(false);

    const [pressedConfirmDeleteProfileButton, setPressedConfirmDeleteProfileButton] = useState(false);

    function DeleteProfile({ username }) {
        const [pressedDeleteProfileButton, setPressedDeleteProfileButton] = useState(false);
        const [pressedConfirmDeleteProfileButton, setPressedConfirmDeleteProfileButton] = useState(false);

        async function handleDelete() {
            try {
                const response = await axios.get(`https://p2-astro.azurewebsites.net/api/User/username/${currentUser}`);
            
                if (response.data) {
                    //alert(`User ID for "${username}" is ${response.data.userId}`);
                    try {
                        const responseDelete = await axios.delete(`https://p2-astro.azurewebsites.net/api/User/${response.data.userId}`);
                        if (responseDelete.status === 200) {
                            logout();
                            
                        }
                    } catch (deletionError) {
                        console.error("Error deleting profile:", deletionError);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
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
                                handleDelete(); // Call handleDelete when confirmed
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

    useEffect(() => {

        if (!currentUser) {
            navigate('/home');
            //return null;
        }
     

    }, [currentUser]);



    return (

        <div className="user-container">
            <h2>{currentUser}</h2>
            <div>
                {!pressedDeleteProfileButton && (
                    <div>

                        <SignOut />

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