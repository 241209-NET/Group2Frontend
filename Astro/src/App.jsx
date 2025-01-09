import { useState } from 'react';
import './App.css';

import wallpaper from './assets/space_wallpaper.jpeg';

import NavBar from './components/NavBar';

import Home from './components/Home';

function App() {
  const [count, setCount] = useState(0);

  //const [loggedIn, loggedOut] = useState(loggedOut);

  return (
    <div>

      <div className="title">ASTRO</div>
      <NavBar></NavBar>
      <Home></Home>

      </div>

  );
}

export default App;