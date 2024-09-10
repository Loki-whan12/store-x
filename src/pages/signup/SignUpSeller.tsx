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
    "Sorry you can only create a sellers account if you own a user account!";
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
      ) : !user.has_created_seller_account ? (
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

      {!user?.has_created_seller_account ? <></> : <Footer />}
      {user ? <></> : <Footer />}
    </>
  );
};

export default SignUpPage;
