import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "./banner1.jpeg";
import banner2 from "./banner2.jpeg";
import banner3 from "./banner3.jpeg";
import banner4 from "./banner4.jpeg";
import { Image } from "react-bootstrap";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel data-bs-theme="dark"
      activeIndex={index}
      onSelect={handleSelect}
      style={{ backgroundColor: "gray", minHeight: "260px", marginTop: "10px" }}
    >
      {[banner1, banner2, banner3, banner4].map((image) => (
        <Carousel.Item key={image}>
          <Image
            style={{ width: "100%", minHeight: "260px" }}
            className="p-2"
            src={image}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
