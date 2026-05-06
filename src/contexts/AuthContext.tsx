import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction, logout as logoutAction } from '@/store/slices/userSlice';
import { authApi } from '@/api/endpoints';
import { setAccessToken, clearAccessToken } from '@/api/tokenManager';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    dispatch(loginAction({ id: user.id, email: user.email, name: user.name }));
    setIsAuthenticated(true);
  }, [dispatch]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const response = await authApi.signup(name, email, password);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken);
    dispatch(loginAction({ id: user.id, email: user.email, name: user.name }));
    setIsAuthenticated(true);
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore – clear local state regardless
    }
    clearAccessToken();
    dispatch(logoutAction());
    setIsAuthenticated(false);
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
