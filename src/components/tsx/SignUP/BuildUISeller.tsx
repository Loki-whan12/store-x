import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { getBackendUrl } from "../../utils/Utils";
import Already from "../Already";
import "../../css/AlreadyClick.css";
import { useUser } from "../../../UserProvider";

interface Props {
  handleHasCreatedAccountToast: () => void;
}

const BuildUISeller = ({ handleHasCreatedAccountToast }: Props) => {
  // State hooks for input fields
  const [sellerName, setSellerName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // State hooks for input validation
  const [isSellerNameValid, setIsSellerNameValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // State hooks for touched fields
  const [touchedSellerName, setTouchedSellerName] = useState(false);
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);

  // State hooks for form status and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

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
    setIsSellerNameValid(sellerName.length >= 5);
  }, [sellerName]);

  // Check if the form is valid whenever inputs change
  useEffect(() => {
    const formValid =
      sellerName.trim() !== "" &&
      isPasswordValid &&
      passwordMatch &&
      isSellerNameValid &&
      agreeToTerms;
    setIsFormValid(formValid);
  }, [
    sellerName,
    isPasswordValid,
    passwordMatch,
    agreeToTerms,
    isSellerNameValid,
  ]);

  // Helper function to disable the default form submission behavior and perform custom behavior
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(`${getBackendUrl()}/sellers/add-seller`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user?.username,
            seller_name: sellerName,
            password: confirmPassword,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSellerName("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setIsFormValid(false);
          setTouchedPassword(false);
          setTouchedConfirmPassword(false);
          setTouchedSellerName(false);
          setTouchedUsername(false);
          handleHasCreatedAccountToast();
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

  const { user } = useUser();

  return (
    <>
      <div className="sign-up-form-container">
        <form
          onSubmit={handleSubmit}
          className="col g-3 needs-validation"
          noValidate
        >
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
              value={user?.username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouchedUsername(true)}
              required
              disabled
            />
            {!isUsernameValid && touchedUsername && (
              <div className="invalid-feedback">
                Username must be at least 8 characters long.
              </div>
            )}
          </div>

          {/* Seller Name text input */}
          <div className="mb-3">
            <label htmlFor="validationCustom01" className="form-label">
              Seller Name
            </label>
            <input
              type="text"
              className={`form-control ${
                !isSellerNameValid && touchedSellerName ? "is-invalid" : ""
              }`}
              id="validationCustom01"
              placeholder="Seller Name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              onBlur={() => setTouchedSellerName(true)}
              required
            />
            {!isSellerNameValid && touchedSellerName && (
              <div className="invalid-feedback">
                Seller Name must be at least 5 characters long.
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
              Submit form
            </button>
          )}
          {isError && <p className="error">{error}</p>}
        </form>
        <Already
          title={"Already Have a Sellers Account?"}
          message={"Click the button below to log in."}
          buttonText={"Sellers login"}
          route={"/login-seller"}
        />
      </div>
    </>
  );
};

export default BuildUISeller;
