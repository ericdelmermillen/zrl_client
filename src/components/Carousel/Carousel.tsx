import { type FC, useRef, useEffect } from 'react';
import "./Carousel.scss";

export interface CarouselItem {
  itemName: string;
};

interface CarouselProps {
  carouselItems: CarouselItem[];
  itemClassName?: string;
  direction?: "left" | "right";
  secondsPerLoop?: number;
  carouselAriaLabel?: string;
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Carousel: FC<CarouselProps> = ({
  carouselItems,
  direction = "left",
  itemClassName = "carousel__item",
  secondsPerLoop = 25,
  carouselAriaLabel = "Horizontally scrolling list of items"
}) => {

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);


useEffect(() => {
  const carousel = carouselRef.current;
  const scroller = scrollerRef.current;

  if (!carousel || !scroller) return;

  // Prevent animation if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  };

  // Get the original set of items
  const originalItems = Array.from(scroller.children);

  // Clone the full set exactly once for seamless looping
  const clones = originalItems.map((item) => {
    const clone = item.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    return clone;
  });

  clones.forEach(clone => scroller.appendChild(clone));

  // Now that everything is set up, enable animation
  carousel.setAttribute("data-animated", "true");
}, []);


  return (
    <div
      className="carousel"
      ref={carouselRef}
      data-direction={direction}
      aria-label={carouselAriaLabel}
      role="region"
    >
      <div className="carousel__inner">
        <ul
          ref={scrollerRef}
          className={`carousel__track ${prefersReducedMotion ? "reducedMotion" : ""}`}
          role="list"
          style={{ animationDuration: `${secondsPerLoop}s` }}
        >
          {carouselItems.map((item, idx) => (
            <li
              key={`${item.itemName}-${idx}`}
              className={itemClassName}
              aria-describedby={`desc-${item.itemName}-${idx}`}
              role="listitem"
            >
              {item.itemName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )};

export default Carousel;