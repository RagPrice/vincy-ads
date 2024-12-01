import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthContextType, AuthState, User } from '../types/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const {
    isAuthenticated,
    isLoading,
    user: auth0User,
    loginWithRedirect,
    logout,
    error,
  } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    if (auth0User) {
      const user: User = {
        id: auth0User.sub!,
        email: auth0User.email!,
        name: auth0User.name,
        picture: auth0User.picture,
        emailVerified: auth0User.email_verified!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setState({
        isAuthenticated,
        isLoading: false,
        user,
        error: null,
      });
    } else {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: error || null,
      });
    }
  }, [isLoading, isAuthenticated, auth0User, error]);

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname
      }
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  const login = async () => {
    try {
      await handleLogin();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as Error,
      }));
    }
  };

  const logoutAuth = async () => {
    try {
      await handleLogout();
      setState(initialState);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as Error,
      }));
    }
  };

  const signup = async () => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: window.location.pathname
        }
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as Error,
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout: logoutAuth,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
