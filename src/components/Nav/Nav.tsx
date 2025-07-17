import { type FC, type ReactNode } from "react";
import { useAppContext } from "../../contexts/AppContext.tsx";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop, 
  // addClassToDiv 
} from "../../../utils/utils.ts";
import Logo from "../../assets/svgs/Logo.tsx";
import "./Nav.scss";
import type { NavOption } from "@/interfaces/interfaces.ts";


// const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

interface NavProps {
  children?: ReactNode;
  navOptions: NavOption[]
};

const Nav: FC<NavProps> = ({ children, navOptions }) => {
  const { 
    setIsLoading,
    scrollYPos,
    prevScrollYPos,
    navLinkClick,
    notFoundNavLinkClick,
    showDropdownNavOptions, 
    setShowDropdownNavOptions,
    // hideNav
  } = useAppContext();

  const { pathname } = useLocation();
  const isOnHome = pathname === "/" || pathname === "/home" || pathname === "/home/";


  const handleToggleShowDropdownNavTrue = (): void => setShowDropdownNavOptions(prev => !prev);



  const handleScrollToTop = () => {
    setIsLoading(true);
    // timing for closing NavDropdownMenu?
    setShowDropdownNavOptions(false);
    scrollToTop();
    setTimeout(() => {
      setIsLoading(false);
    // }, MIN_LOADING_INTERVAL);
    }, 250);
  };

  
  return (
    <>
      <nav className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
        <div className="nav__content">

          <Link to={"/"}>
            <div 
              className="nav__logo-box"
              onClick={isOnHome 
                ? handleScrollToTop
                : undefined}
            >
              <Logo className={"nav__logo"}/>
            </div>
          </Link>
        
          <ul className="nav__links">


            {navOptions.map(option => 

              <li key={option.id}>
                <div 
                  className={`nav__link`} 
                  onClick={isOnHome 
                    ? () => navLinkClick(option.optionName)
                    : () => notFoundNavLinkClick(option.optionName)}
                >
                  {`${option.optionName}`}
                </div>
              </li>
            )}

          </ul>

          <div 
            className={`nav__toggle-button ${showDropdownNavOptions ? "open" : ""}`}
            aria-label="Toggle Menu"
            onClick={handleToggleShowDropdownNavTrue}
          >
            <div className="nav__toggle-icon"></div>
            <div className="nav__toggle-icon"></div>
            <div className="nav__toggle-icon"></div>
          </div>

          {children}
        </div>
        
        
      </nav>
    </>
  )};

export default Nav;
