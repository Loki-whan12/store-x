import { useEffect, useState } from "react";
import "../../css/Login.css";

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

  // Helper function to update the username state
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setTouchedUsername(true); // Mark username field as touched
  };

  // Helper function to update the password state
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setTouchedPassword(true); // Mark password field as touched
  };

  // Check username length (basic validation for demonstration)
  useEffect(() => {
    setIsUsernameValid(username.trim().length > 0);
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

  // Helper function to disable the default form submission behavior and perform custom behavior
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isFormValid) {
      alert("Login successful!");
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
          <div className="invalid-feedback">Please enter a valid username.</div>
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
        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!isFormValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUI;
