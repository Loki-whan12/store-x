import Footer from "../../components/tsx/Footer";
import Header from "../../components/tsx/Header";
import "../../components/css/SignUpPage.css";
import ToastComponent from "../../components/tsx/Toast";
import { useState } from "react";
import { useUser } from "../../UserProvider";
import Already from "../../components/tsx/Already";
import BuildUISeller from "../../components/tsx/SignUP/BuildUISeller";

const SignUpPage = () => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);

  const handleHasCreatedAccountToast = () => {
    setHasCreatedAccount(true);
  };
  const { user } = useUser();
  const title = "Not Loggen in User Account";
  const message =
    "Sorry you can only create an account if you have a user account!";
  const buttonText = "Go to register";
  const route = "/signup";

  return (
    <>
      <Header pageName={"Sign up Sellers"} pageLink={"/signup-seller"} />
      {!user ? (
        <Already
          title={title}
          message={message}
          buttonText={buttonText}
          route={route}
        />
      ) : (
        <BuildUISeller
          handleHasCreatedAccountToast={handleHasCreatedAccountToast}
        />
      )}
      {hasCreatedAccount && (
        <ToastComponent
          title={"Success"}
          message={"Your Seller Account has been created.."}
        />
      )}
      <Footer />
    </>
  );
};

export default SignUpPage;
