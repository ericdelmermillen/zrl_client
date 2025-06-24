import { type FC, useRef, useEffect } from 'react';
import "./Carousel.scss";

// Define and export the item type for reuse
export interface CarouselItem {
  itemName: string;
}

interface CarouselProps {
  carouselItems: CarouselItem[];
  itemClassName?: string;
  direction?: "left" | "right";
  secondsPerLoop?: number;
  carouselAriaLabel?: string
}

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

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(prefersReducedMotion) {
      return;
    };

    carousel.setAttribute("data-animated", "true");

    const items = Array.from(scroller.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scroller.appendChild(clone);
    });
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
          className="carousel__track"
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
  );
};

export default Carousel;