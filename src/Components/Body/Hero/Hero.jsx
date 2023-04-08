import React from "react";
import image from "../../../assets/grp pic.jpg";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const onClickShopNow = () => {
    navigate("/products");
  };
  return (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={image} className="d-block w-100 img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <button
              className="btn btn-outline-primary"
              onClick={onClickShopNow}
            >
              Shop Now
            </button>
            <p>Up to 55% off | pick from local shops Visit the store</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={"https://i.dummyjson.com/data/products/96/thumbnail.jpg"}
            className="d-block w-100 img"
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <button
              className="btn btn-outline-primary"
              onClick={onClickShopNow}
            >
              Shop Now
            </button>
            <p>
              Up to 60% off | Select your wanted picks from local shops, Visit
              the store
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={image} className="d-block w-100 img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <button
              className="btn btn-outline-primary"
              onClick={onClickShopNow}
            >
              Shop Now
            </button>
            <p>
              Up to 60% off | Home décor picks from local shops Visit the store
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Hero;
