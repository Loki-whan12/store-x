import { useEffect, useState } from "react";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserProvider";
import { getBackendUrl } from "../../utils/Utils";
import Spinner from "../Spinner";
import Already from "../Already";
import "../../css/AlreadyClick.css";

const LoginUI = () => {
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
  const { login } = useUser();

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
  const user = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  };

  // Helper function to disable the default form submission behavior and perform custom behavior
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(
          `${getBackendUrl()}/users/get-user-by-username/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          if (password === data["password"]) {
            user.first_name = data["first_name"];
            user.last_name = data["last_name"];
            user.email = data["email"];
            user.username = data["username"];
            user.password = data["password"];
            login(user);
            setUsername("");
            setPassword("");
            setIsFormValid(false);
            setTouchedPassword(false);
            setTouchedUsername(false);
            navigate("/");
          } else {
            setIsError(true);
            setError("Sorry the password you enetered incorrect!");
          }
        } else {
          setIsError(true);
          setError(data["message"]);
        }
      } catch (error) {
        setIsError(true);
        setError("Sorry, an error has occured, Please try again..");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please correct the errors in the form.");
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

export default LoginUI;
