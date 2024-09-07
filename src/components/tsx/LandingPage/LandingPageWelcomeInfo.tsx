import OloedTv from "../../../assets/landing-page/OLed-tv.webp";

interface Props {
  navigate: () => void;
}

const LandingPageWelcomeInfo = ({ navigate }: Props) => {
  return (
    <div className="info">
      <div className="text">
        <p>
          Welcome to Store-X, your ultimate one-stop destination for all your
          shopping needs. At Store-X, we offer an extensive selection of
          products to cater to every aspect of your lifestyle. Whether you're
          seeking top-quality firearms for personal safety, fresh and nutritious
          foodstuff for your kitchen, essential health and sanitary products for
          everyday well-being, or stylish clothes to update your wardrobe, we
          have you covered. Experience the ease of finding exactly what you're
          looking for. Browse through our diverse catalog and see why Store-X is
          the preferred choice for all your shopping needs.
        </p>
        <br />
        <br />
        <button
          className="btn btn-outline-warning"
          type="button"
          onClick={() => navigate()}
        >
          Explore Products
        </button>
      </div>
      <div className="info-product-img">
        <img src={OloedTv} alt="An Image of an OLED TV" />
      </div>
    </div>
  );
};

export default LandingPageWelcomeInfo;
