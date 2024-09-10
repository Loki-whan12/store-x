import Footer from "../components/tsx/Footer";
import Header from "../components/tsx/Header";
import "../components/css/SignUpPage.css";
import BuildUI from "../components/tsx/SignUP/BuildUI";
import ToastComponent from "../components/tsx/Toast";
import { useState } from "react";
import { useUser } from "../UserProvider";
import Already from "../components/tsx/Already";

const SignUpPage = () => {
  const [hasCreatedAccount, setHasCreatedAccount] = useState(false);

  const handleHasCreatedAccountToast = () => {
    setHasCreatedAccount(true);
  };
  const { user } = useUser();
  const title = "Already Logged In";
  const message = "Sorry you cannot create an account whiles logged!";
  const buttonText = "Go to home";
  const route = "/";

  return (
    <>
      <Header pageName={"Sign up"} pageLink={"/signup"} />
      {user ? (
        <Already
          title={title}
          message={message}
          buttonText={buttonText}
          route={route}
        />
      ) : (
        <BuildUI handleHasCreatedAccountToast={handleHasCreatedAccountToast} />
      )}
      {hasCreatedAccount && (
        <ToastComponent
          title={"Success"}
          message={"Your Account has been created.."}
        />
      )}
      <Footer />
    </>
  );
};

export default SignUpPage;
