import { useUser } from "../../UserProvider";
import Avatar from "react-avatar";
import navigateToRoute from "../utils/NavigateToRoute";
import "../css/Header.css";

interface Props {
  pageName: string;
}

const Header = ({ pageName }: Props) => {
  const { user, logout } = useUser();
  const navigateTo = navigateToRoute();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {pageName}
        </a>
        <div className="collapse navbar-collapse">
          <form className="d-flex ms-auto">
            {user ? (
              <>
                <Avatar
                  name={user.fullName}
                  size="40"
                  round={true}
                  className="me-2"
                />
                <span className="navbar-text me-2">{user.fullName}</span>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
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
