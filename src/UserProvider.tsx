import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  has_created_seller_account: string;
}

// Define context type
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create UserContext with an undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for using the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state with values from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const storedFirstName = localStorage.getItem("first_name") || "";
    const storedLastName = localStorage.getItem("last_name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    const storedUsername = localStorage.getItem("username") || "";
    const storedPassword = localStorage.getItem("password") || "";
    const storedHasCreatedSellerAccount =
      localStorage.getItem("has_created_seller_account") || "false"; // default to "false" if not set

    // Check if any of the required fields are missing
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
        has_created_seller_account: storedHasCreatedSellerAccount,
      };
    }
    return null;
  });

  // Function to log in a user and store details in localStorage
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("first_name", user.first_name);
    localStorage.setItem("last_name", user.last_name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password);
    localStorage.setItem(
      "has_created_seller_account",
      user.has_created_seller_account
    );
  };

  // Function to log out a user and remove details from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("has_created_seller_account");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
