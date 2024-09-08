import Header from "../components/tsx/Header";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import Footer from "../components/tsx/Footer";
import LoginUI from "../components/tsx/Login/BuildUI";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = () => {
    const user = {
      fullName: "John Doe",
    };

    login(user);
    navigate("/");
  };

  return (
    <>
      <Header pageName={"Login Page"} />
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <LoginUI />
      <Footer />
    </>
  );
};

export default LoginPage;
