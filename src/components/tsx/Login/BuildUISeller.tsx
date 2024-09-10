import { useEffect, useState } from "react";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserProvider";
import { getBackendUrl } from "../../utils/Utils";
import Spinner from "../Spinner";
import Already from "../Already";
import "../../css/AlreadyClick.css";
import { useSeller } from "../../../SellerProvider";

const LoginUISeller = () => {
  // State hooks for fields that require validation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // State to track if fields have been touched
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  // State hooks for form status and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  // For navigation
  const navigate = useNavigate();
  //User state
  const { login, user } = useUser();
  //seller state
  const { loginSeller } = useSeller();

  // Helper function to update the username state
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setTouchedUsername(true);
  };

  // Helper function to update the password state
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setTouchedPassword(true);
  };

  // Check username length
  useEffect(() => {
    setIsUsernameValid(username.trim().length >= 5);
  }, [username]);

  // Check password length
  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
  }, [password]);

  // Check if the form is valid whenever inputs change
  useEffect(() => {
    const formValid = isUsernameValid && isPasswordValid;
    setIsFormValid(formValid);
  }, [isUsernameValid, isPasswordValid]);

  //User model to be populated by data returned from the database
  // if the user is not logged into the user account already
  const userModel = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    has_created_seller_account: "false",
  };

  //Seller model to be populated by data returned from the database
  const sellerModel = {
    username: "",
    seller_name: "",
    seller_id: "",
    password: "",
    hasSellerAccountBeenApproved: "false",
  };
  // Function to handle form submission with improved error handling and state management
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!isFormValid) {
      alert("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(""); // Reset the error message

    try {
      // If user is not already logged in, fetch user data
      if (!user) {
        const userResponse = await fetch(
          `${getBackendUrl()}/users/get-user-by-username/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await userResponse.json();

        if (!userResponse.ok) {
          setIsError(true);
          setError(
            data.message || "An error occurred while fetching user data."
          );
          return;
        }

        // Populate the user model
        Object.assign(userModel, {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          username: data.username,
          password: data.password,
          has_created_seller_account: data.has_created_seller_account,
        });

        // Log the user in
        login(userModel);
        setUsername("");
        setPassword("");
        setIsFormValid(false);
        setTouchedPassword(false);
        setTouchedUsername(false);
      }

      // Fetch seller data regardless of user status
      const sellerResponse = await fetch(
        `${getBackendUrl()}/sellers/get-seller/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sellerData = await sellerResponse.json();

      if (!sellerResponse.ok) {
        setIsError(true);
        setError(
          sellerData.message || "An error occurred while fetching seller data."
        );
        return;
      }

      // Check if the password matches for seller
      if (password !== sellerData.password) {
        setIsError(true);
        setError("Sorry, the password you entered is incorrect!");
        return;
      }

      // Populate the seller model
      Object.assign(sellerModel, {
        username: sellerData.username,
        seller_name: sellerData.seller_name,
        seller_id: sellerData.seller_id,
        password: sellerData.password,
        hasSellerAccountBeenApproved: sellerData.has_been_approved,
      });

      // Log the seller in
      loginSeller(sellerModel);
      navigate("/seller");
    } catch (error) {
      setIsError(true);
      setError("Sorry, an error has occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <form
        onSubmit={handleSubmit}
        className="col g-3 needs-validation"
        noValidate
      >
        {/* Username text input */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              !isUsernameValid && touchedUsername ? "is-invalid" : ""
            }`}
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={() => setTouchedUsername(true)}
            required
          />
          <div className="invalid-feedback">
            Please username cannot be lass than 5.
          </div>
        </div>

        {/* Password text input */}
        <div className="mb-3">
          <div className="col-auto">
            <label htmlFor="password" className="col-form-label">
              Password
            </label>
          </div>
          <div className="col-auto">
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              id="password"
              className={`form-control ${
                !isPasswordValid && touchedPassword ? "is-invalid" : ""
              }`}
              aria-describedby="passwordHelpInline"
              required
            />
          </div>
          <div className="col-auto">
            {!isPasswordValid && touchedPassword && (
              <span id="passwordHelpInline" className="form-text">
                Must be at least 8 characters long.
              </span>
            )}
          </div>
        </div>

        {/* Submit button */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="col-12">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isFormValid}
            >
              Login
            </button>
          </div>
        )}
        {isError && <p className="error">{error}</p>}
        <Already
          title={"Do you have an account?"}
          message={"Click the button below to sign up for an account."}
          buttonText={"Sign up"}
          route={"/signup"}
        />
      </form>
    </div>
  );
};

export default LoginUISeller;
