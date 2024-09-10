import BuyImg from "../../../assets/landing-page/buy.jpg";

interface Props {
  navigate: () => void;
}

const LandingPageBuyers = ({ navigate }: Props) => {
  return (
    <div className="info">
      <div className="text">
        <p>
          To fully explore our extensive catalog and enjoy a personalized
          shopping experience, we invite you to create an account with us. By
          signing up, you'll gain access to a curated list of products tailored
          to your interests, exclusive deals, and much more. Creating an account
          is quick and easy, and it opens the door to a world of convenience and
          savings. With an account, you can track your orders, manage your
          wishlist, and receive tailored recommendations just for you. Don't
          miss out on the opportunity to make the most of your shopping journey.
          Join our community today and start discovering the best that Store-X
          has to offer. Experience the difference that a personalized shopping
          experience can make!
        </p>
        <br />
        <br />
        <button className="btn btn-outline-info" onClick={() => navigate()}>
          Create an Account
        </button>
      </div>
      <div className="info-product-img">
        <img src={BuyImg} alt="Create an Account" />
      </div>
    </div>
  );
};

export default LandingPageBuyers;
