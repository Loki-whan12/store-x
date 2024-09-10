import Header from "../../components/tsx/Header";
import Footer from "../../components/tsx/Footer";
import Already from "../../components/tsx/Already";
import "../../components/css/Already.css";
import { useSeller } from "../../SellerProvider";
import LoginUISeller from "../../components/tsx/Login/BuildUISeller";
import { useUser } from "../../UserProvider";

const LoginPageSellers = () => {
  const { seller } = useSeller();
  const { user } = useUser();
  const title = "Already Logged In";
  const message =
    "Sorry you are already logged in! Click the button below to go home.";
  const buttonText = "Go to home";
  const route = "/seller";
  console.log(seller);
  console.log(user);
  return (
    <>
      <Header pageName={"Seller Login Page"} pageLink={"/login-seller"} />

      {seller ? (
        <Already
          title={title}
          message={message}
          buttonText={buttonText}
          route={route}
        />
      ) : (
        <LoginUISeller />
      )}
      {seller ? <></> : <Footer />}
    </>
  );
};

export default LoginPageSellers;
