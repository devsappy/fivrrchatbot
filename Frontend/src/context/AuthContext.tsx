import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthResponse,
  AuthUser,
  loginRequest,
  logoutRequest,
  meRequest,
  signupRequest,
} from '../services/authApi';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await meRequest();
        setUser(response.authenticated ? response.user : null);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const refreshSession = async () => {
    try {
      const response = await meRequest();
      setUser(response.authenticated ? response.user : null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    setUser(response.user);
    return response;
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const response = await signupRequest(firstName, lastName, email, password);
    setUser(response.authenticated ? response.user : null);
    return response;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
