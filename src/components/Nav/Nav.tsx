import type { FC, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.scss";


interface NavProps {
  children?: ReactNode;
};

const Nav: FC<NavProps> = ({ children }) => {
  return (
    <>
      <nav 
        id="nav" 
        // className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}
        className="nav"
      >
        <div className="nav__content">
        
          <ul className="nav__links">

            <li className="nav__item">
              <Link 
                className={"nav__link"}
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
            // onClick={handleSetShowSideNavTrue}
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
