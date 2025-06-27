import type { FC } from "react";
import type { CarouselItem } from "../Carousel/Carousel"; 
import Carousel from "../Carousel/Carousel";
import "./Partners.scss";

const carouselItems: CarouselItem[] = [
  { itemName: "HTML" },
  { itemName: "CSS" },
  { itemName: "JS" },
  { itemName: "SSG" },
  { itemName: "webdev" },
  { itemName: "animation" },
  { itemName: "UI/UX"}
];

// dynamically set secondsPerLoop prop based on screen width

const Partners: FC = () => {
  return (
    <>
      <div className="partners">
        <h1 className="partners__heading">
          Our Partners
        </h1>
        {/* replace with items for either the company's:
              tech stack items 
              or partners 
              or possibly services 
        */}
        <Carousel 
          carouselItems={carouselItems}
          itemClassName={"partners__partnerItem"}
          direction={"left"}
          carouselAriaLabel={"Horizontally scrolling list of web development topics"}
          secondsPerLoop={15}
        />
      </div>
    </>
  )};

export default Partners;