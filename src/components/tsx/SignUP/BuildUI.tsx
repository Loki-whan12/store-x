import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { getBackendUrl } from "../../utils/Utils";
import Already from "../Already";
import "../../css/AlreadyClick.css";

interface Props {
  handleHasCreatedAccountToast: () => void;
}

const BuildUI = ({ handleHasCreatedAccountToast }: Props) => {
  // State hooks for input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // State hooks for input validation
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // State hooks for touched fields
  const [touchedFirstName, setTouchedFirstName] = useState(false);
  const [touchedLastName, setTouchedLastName] = useState(false);
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);

  // State hooks for form status and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [error, setError] = useState("");

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper function to handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value)); // Validate email with regex
  };

  // Check password length
  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
  }, [password]);

  // Compare password and confirm password
  useEffect(() => {
    setPasswordMatch(confirmPassword === password);
  }, [password, confirmPassword]);

  // Check username length
  useEffect(() => {
    setIsUsernameValid(username.length >= 8);
  }, [username]);

  // Check first name length
  useEffect(() => {
    setIsFirstNameValid(firstName.length >= 5);
  }, [firstName]);

  // Check last name length
  useEffect(() => {
    setIsLastNameValid(lastName.length >= 5);
  }, [lastName]);

  // Check email validity
  useEffect(() => {
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Check if the form is valid whenever inputs change
  useEffect(() => {
    const formValid =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      username.trim() !== "" &&
      isPasswordValid &&
      passwordMatch &&
      isFirstNameValid &&
      isLastNameValid &&
      isUsernameValid &&
      isEmailValid &&
      agreeToTerms;
    setIsFormValid(formValid);
  }, [
    firstName,
    lastName,
    username,
    email,
    isPasswordValid,
    passwordMatch,
    agreeToTerms,
    isFirstNameValid,
    isLastNameValid,
    isUsernameValid,
    isEmailValid,
  ]);

  // Helper function to disable the default form submission behavior and perform custom behavior
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(`${getBackendUrl()}/users/add-users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: confirmPassword,
            email: email,
            first_name: firstName,
            last_name: lastName,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsFormValid(false);
          setTouchedPassword(false);
          setTouchedConfirmPassword(false);
          setTouchedFirstName(false);
          setTouchedLastName(false);
          setTouchedUsername(false);
          setTouchedEmail(false);
          handleHasCreatedAccountToast();
        } else {
          setIsError(true);
          setError(data["error"]);
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

  // Helper function to update the agreement state
  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  // Helper function to update the password state
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setTouchedPassword(true); // Mark password field as touched
  };

  // Helper function to update the confirm password state
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setTouchedConfirmPassword(true); // Mark confirm password field as touched
  };

  return (
    <>
      <div className="sign-up-form-container">
        <form
          onSubmit={handleSubmit}
          className="col g-3 needs-validation"
          noValidate
        >
          {/* First name text input */}
          <div className="mb-3">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className={`form-control ${
                !isFirstNameValid && touchedFirstName ? "is-invalid" : ""
              }`}
              id="validationCustom01"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => setTouchedFirstName(true)}
              required
            />
            {!isFirstNameValid && touchedFirstName && (
              <div className="invalid-feedback">
                First name must be at least 5 characters long.
              </div>
            )}
          </div>

          {/* Last name text input */}
          <div className="mb-3">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className={`form-control ${
                !isLastNameValid && touchedLastName ? "is-invalid" : ""
              }`}
              id="validationCustom02"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => setTouchedLastName(true)}
              required
            />
            {!isLastNameValid && touchedLastName && (
              <div className="invalid-feedback">
                Last name must be at least 5 characters long.
              </div>
            )}
          </div>

          {/* Username text input */}
          <div className="mb-3">
            <label htmlFor="validationCustom003" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${
                !isUsernameValid && touchedUsername ? "is-invalid" : ""
              }`}
              id="validationCustom003"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouchedUsername(true)}
              required
            />
            {!isUsernameValid && touchedUsername && (
              <div className="invalid-feedback">
                Username must be at least 8 characters long.
              </div>
            )}
          </div>

          {/* Email text input */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${
                !isEmailValid && touchedEmail ? "is-invalid" : ""
              }`}
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              onBlur={() => setTouchedEmail(true)}
              required
            />
            {!isEmailValid && touchedEmail && (
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            )}
          </div>

          {/* Password text input */}
          <div className="mb-3">
            <label htmlFor="inputPassword6" className="col-form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword6"
              className={`form-control ${
                !isPasswordValid && touchedPassword ? "is-invalid" : ""
              }`}
              aria-describedby="passwordHelpInline"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              onBlur={() => setTouchedPassword(true)}
              required
            />
            {!isPasswordValid && touchedPassword && (
              <div className="invalid-feedback">
                Password must be at least 8 characters long.
              </div>
            )}
          </div>

          {/* Confirm password field */}
          <div className="mb-3">
            <label htmlFor="inputPassword7" className="col-form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="inputPassword7"
              className={`form-control ${
                !passwordMatch && touchedConfirmPassword ? "is-invalid" : ""
              }`}
              aria-describedby="passwordHelpInline"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
              onBlur={() => setTouchedConfirmPassword(true)}
              required
            />
            {!passwordMatch && touchedConfirmPassword && (
              <div className="invalid-feedback">Passwords do not match.</div>
            )}
          </div>

          {/* Agree to terms and conditions */}
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={agreeToTerms}
                onChange={handleAgreeChange}
                id="invalidCheck"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              {!agreeToTerms && (
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              )}
            </div>
          </div>
          <br />

          {/* Submit button */}
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isFormValid}
            >
              Create Account
            </button>
          )}
          {isError && <p className="error">{error}</p>}
        </form>
        <Already
          title={"Already Have an Account?"}
          message={"Click the button below to log in."}
          buttonText={"Go to Login"}
          route={"/login"}
        />
      </div>
    </>
  );
};

export default BuildUI;
