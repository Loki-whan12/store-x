import { createContext, useContext, useState, ReactNode } from "react";

// Define UserContext and UserProvider
interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
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
    // Retrieve the user information from localStorage when the app loads
    const storedFirstName = localStorage.getItem("first_name");
    const storedLastName = localStorage.getItem("last_name");
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // Return the user object if all required fields are available
    if (
      storedFirstName &&
      storedLastName &&
      storedEmail &&
      storedUsername &&
      storedPassword
    ) {
      return {
        first_name: storedFirstName,
        last_name: storedLastName,
        email: storedEmail,
        username: storedUsername,
        password: storedPassword,
      };
    }
    return null;
  });

  const login = (user: User) => {
    setUser(user);
    // Store user details in localStorage
    localStorage.setItem("first_name", user.first_name);
    localStorage.setItem("last_name", user.last_name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password);
  };

  const logout = () => {
    setUser(null);
    // Remove user details from localStorage
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
