import Header from "../../components/tsx/Header";
import Footer from "../../components/tsx/Footer";
import LoginUI from "../../components/tsx/Login/BuildUI";
import { useUser } from "../../UserProvider";
import Already from "../../components/tsx/Already";
import "../../components/css/Already.css";

const LoginPageSellers = () => {
  const { user } = useUser();
  const title = "Already Logged In";
  const message =
    "Sorry you are already logged in! Click the button below to go home.";
  const buttonText = "Go to home";
  const route = "/sellers";
  return (
    <>
      <Header pageName={"Login Page"} pageLink={"/login"} />

      {user ? (
        <Already
          title={title}
          message={message}
          buttonText={buttonText}
          route={route}
        />
      ) : (
        <LoginUI />
      )}
      {user ? <></> : <Footer />}
    </>
  );
};

export default LoginPageSellers;
