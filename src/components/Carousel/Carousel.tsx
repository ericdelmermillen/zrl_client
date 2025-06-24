import { type FC, useEffect, useRef } from 'react';
import "./Carousel.scss";

// add more properties to help with accessibility and SEO
interface CarouselItem {
  itemName: string;
};

interface CarouselProps {
  carouselItems: CarouselItem[];
  itemClassName?: string;
  direction?: "left" | "right";
  secondsPerLoop?: number;
};

  const Carousel: FC<CarouselProps> = ({ 
    carouselItems, 
    itemClassName = "carousel__item",
    direction = "left", 
    secondsPerLoop = 25 
  }) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const scroller = scrollerRef.current;
    const carousel = document.getElementById("carousel");

    if(!scroller || !carousel) {
      return;
    };

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if(prefersReducedMotion) {
      return;
    };

    scroller.setAttribute("data-animated", "true");

    const items = Array.from(carousel.children);

    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      carousel.appendChild(clone);
    });

  }, []);

  return (
    <div 
      className="carousel" 
      data-speed="fast" 
      ref={scrollerRef}
      data-direction={direction}
      aria-label="Scrolling list of web development topics"
      role="region"
    >
      
      <div className="carousel__inner">

        <ul 
          id="carousel" 
          className="carousel__track" 
          role="list"
          style={{
            animationDuration: `${secondsPerLoop}s`,
          }}
        >

          {carouselItems.map(item =>
          
            <li 
              key={item.itemName}
              className={itemClassName}
              aria-describedby={`desc-${item.itemName}`}
              role="listitem"
            >
              {item.itemName}
            </li>
          
          )}

        </ul>
      </div>
      
    </div>
  )};

export default Carousel;
