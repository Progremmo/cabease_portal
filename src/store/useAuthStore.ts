import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) => {
        Cookies.set('accessToken', accessToken, { secure: process.env.NODE_ENV === 'production' });
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },
      clearAuth: () => {
        Cookies.remove('accessToken');
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'cabease-auth',
    }
  )
);
