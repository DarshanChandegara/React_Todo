const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  refresh: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' // Include cookies - refresh token comes from cookie
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' // Include cookies - refresh token comes from cookie
    });
    return response.json();
  }
};

// Todo API calls
export const todoAPI = {
  getTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      credentials: 'include' // Include cookies for authentication
    });
    return response.json();
  },

  createTodo: async (todoData) => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies for authentication
      body: JSON.stringify(todoData)
    });
    return response.json();
  },

  updateTodo: async (id, todoData) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies for authentication
      body: JSON.stringify(todoData)
    });
    return response.json();
  },

  deleteTodo: async (id) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      credentials: 'include' // Include cookies for authentication
    });
    return response.json();
  },

  deleteAllTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'DELETE',
      credentials: 'include' // Include cookies for authentication
    });
    return response.json();
  }
};