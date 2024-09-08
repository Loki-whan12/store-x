import Footer from "../components/tsx/Footer";
import Header from "../components/tsx/Header";
import "../components/css/SignUpPage.css";
import BuildUI from "../components/tsx/SignUP/BuildUI";

const SignUpPage = () => {
  return (
    <>
      <Header pageName={"Sign up"} />
      <BuildUI
        onSubmit={function (formData: {
          username: string;
          password: string;
          email: string;
          firstName: String;
          lastName: string;
        }): void {}}
      />
      <Footer />
    </>
  );
};

export default SignUpPage;
