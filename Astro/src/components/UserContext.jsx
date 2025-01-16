import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
    // Initialize from localStorage or set to null
    const [currentUser, setCurrentUser] = useState(() => {
        return localStorage.getItem('currentUser') || null;
    });

    /*
    const [currentPassword, setPassword] = useState(() => {
        return localStorage.getItem('currentPassword') || null;
    });
    */

    const [currentId, setCurrentId] = useState(() => {
        return localStorage.getItem('currentId') || null;
    });

    const [currentEmail, setCurrentEmail] = useState(() => {
        return localStorage.getItem('currentEmail') || null;
    });

    useEffect(() => {

        if (currentUser) {
            localStorage.setItem('currentUser', currentUser);
            localStorage.setItem('currentId', currentId);
            localStorage.setItem('currentPassword', currentEmail);

        } 
        else {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentEmail');
            localStorage.removeItem('currentId');
        }

    }, [currentUser]);

    function login(user) {
        setCurrentUser(user.username); 
        setCurrentId(user.userId);
        setCurrentEmail(user.email);
        
    }

    function logout() {
        setCurrentUser(null);
        setCurrentId(null);
        setCurrentEmail(null);
    }

    /*
    function ChangePassword(newPassword) {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (regex.test(password)) {

          setPassword(newPassword);

        }
        else {

          alert("Invalid Password!");

        }
    }
    */

    return (
        <UserContext.Provider value={{ currentUser, currentId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}