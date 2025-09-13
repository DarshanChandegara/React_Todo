import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ initialMode = 'login', onClose }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  // Sync isLogin with initialMode prop changes
  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        result = await register(formData);
      }

      if (!result.success) {
        setError(result.message);
      } else if (onClose) {
        onClose();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container' style={{ position: 'relative' }}>
      {onClose && (
        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'transparent',
            border: 'none',
            fontSize: '2rem',
            color: '#888',
            cursor: 'pointer',
            zIndex: 10
          }}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
      <div className='login-form'>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <div className='error-message'>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className='form-group'>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className='form-group'>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className='link-button'
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;