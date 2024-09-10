import { createContext, useContext, useState, ReactNode } from "react";

// Define the Seller interface
interface Seller {
  username: string;
  seller_name: string;
  seller_id: string;
  password: string;
  hasSellerAccountBeenApproved: string;
}

// Define SellerContext type
interface SellerContextType {
  seller: Seller | null;
  loginSeller: (seller: Seller) => void;
  logoutSeller: () => void;
}

// Create SellerContext with an undefined initial value
const SellerContext = createContext<SellerContextType | undefined>(undefined);

// Custom hook for using the SellerContext
export const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error("useSeller must be used within a SellerProvider");
  }
  return context;
};

// Function to retrieve stored seller values from localStorage
function getStoredValues() {
  return {
    sellerUsername: localStorage.getItem("seller_username") || "",
    sellerName: localStorage.getItem("seller_name") || "",
    sellerId: localStorage.getItem("seller_id") || "",
    sellerPassword: localStorage.getItem("seller_password") || "",
    hasSellerAccountBeenApproved:
      localStorage.getItem("has_seller_account_been_approved") || "false",
  };
}

// SellerProvider component
export const SellerProvider = ({ children }: { children: ReactNode }) => {
  // Initialize seller state with values from localStorage, allowing default values
  const [seller, setSeller] = useState<Seller | null>(() => {
    const {
      sellerUsername,
      sellerName,
      sellerId,
      sellerPassword,
      hasSellerAccountBeenApproved,
    } = getStoredValues();

    // Allow valid defaults like an empty string or ID of "", and only require necessary fields like username and name
    if (sellerUsername && sellerName) {
      return {
        username: sellerUsername,
        seller_name: sellerName,
        seller_id: sellerId,
        password: sellerPassword,
        hasSellerAccountBeenApproved,
      };
    }
    return null;
  });

  // Function to log in a seller and store details in localStorage
  const loginSeller = (seller: Seller) => {
    setSeller(seller);
    localStorage.setItem("seller_username", seller.username);
    localStorage.setItem("seller_name", seller.seller_name);
    localStorage.setItem("seller_id", seller.seller_id);
    localStorage.setItem("seller_password", seller.password);
    localStorage.setItem(
      "has_seller_account_been_approved",
      seller.hasSellerAccountBeenApproved
    );
  };

  // Function to log out a seller and remove details from localStorage
  const logoutSeller = () => {
    setSeller(null);
    localStorage.removeItem("seller_username");
    localStorage.removeItem("seller_name");
    localStorage.removeItem("seller_id");
    localStorage.removeItem("seller_password");
    localStorage.removeItem("has_seller_account_been_approved");
  };

  return (
    <SellerContext.Provider value={{ seller, loginSeller, logoutSeller }}>
      {children}
    </SellerContext.Provider>
  );
};
