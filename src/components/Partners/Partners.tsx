import type { FC } from "react";
import Carousel from "../Carousel/Carousel";
import "./Partners.scss";

const carouselItems = [
  {itemName: "HTML"},
  {itemName: "CSS"},
  {itemName: "JS"},
  {itemName: "SSG"},
  {itemName: "webdev"},
  {itemName: "animation"},
  {itemName: "UI/UX"}
];

const Partners: FC = () => {
  return (
    <>
      <div className="partners">
        <h1 className="partners__heading">
          Our Partners
        </h1>
        <Carousel 
          carouselItems={carouselItems}
          itemClassName={"partners__partnerItem"}
          direction={"right"}
          secondsPerLoop={15}
        />
      </div>
    </>
  )};

export default Partners;