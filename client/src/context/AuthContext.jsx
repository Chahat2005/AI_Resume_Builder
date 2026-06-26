import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginRequest, register as registerRequest, getProfile as fetchProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ai-resume-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ai-resume-token') || '');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  useEffect(() => {
    if (token) {
      const syncProfile = async () => {
        try {
          const profile = await fetchProfile(token);
          setUser(profile);
        } catch (error) {
          setUser(null);
          setToken('');
          localStorage.removeItem('ai-resume-token');
          localStorage.removeItem('ai-resume-user');
        }
      };
      syncProfile();
    }
  }, [token]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3500);
  };

  const login = async (data) => {
    setLoading(true);
    const response = await loginRequest(data);
    localStorage.setItem('ai-resume-token', response.token);
    localStorage.setItem('ai-resume-user', JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
    setLoading(false);
    return response;
  };

  const register = async (data) => {
    setLoading(true);
    const response = await registerRequest(data);
    localStorage.setItem('ai-resume-token', response.token);
    localStorage.setItem('ai-resume-user', JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
    setLoading(false);
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('ai-resume-token');
    localStorage.removeItem('ai-resume-user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, toast, showToast, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
