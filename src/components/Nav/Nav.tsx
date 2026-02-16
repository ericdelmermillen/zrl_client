import { type FC } from "react";
import type { NavProps } from "../../typing/interfaces/interfaces";
import { useAppContext } from "../../hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import NavSocials from "../NavSocials/NavSocials";
import Logo from "../../assets/svgs/Logo";
import "./Nav.scss";

const NAV_CLICK_DELAY = import.meta.env.VITE_NAV_CLICK_DELAY;


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

  const { pathname } = useLocation();
  const isOnHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  const navigate = useNavigate();

  const handleToggleShowDropdownNav = (): void => setShowDropdownNavOptions(prev => !prev);

  const handleHomeClick = (): void => {
    navigate("/")
    setTimeout(() => {
      requestAnimationFrame(() => {
        handleScrollToTop();
      });
    }, NAV_CLICK_DELAY)
  };

  const handleScrollToTop = () => {
    navigate("/");
    setAppIsLoading(true);
    setShowDropdownNavOptions(false);
    scrollToTop();
    setAppIsLoading(false);
  };

  
  return (
    <>
      <nav className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
        <div className="nav__content">

          <div 
            className="nav__logo-box"
            onClick={isOnHome ? handleScrollToTop: handleHomeClick}
          >
            <Logo className={"nav__logo"}/>
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