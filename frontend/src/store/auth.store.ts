import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) => {
        console.log('AuthStore: Login called with:', { user, token: token.substring(0, 10) + '...' });
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        console.log('AuthStore: Logout called');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      checkAuth: () => {
        const state = get();
        const isAuth = !!(state.user && state.token && state.isAuthenticated);
        console.log('AuthStore: checkAuth called:', isAuth, { user: state.user, hasToken: !!state.token, isAuthenticated: state.isAuthenticated });
        return isAuth;
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        console.log('AuthStore: Rehydrated from storage:', state);
      },
    }
  )
); 