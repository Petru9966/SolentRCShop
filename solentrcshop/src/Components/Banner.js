import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import slide1 from "../Components/assets/bannerimages/1.jpg";
import slide2 from "../Components/assets/bannerimages/2.jpg";
import slide3 from "../Components/assets/bannerimages/3.jpg";
import slide4 from "../Components/assets/bannerimages/4.jpg";
const Banner = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="first slide" />
        <Carousel.Caption>
          <h3>Best Quality RC Stuff On The Market</h3>
          <p>Upto 70% off on all RC Planes</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="second slide" />
        <Carousel.Caption>
          <h3>Genuine Walkera Parts In Stock</h3>
          <p>BIG SALE</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="third slide" />
        <Carousel.Caption>
          <h3>We Provide Repairs For All Major Brands Of Drones</h3>
          <p>BIG DISCOUNT FOR REGISTERED MEMBERS</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide4} alt="fourth slide" />
        <Carousel.Caption>
          <h3>Buy Genuine FRSky Transmitters</h3>
          <p>BIG SALE</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
