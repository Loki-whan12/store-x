import SellerImg from "../../../assets/landing-page/pay-img.avif";
interface Props {
  navigate: () => void;
}

const LandingPageSellers = ({ navigate }: Props) => {
  return (
    <div className="info">
      <div className="text">
        <p>
          Welcome to Store-X! As a seller, you can reach a vast audience and
          showcase your products on our dynamic platform. By creating a seller
          account, you'll gain access to powerful tools and features designed to
          help you manage your listings, track sales, and analyze performance.
          It's easy to get started—simply sign up to start listing your products
          and benefit from our extensive customer base. Our platform provides
          you with the flexibility to optimize your sales strategy and maximize
          your revenue. Don't miss out on the opportunity to grow your business
          with Store-X. Join us today and take advantage of everything we have
          to offer to elevate your selling experience!
        </p>
        <br />
        <br />
        <button className="btn btn-outline-danger" onClick={() => navigate()}>
          Create a Seller Account
        </button>
      </div>
      <div className="info-product-img">
        <img src={SellerImg} alt="Create a Seller Account" />
      </div>
    </div>
  );
};

export default LandingPageSellers;
