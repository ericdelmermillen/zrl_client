import { type FC, type ReactNode, useEffect, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext.js";
import { useLocation } from "react-router-dom";
import type { NavOption } from "../../interfaces/interfaces";
import "./DropdownNav.scss";


// *** will need to render logout button for admin here
// *** possibly need to render color mode toggler here

interface DropdownNavProps {
  navOptions: NavOption[]; // not optional and properly typed
  children: ReactNode;
}

const DropdownNav: FC<DropdownNavProps> = ({ children, navOptions }) => {
  
  const {
    scrollYPos, 
    prevScrollYPos, 
    navLinkClick,
    notFoundNavLinkClick,
    showDropdownNavOptions, 
    setShowDropdownNavOptions
  } = useAppContext();

  const innerRef = useRef<HTMLDivElement | null>(null);

  const { pathname } = useLocation();
  const isOnHome = pathname === "/";

  
  const handleTouchOff = (): void => {
    setShowDropdownNavOptions(false);

    // Reset scroll position to top
    if(innerRef.current) {
      innerRef.current.scrollTop = 0;
    };
  };

  // useEffect to close dropdown on scroll
  useEffect(() => {
    if(scrollYPos > prevScrollYPos) {
      setShowDropdownNavOptions(false);
    };
  }, [scrollYPos, prevScrollYPos]);
  
  return (
    <>
      <nav className={`dropdownNav ${showDropdownNavOptions ? "tall" : "short"}`}>
        <div ref={innerRef} className={`dropdownNav__inner ${showDropdownNavOptions ? "tall" : ""}`}>
          <ul className={`dropdownNav__links ${showDropdownNavOptions ? "tall" : ""}`}>
            <li className="dropdownNav__link dropdownNav__link--hidden" >
              Dropdown Nav Menu
            </li>

            {navOptions.map(option => 

              <li 
                className="dropdownNav__link"
                key={option.id}
                onClick={isOnHome 
                  ? () => navLinkClick(option.optionName)
                  : () => notFoundNavLinkClick(option.optionName)}
              >
                <span className="dropdownNav__link-text">
                  {`${option.optionName}`}
                </span>
              </li>
            )}

            { children }

          </ul>
        </div>
      </nav>
      <div 
        className={`dropdownNav__touchOffDiv ${showDropdownNavOptions 
          ? "show"
          : ""}`}
        onClick={handleTouchOff}
      ></div> 
    </>
  )};

export default DropdownNav;