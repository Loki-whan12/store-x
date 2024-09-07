import { createContext, useContext, useState, ReactNode } from "react";

// Define UserContext and UserProvider
interface User {
  fullName: string; // Storing full name instead of just username
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Retrieve the full name from localStorage when the app loads
    const storedFullName = localStorage.getItem("fullName");
    return storedFullName ? { fullName: storedFullName } : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("fullName", user.fullName); // Store the full name
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fullName"); // Remove full name on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
