import { type FC, useState, useEffect } from "react";
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
  { itemName: "UI/UX" }
];


const getLoopDuration = (width: number): number => {
  if (width >= 1024) {
    return 18;
  };

  if (width >= 768) {
    return 18;
  };
  
  if (width >= 540) {
    return 15;
  };
  
  return 12;
};

const Partners: FC = () => {
  const [ windowWidth, setWindowWidth ] = useState<number>(window.innerWidth);

  // useEffect to handle window 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const secondsPerLoop = getLoopDuration(windowWidth);

  return (
    <div className="partners">

      <div className="partners__inner">

        <h2 className="partners__heading">Our Partners</h2>

        <Carousel 
          itemClassName="partners__partnerItem"
          carouselItems={carouselItems}
          secondsPerLoop={secondsPerLoop}
          direction="left"
          carouselAriaLabel="Horizontally scrolling list of web development topics"
        />
      </div>
    </div>
  )};

export default Partners;