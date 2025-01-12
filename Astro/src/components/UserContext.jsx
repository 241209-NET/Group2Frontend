import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
    // Initialize from localStorage or set to null
    const [currentUser, setCurrentUser] = useState(() => {
        return localStorage.getItem('currentUser') || null;
    });

    const [currentPassword, setPassword] = useState(() => {
        return localStorage.getItem('currentPassword') || null;
    });

    useEffect(() => {

        if (currentUser) {
            localStorage.setItem('currentUser', currentUser);
            localStorage.setItem('currentPassword', currentPassword);
        } 
        else {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentPassword');
        }

    }, [currentUser]);

    function login(username) {
        setCurrentUser(username); 
    }

    function logout() {
        setCurrentUser(null);
        setCurrentPassword(null);
    }

    function ChangePassword(newPassword) {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (regex.test(password)) {

          setPassword(newPassword);

        }
        else {

          alert("Invalid Password!");

        }
    }

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}