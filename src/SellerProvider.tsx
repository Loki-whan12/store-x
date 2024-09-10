import { createContext, useContext, useState, ReactNode } from "react";

// Define UserContext and UserProvider
interface Seller {
  username: string;
  seller_name: string;
  seller_id: number;
  password: string;
  hasCreatedSellerAccount: boolean;
  hasSellerAccountBeenApproved: boolean;
}

interface SellerContextType {
  seller: Seller | null;
  login: (seller: Seller) => void;
  logout: () => void;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

function parseJSON<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

function getStoredValues() {
  return {
    sellerUsername: parseJSON<string>("seller_username", ""),
    sellerName: parseJSON<string>("seller_name", ""),
    sellerId: parseJSON<number>("seller_id", 0),
    sellerPassword: parseJSON<string>("seller_password", ""),
    hasCreatedSellerAccount: parseJSON<boolean>(
      "has_created_seller_account",
      false
    ),
    hasSellerAccountBeenApproved: parseJSON<boolean>(
      "has_seller_account_been_approved",
      false
    ),
  };
}

export const SellerProvider = ({ children }: { children: ReactNode }) => {
  const [seller, setSeller] = useState<Seller | null>(() => {
    const {
      sellerUsername,
      sellerName,
      sellerId,
      sellerPassword,
      hasCreatedSellerAccount,
      hasSellerAccountBeenApproved,
    } = getStoredValues();

    // Return the Seller object if all required fields are available
    if (
      sellerUsername &&
      sellerName &&
      sellerId &&
      sellerPassword &&
      hasCreatedSellerAccount &&
      hasSellerAccountBeenApproved
    ) {
      return {
        username: sellerUsername,
        seller_name: sellerName,
        seller_id: sellerId,
        password: sellerPassword,
        hasSellerAccountBeenApproved: hasSellerAccountBeenApproved,
        hasCreatedSellerAccount: hasCreatedSellerAccount,
      };
    }
    return null;
  });

  const login = (user: Seller) => {
    setSeller(user);
    localStorage.setItem("seller_username", user.username);
    localStorage.setItem("seller_name", user.seller_name);
    localStorage.setItem("seller_id", JSON.stringify(user.seller_id));
    localStorage.setItem("seller_password", user.password);
    localStorage.setItem(
      "has_created_seller_account",
      JSON.stringify(user.hasCreatedSellerAccount)
    );
    localStorage.setItem(
      "has_seller_account_been_approved",
      JSON.stringify(user.hasSellerAccountBeenApproved)
    );
  };

  const logout = () => {
    setSeller(null);
    localStorage.removeItem("seller_username");
    localStorage.removeItem("seller_name");
    localStorage.removeItem("seller_id");
    localStorage.removeItem("seller_password");
    localStorage.removeItem("has_created_seller_account");
    localStorage.removeItem("has_seller_account_been_approved");
  };

  return (
    <SellerContext.Provider value={{ seller, login, logout }}>
      {children}
    </SellerContext.Provider>
  );
};
