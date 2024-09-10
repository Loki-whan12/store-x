import Footer from "../../components/tsx/Footer";
import Header from "../../components/tsx/Header";
import "../../components/css/SignUpPage.css";
import ToastComponent from "../../components/tsx/Toast";
import { useState, useEffect } from "react";
import { useUser } from "../../UserProvider";
import Already from "../../components/tsx/Already";
import BuildUISeller from "../../components/tsx/SignUP/BuildUISeller";

const SignUpPage = () => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);
  const [hasCreatedAccountAlready, setHasCreatedAccountAlready] =
    useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user?.has_created_seller_account) {
      setHasCreatedAccountAlready(true);
    } else {
      setHasCreatedAccountAlready(false);
    }
  }, [user]);

  const handleHasCreatedAccountToast = () => {
    setHasCreatedAccount(true);
  };

  const title = "Not Logged in User Account";
  const message =
    "Sorry you can only create a seller's account if you own a user account!";
  const buttonText = "Register";
  const route = "/signup";
  const title2 = "Already Have A Buyer's Account";
  const message2 =
    "Sorry you can only create one seller's account per user account!";
  const buttonText2 = "Log into seller account";
  const route2 = "/login-seller";

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
      ) : hasCreatedAccountAlready ? (
        <Already
          title={title2}
          message={message2}
          buttonText={buttonText2}
          route={route2}
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
