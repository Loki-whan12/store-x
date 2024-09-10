import { useUser } from "../../UserProvider";
import { useSeller } from "../../SellerProvider"; // Import Seller context
import Avatar from "react-avatar";
import navigateToRoute from "../utils/NavigateToRoute";
import "../css/Header.css";

interface Props {
  pageName: string;
  pageLink: string;
}

const Header = ({ pageName, pageLink }: Props) => {
  const { user, logout } = useUser();
  const { seller, logoutSeller } = useSeller(); // Get seller data and logout function
  const navigateTo = navigateToRoute();

  // Function to determine if the current page is a seller page
  const isSellerPage = pageLink.startsWith("/seller"); // Adjust this check based on your routing logic

  const handleLogoutSeller = () => {
    logoutSeller();
    navigateTo("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href={pageLink}>
          {pageName}
        </a>
        <div className="collapse navbar-collapse">
          <form className="d-flex ms-auto">
            {isSellerPage && seller ? (
              // Display seller information when on seller pages
              <>
                <Avatar
                  name={`${seller.seller_name}`}
                  size="40"
                  round={true}
                  className="me-2"
                />
                <span className="navbar-text me-2">{`${seller.seller_name}`}</span>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={handleLogoutSeller}
                >
                  Logout
                </button>
              </>
            ) : user ? (
              // Display user information on non-seller pages
              <>
                <Avatar
                  name={`${user.first_name} ${user.last_name}`}
                  size="40"
                  round={true}
                  className="me-2"
                />
                <span className="navbar-text me-2">{`${user.first_name} ${user.last_name}`}</span>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              // Display login and sign-up buttons when no user or seller is logged in
              <>
                <button
                  className="btn btn-outline-success me-2"
                  type="button"
                  onClick={() => navigateTo("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success me-2"
                  type="button"
                  onClick={() => navigateTo("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
