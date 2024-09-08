import { useEffect, useState } from "react";

const BuildUI = () => {
  // State hooks for fields that require validation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);

  // Email validation regex (basic example)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper function to handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value)); // Validate email with regex
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

  // Helper function to update the agreement state
  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  // Check password length
  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
  }, [password]);

  // Compare password and confirm password
  useEffect(() => {
    setPasswordMatch(
      confirmPassword.length > 0 && password === confirmPassword
    );
  }, [password, confirmPassword]);

  // Check if the form is valid whenever inputs change
  useEffect(() => {
    const formValid =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      isPasswordValid &&
      passwordMatch &&
      agreeToTerms;
    setIsFormValid(formValid);
  }, [
    firstName,
    lastName,
    email,
    isPasswordValid,
    passwordMatch,
    agreeToTerms,
  ]);

  // Helper function to disable the default form submission behavior and perform custom behavior
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isFormValid) {
      alert("Form submitted successfully!");
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  return (
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
            className="form-control"
            id="validationCustom01"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* Last name text input */}
        <div className="mb-3">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* Email text input */}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${!isEmailValid ? "is-invalid" : ""}`}
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </div>

        {/* Password text input */}
        <div className="mb-3">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">
              Password
            </label>
          </div>
          <div className="col-auto">
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              id="inputPassword6"
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

        {/* Confirm password field */}
        <div className="mb-3">
          <div className="col-auto">
            <label htmlFor="inputPassword7" className="col-form-label">
              Confirm Password
            </label>
          </div>
          <div className="col-auto">
            <input
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              type="password"
              id="inputPassword7"
              className={`form-control ${
                !passwordMatch && touchedConfirmPassword ? "is-invalid" : ""
              }`}
              aria-describedby="passwordHelpInline"
              required
            />
          </div>
          <div className="col-auto">
            {!passwordMatch && touchedConfirmPassword && (
              <span id="passwordHelpInline" className="form-text">
                Passwords do not match.
              </span>
            )}
          </div>
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
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!isFormValid}
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuildUI;
