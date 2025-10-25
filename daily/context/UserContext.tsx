import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id?: number;
  email?: string;
  tipo?: string;
  name?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setUserState({ id: Number(userId) });
      }
    };
    loadUser();
  }, []);

  const setUser = async (userData: User) => {
    setUserState(userData);
    if (userData.id) {
      await AsyncStorage.setItem('userId', userData.id.toString());
    }
  };

  const clearUser = async () => {
    setUserState(null);
    await AsyncStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
