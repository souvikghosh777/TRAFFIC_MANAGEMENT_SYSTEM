import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data - replace with actual API calls
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@traffic.gov',
    role: 'Traffic Manager',
    avatar: '/api/placeholder/40/40',
    permissions: ['dashboard', 'analytics', 'settings'],
    department: 'Traffic Operations',
    lastLogin: new Date().toISOString(),
  };

  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Mock login API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      if (credentials.email && credentials.password) {
        const userData = {
          ...mockUser,
          email: credentials.email,
          lastLogin: new Date().toISOString(),
        };
        
        // Save to localStorage
        localStorage.setItem('auth_token', 'mock_jwt_token');
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        ...mockUser,
        name: userData.name,
        email: userData.email,
        id: Date.now().toString(),
      };
      
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user_data', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      
      // Mock profile update API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};