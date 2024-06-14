import { createStore } from 'zustand';

interface User {
  email: string;
  userType: string;
  name: string;
}

interface SessionStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const useSessionStore = createStore<SessionStore>((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useSessionStore;