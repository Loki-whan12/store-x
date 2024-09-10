import "../css/AlreadyLoggedIn.css";
import navigateToRoute from "../utils/NavigateToRoute";

const AlreadyLoggedIn = () => {
  const navigate = navigateToRoute();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="already-logged-in-container">
      <h2>You Are Already Logged In</h2>
      <p>
        You are currently logged in to your account. To log in with a different
        account, please log out first.
      </p>
      <button className="logged-in-button" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
};

export default AlreadyLoggedIn;
