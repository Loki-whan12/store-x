import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import BuyerHomePage from "./pages/BuyerHomePage";
import SellerHomePage from "./pages/SellerHomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpSeller from "./pages/signup/SignUpSeller";
import LoginPageSeller from "./pages/Login/LoginPageSeller";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-seller" element={<LoginPageSeller />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup-seller" element={<SignUpSeller />} />
        <Route path="/buyer" element={<BuyerHomePage />} />
        <Route path="/seller" element={<SellerHomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
