import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, handleAPIError } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const checkAuth = async () => {
      try {
        // First check localStorage for quick startup
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
          setIsAuthenticated(true);
          const userData = localStorage.getItem('userData');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }

        // Then verify with backend
        try {
          const response = await authAPI.getCurrentUser();
          if (response.data && response.data.user) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(response.data.user));
          }
        } catch (error) {
          // If backend verification fails, clear local auth
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userData');
          localStorage.removeItem('userEmail');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('userEmail');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data && response.data.user) {
        const userData = response.data.user;

        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userEmail', email);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        setIsAuthenticated(true);
        setUser(userData);

        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = handleAPIError(error, 'Login failed');
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (formData) => {
    try {
      const response = await authAPI.signup(formData);
      
      if (response.data && response.data.user) {
        const userData = response.data.user;

        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userEmail', formData.email);

        setIsAuthenticated(true);
        setUser(userData);

        return { success: true, user: userData };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = handleAPIError(error, 'Registration failed');
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Clear all authentication data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('rememberMe');

      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const resetPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      return { 
        success: true, 
        message: response.data?.message || 'Password reset email sent' 
      };
    } catch (error) {
      const errorMessage = handleAPIError(error, 'Failed to send reset email');
      return { success: false, error: errorMessage };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authAPI.changePassword({ 
        currentPassword, 
        newPassword 
      });
      return { 
        success: true, 
        message: response.data?.message || 'Password changed successfully' 
      };
    } catch (error) {
      const errorMessage = handleAPIError(error, 'Failed to change password');
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    resetPassword,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;