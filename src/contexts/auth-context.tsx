import { signOut } from 'firebase/auth';
import React, { createContext, useContext, useState } from 'react';
import firebase from '../config/firebase/firebase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void; // Ensure that logout returns a Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const authContextValue: AuthContextType = {
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
