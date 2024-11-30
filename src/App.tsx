import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/auth/LoginPage/Login';
import Register from './pages/auth/RegisterPage/Register';
import Friends from './pages/friends/Friends';
import NavBar from './components/NavBar/NavBar';
import FitwIndexPage from './pages/games/fitw/FitwIndexPage/FitwIndexPage';

import axiosInstance from './interceptors/Axios';
import { User } from './interfaces/User';
import { getUser } from './services/AuthService';
import ShowUser from './pages/user/ShowUser/ShowUser';
import FitwScoreboardPage from './pages/games/fitw/FitwScoreboard/FitwScoreboardPage';
import LobbyPage from './pages/games/LobbyPage/LobbyPage';
import FitwGamePage from './pages/games/fitw/FitwGamePage/FitwGamePage';

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const login = async (username: string, password: string) => {
    const response = await axiosInstance.post('login', {
      username,
      password
    });
    
    const token = response.data.data.token;
    localStorage.setItem('JWToken', token);
    setAuthenticated(true);
  }

  const logout = () => {
    try {
      localStorage.removeItem('JWToken');
      setAuthenticated(false);
      window.location.href = '/login';
    } catch (e) {
      window.location.href = '/login';
    }
  }

  useEffect(() => {
    if (authenticated) return;
    if (localStorage.getItem('JWToken') !== null) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const authenticate = async () => {
      if (authenticated) {
        try {
          const user = await getUser();
          setUser(user);
        } catch (e) {
          setUser(undefined);
        }
      } else {
        setUser(undefined);
      }
    };

    authenticate();
  }, [authenticated]);



  return (
    <Router>
      <NavBar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:username" element={<ShowUser user={user} />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/lobby" element={<LobbyPage client={user} />} />
        <Route path="/fly-in-the-web" element={<FitwIndexPage />} />
        <Route path="/fly-in-the-web/scoreboard" element={<FitwScoreboardPage />} />
        <Route path="/fly-in-the-web/play" element={<FitwGamePage client={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
