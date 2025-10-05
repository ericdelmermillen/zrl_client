import { type FC, type ReactNode } from "react";
import type { NavOption } from "../../interfaces/interfaces";
import { useAppContext } from "../../contexts/AppContext.tsx";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils.ts";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import Logo from "../../assets/svgs/Logo.tsx";
import "./Nav.scss";


const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

interface NavProps {
  children?: ReactNode;
  navOptions: NavOption[]
};

const Nav: FC<NavProps> = ({ children, navOptions }) => {
  const { 
    setIsLoading,
    isLoggedIn,
    scrollYPos,
    prevScrollYPos,
    navLinkClick,
    notFoundNavLinkClick,
    showDropdownNavOptions, 
    setShowDropdownNavOptions
  } = useAppContext();

  const { pathname } = useLocation();
  const isOnHome = pathname === "/" || pathname === "/home" || pathname === "/home/";


  const handleToggleShowDropdownNav = (): void => setShowDropdownNavOptions(prev => !prev);


  const handleScrollToTop = () => {
    setIsLoading(true);
    setShowDropdownNavOptions(false);
    scrollToTop();
    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);
  };

  
  return (
    <>
      <nav className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
        <div className="nav__content">

          <Link to={"/"}>
            <div 
              className="nav__logo-box"
              onClick={isOnHome ? handleScrollToTop: undefined}
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
            )
            }
            {!isLoggedIn ?

              <div className="nav__socials">
                <div className="nav__social nav__social--facebook">
                  <a href="" className="nav__social--link">
                    <FaFacebookF className="nav__social--icon"/>
                  </a>
                </div>
       
                <div className="nav__social nav__social--twitter">
                  <IoLogoTwitter className="nav__social--icon"/>
                </div>
              </div>

              : null

            }

          </ul>

          <div 
            className={`nav__toggle-button ${showDropdownNavOptions ? "open" : ""}`}
            aria-label="Toggle Menu"
            onClick={handleToggleShowDropdownNav}
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