import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './component/Login';
import Todo from './component/Todo';

import React, { useState } from 'react';

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <div className="app-header">
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: '1.7rem', marginRight: '2rem' }}>
              Welcome, {user?.username}!
            </span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <button className="logout-btn" onClick={handleLoginClick}>Login</button>
            <button className="logout-btn" onClick={handleRegisterClick} style={{ marginLeft: '1rem', background: 'linear-gradient(90deg, #6c63ff 60%, #4b3cc4 100%)' }}>Register</button>
          </>
        )}
      </div>
      <Todo
        isAuthenticated={isAuthenticated}
        onRequireLogin={handleLoginClick}
      />
      {(showLogin || showRegister) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            <Login initialMode={showRegister ? 'register' : 'login'} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
