import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './component/Login';
import Todo from './component/Todo';

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <div className="app-header">
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      <Todo />
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
