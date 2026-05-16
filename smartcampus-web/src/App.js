import React, { useState } from 'react';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import MapPage from './pages/MapPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import PendingPage from './pages/PendingPage';
import AdminPage from './pages/AdminPage';
import Chatbot from './components/Chatbot';
import './App.css';

export default function App() {
  const [page, setPage] = useState('splash');
  const [mapRoom, setMapRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = (to, params = null) => {
    if (to === 'map' && params) setMapRoom(params);
    else setMapRoom(null);
    setPage(to);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('splash');
  };

  const props = { navigate, mapRoom, currentUser, setCurrentUser, logout };

  const showChatbot = ['dashboard', 'schedule', 'map', 'notifications', 'profile'].includes(page);

  return (
    <div className="app-shell">
      {page === 'splash' && <SplashPage {...props} />}
      {page === 'login' && <LoginPage {...props} />}
      {page === 'register' && <RegisterPage {...props} />}
      {page === 'pending' && <PendingPage {...props} />}
      {page === 'dashboard' && <DashboardPage {...props} />}
      {page === 'schedule' && <SchedulePage {...props} />}
      {page === 'map' && <MapPage {...props} />}
      {page === 'notifications' && <NotificationsPage {...props} />}
      {page === 'profile' && <ProfilePage {...props} />}
      {page === 'admin' && <AdminPage {...props} />}
      {showChatbot && <Chatbot />}
    </div>
  );
}