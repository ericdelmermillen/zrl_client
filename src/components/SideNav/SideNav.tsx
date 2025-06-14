import { useAppContext } from "../../contexts/AppContext.jsx";
import type { FC, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SideNav.scss";

interface SideNavProps {
  children?: ReactNode;
};

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const SideNav: FC<SideNavProps> = ({ children }) => {
    const { 
    showSideNav,
    setShowSideNav,
   } = useAppContext();

   const location = useLocation();

   const isOnHome: boolean = 
    location.pathname === "/" || 
    location.pathname === "/home" || 
    location.pathname === "/home/";

  const handleSetShowSideNavFalse = (): void => setShowSideNav(false);

    const handleSideNavClick = (): void => {

    setTimeout(() => {
      handleSetShowSideNavFalse()
    }, MIN_LOADING_INTERVAL * 1.5);
  };

  return (
    <>

     {showSideNav 
     
        ? 
          (
            <div 
              className="sideNav__clickOffDiv"
              onClick={handleSetShowSideNavFalse}
            ></div>
          )

          : null
      }

      <div className={`sideNav ${showSideNav ? "show" : ""}`}>
        <div className="sideNav__inner">
          <div 
            className="sideNav__close-button"
            onClick={handleSetShowSideNavFalse}
          >
            <div className="sideNav__close-icon"></div>
            <div className="sideNav__close-icon"></div>
          </div>
          
          <div className="sideNav__menu">
            <ul className='sideNav__links'>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className={`sideNav__link ${isOnHome ? "active" : ""}`} to="/">
                  HOME
                </NavLink>
              </li>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className='sideNav__link' to="/projects">
                  PROJECTS
                </NavLink>
              </li>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className='sideNav__link' to="/blog">
                  BLOG
                </NavLink>
              </li>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className='sideNav__link' to="/contact">
                  CONTACT
                </NavLink>
              </li>
            </ul>

          </div>

          {children}

        </div>
      </div>
    </>
  )};

export default SideNav;