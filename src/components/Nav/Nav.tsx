import { type FC, type ReactNode } from "react";
import { useAppContext } from "../../contexts/AppContext.tsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils.ts"
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

  const handleSetShowSideNavTrue = (): void => {setShowSideNav(true)}
   
  
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
              >
                HOME
              </Link>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" to={"/projects"}>
                PROJECTS
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" to={"/blog"}>
                BLOG
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" to={"/contact"}>
                CONTACT
              </NavLink>
            </li>

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

        </div>
        
          {children}
        
      </nav>
    </>
  )};

export default Nav;
