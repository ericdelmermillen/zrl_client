import { type FC, type ReactNode, useEffect, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext.js";
import { useLocation } from "react-router-dom";
import "./DropdownNav.scss";


// *** will need to render logout button for admin here
// *** possibly need to render color mode toggler here


interface NavOption {
  id: number;
  optionName: string;
}

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
    }
  };

  // useEffect to close dropdown on scroll
  useEffect(() => {
    if(scrollYPos > prevScrollYPos) {
      setShowDropdownNavOptions(false);
    }
  }, [scrollYPos, prevScrollYPos]);
  
  return (
    <>
      <nav className={`dropdownNav ${showDropdownNavOptions ? "tall" : "short"}`}>
        <div ref={innerRef} className={`dropdownNav__inner ${showDropdownNavOptions ? "tall" : ""}`}>
          <ul className={`dropdownNav__options ${showDropdownNavOptions ? "tall" : ""}`}>
            <li className={`dropdownNav__option dropdownNav__option--hidden ${!showDropdownNavOptions ? "short" : ""}`} >
              Dropdown Nav Menu
            </li>

            {navOptions.map(option => 

              <li key={option.id}>
                  <div 
                    className={`dropdownNav__option`} 
                    onClick={isOnHome 
                      ? () => navLinkClick(option.optionName)
                      : () => notFoundNavLinkClick(option.optionName)}
                  >
                    {`${option.optionName}`}
                  </div>
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