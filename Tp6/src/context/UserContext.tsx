import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { currentUser as defaultUser } from "../data/userData";

// Tipo que describe la información del usuario
interface User {
  name: string;
  username: string;
  verified: boolean;
  bio: string;
  followers: string;
  likes: string;
  avatar: string;
  postsCount: number;
}

// Tipo del valor que expone el Context
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// Creación del Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider: contiene el estado del usuario y lo comparte con toda la app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir el Context desde cualquier componente
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
