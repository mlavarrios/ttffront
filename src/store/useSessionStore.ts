import { create } from 'zustand';

// Definición de la interfaz para el usuario
interface User {
  userId: number;
  email: string;
  userType: string;
  name: string;
  photo: string | null;  // Nuevo campo para la foto
}

// Definición de la interfaz para el estado de la sesión
interface SessionStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Función para obtener el usuario desde localStorage
const getUserFromLocalStorage = (): User | null => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

// Función para establecer el usuario en localStorage
const setUserInLocalStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

// Creación del store con Zustand
const useSessionStore = create<SessionStore>((set) => ({
  user: getUserFromLocalStorage(),
  login: (userData) => {
    setUserInLocalStorage(userData);
    set({ user: userData });
  },
  logout: () => {
    setUserInLocalStorage(null);
    set({ user: null });
  },
}));

export default useSessionStore;
