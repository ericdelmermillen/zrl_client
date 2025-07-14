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
    // showSideNav,
    setShowSideNav
   } = useAppContext();

  const { pathname } = useLocation();
  const isOnHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  const handleScrollToTop = () => {
    setIsLoading(true);
    scrollToTop();
    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);
  };

  const handleSetShowSideNavTrue = (): void => {setShowSideNav(true)};

  const handleHideNav = (): void => {
    // addClassToDiv("nav", "hide")
    console.log("hiding nav")
  }
   
  
  return (
    <>
      <nav id="nav" className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
        <div className="nav__content">

          <Link to={"/"}>
            <div 
              className="nav__logo-box"
              onClick={isOnHome 
                ? handleScrollToTop
                // why undefined and not null?
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

          {/* 
            <li 
              className="nav__item"
              onClick={handleHideNav}
            >
              <a 
                href="#pricing"
                className="nav__link"
              >
                Pricing
                </a>
            </li> 
          */}

          
          {/* 
            <li className="nav__item">
              <NavLink className="nav__link" to={"/blog"}>
                BLOG
              </NavLink>
            </li> 
          
          */}


          </ul>

          <div 
            className="nav__toggle-button" 
            aria-label="Toggle Menu"
            onClick={handleSetShowSideNavTrue}
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
