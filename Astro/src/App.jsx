import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile'; // Import Profile component
import UserProvider from './components/UserContext';
import Search from './components/Search';

function App() {

  return (
    <UserProvider>
      <Router>
      <div>
        <div className="title">ASTRO</div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      </Router>
    </UserProvider>
  );
}

export default App;