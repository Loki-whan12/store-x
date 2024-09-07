import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/CarouselSlider.css";

// Define the type for the dynamically imported modules
type ImageModule = {
  default: string;
};

const CarouselSlider = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Dynamically import images
    const imageModules = import.meta.glob(
      "../../assets/landing-page/featured-imgs-landing-page/*.{jpg,png,jpeg,avif,webp}"
    );

    const loadImages = async () => {
      // Map over imageModules and fetch the image URLs
      const imagePromises = Object.keys(imageModules).map(async (key) => {
        const module = await imageModules[key](); // Module is of type unknown here
        return (module as ImageModule).default; // Type assertion to specify the expected type
      });

      const imageUrls = await Promise.all(imagePromises);
      setImages(imageUrls);
    };

    loadImages();
  }, []);

  return (
    <>
      <div className="carousel-container">
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CarouselSlider;
