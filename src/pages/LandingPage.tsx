import CarouselSlider from "../components/tsx/CarouselSlider";
import Header from "../components/tsx/Header";
import "../components/css/LandingPage.css";
import LandingPageWelcomeInfo from "../components/tsx/LandingPage/LandingPageWelcomeInfo";
import LandingPageBuyers from "../components/tsx/LandingPage/LandingPageBuyers";
import LandingPageSellers from "../components/tsx/LandingPage/LandingPageSellers";
import Footer from "../components/tsx/Footer";
import navigateToRoute from "../components/utils/NavigateToRoute";

const LandingPage = () => {
  const navigateTo = navigateToRoute();
  return (
    <>
      <Header pageName={"STORE - X"} pageLink={"/"} />
      <CarouselSlider />
      <main className="content-conatiner">
        <hr />
        <LandingPageWelcomeInfo navigate={() => navigateTo("/home")} />
        <hr />
        <LandingPageBuyers navigate={() => navigateTo("/signup")} />
        <hr />
        <LandingPageSellers navigate={() => navigateTo("/signup-seller")} />
        <hr />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
