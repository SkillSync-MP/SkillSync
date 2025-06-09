// Custom hook for authentication state management
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/verify');
      if (response.data.success) {
        setAuthState({
          isLoggedIn: true,
          user: response.data.user,
          loading: false,
        });
      } else {
        setAuthState({
          isLoggedIn: false,
          user: null,
          loading: false,
        });
      }
    } catch (error) {
      setAuthState({
        isLoggedIn: false,
        user: null,
        loading: false,
      });
    }
  };

  const login = (userData: User) => {
    setAuthState({
      isLoggedIn: true,
      user: userData,
      loading: false,
    });
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
      loading: false,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
};