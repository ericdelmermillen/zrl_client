import { type FC } from "react";
import type { NavProps } from "../../typing/interfaces/interfaces";
import { useAppContext, useModalContext } from "../../hooks/hooks";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import NavSocials from "../NavSocials/NavSocials";
import Logo from "../../assets/svgs/Logo";
import "./Nav.scss";

const NAV_CLICK_DELAY = import.meta.env.VITE_NAV_CLICK_DELAY;
const APP_ISLOADING_DELAY = import.meta.env.VITE_APP_ISLOADING_DELAY;

const Nav: FC<NavProps> = ({ children, navOptions }) => {
  const { 
    setAppIsLoading,
    isLoggedIn,
    scrollYPos,
    prevScrollYPos,
    navLinkClick,
    notFoundNavLinkClick,
    showDropdownNavOptions, 
    setShowDropdownNavOptions
  } = useAppContext();

  const { setShowModal } = useModalContext();

  const { pathname } = useLocation();
  const isOnHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  const handleToggleShowDropdownNav = (): void => {
    setShowDropdownNavOptions(prev => !prev);
    setShowModal(false);
  };

  const handleHomeClick = (): void => {
    setAppIsLoading(true);
    setTimeout(() => {
      requestAnimationFrame(() => {
        handleScrollToTop();
      });
    }, NAV_CLICK_DELAY);

    setTimeout(() => {
      setAppIsLoading(false);
    }, APP_ISLOADING_DELAY);
  };

  const handleScrollToTop = () => {
    setShowDropdownNavOptions(false);
    scrollToTop();
    setShowModal(false);
  };

  
  return (
    <>
      <nav className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
        <div className="nav__content">

          <div 
            className="nav__logo-box"
            onClick={isOnHome ? handleScrollToTop: handleHomeClick}
          >
            <Link to="/">
            <Logo className={"nav__logo"}/>
            </Link>
          </div>
        
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
            
            {isLoggedIn 
              ? (
                 <li>
                    <div 
                      className={`nav__link`} 
                      onClick={() => navLinkClick("admin")}
                    >
                      ADMIN
                    </div>
                  </li>

                )

              : <NavSocials />

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