import { type FC, type ReactNode } from "react";
import { useAppContext } from "../../contexts/AppContext.tsx";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop, 
  // addClassToDiv 
} from "../../../utils/utils.ts";
import Logo from "../../assets/svgs/Logo.tsx";
import "./Nav.scss";


const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

interface NavProps {
  children?: ReactNode;
};

const Nav: FC<NavProps> = ({ children }) => {
    const { 
    setIsLoading,
    scrollYPos,
    prevScrollYPos,
    // showDropdownNavOptions, 
    setShowDropdownNavOptions,
    hideNav
   } = useAppContext();

  const { pathname } = useLocation();
  const isOnHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  const handleScrollToTop = () => {
    setIsLoading(true);
    // timing for closing NavDropdownMenu?
    setShowDropdownNavOptions(false);
    scrollToTop();
    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);
  };

  const handleToggleShowDropdownNavTrue = (): void => setShowDropdownNavOptions(prev => !prev);


  const handleHideNav = (): void => {
    setTimeout(() => {
      hideNav()
    }, MIN_LOADING_INTERVAL)
  }
   
  
  return (
    <>
      <nav 
      // id="nav" 
      className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
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

            <li className="nav__item">
              <Link 
                className={`nav__link ${isOnHome ? "active" : ""}`}
                to={"/home"}
                onClick={isOnHome 
                ? handleScrollToTop
                : undefined}
              >
                Home
              </Link>
            </li>

            <li 
              className="nav__item"
              onClick={handleHideNav}
            >
              <a 
                href="#solutions"
                className="nav__link"
              >
                Solutions
                </a>
            </li>

            <li 
              className="nav__item"
              onClick={handleHideNav}
            >
              <a 
                href="#evaluationAndDeployment"
                className="nav__link"
              >
                Details
                </a>
            </li>

            <li 
              className="nav__item"
              onClick={handleHideNav}
            >
              <a 
                href="#expertise"
                className="nav__link"
              >
                Expertise
                </a>
            </li>

          </ul>

          <div 
            className="nav__toggle-button" 
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
