import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

/*
In this code, children refers to the components or elements that are wrapped by 
the UserProvider component when it is used. 
The children prop is a special prop in React that represents the content nested inside a component.

*/
export default function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
  }

  return (

    <UserContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </UserContext.Provider>

  );
}