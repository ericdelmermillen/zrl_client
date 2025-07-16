import { type FC, useEffect, useRef, type ReactNode } from "react";
import { useAppContext } from "../../contexts/AppContext.js";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import "./DropdownNav.scss";


// *** will need to render logout button for admin here
// *** possibly need to render color mode toggler here

interface DropdownNavProps {
  dropdownNavOptions?: [];
  children: ReactNode;
}

interface SelectOption {
  id: string | number;
  optionName: string;
}

const dropdownNavOptions = [
  {id: 1, optionName: "HOME"},
  {id: 2, optionName: "SOLUTIONS"},
  {id: 3, optionName: "DETAILS"},
  {id: 4, optionName: "EXPERTISE"}
];

const DropdownNav: FC<DropdownNavProps> = ({ children }) => {
  
  const {
    scrollYPos, 
    prevScrollYPos, 
    showDropdownNavOptions, 
    setShowDropdownNavOptions
  } = useAppContext();

  const innerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // define acceptable strings in a type later

  // ***
  const handleUpdateSelectValue = (e: React.MouseEvent, option: SelectOption): void => {
    e.preventDefault();
    
    const link = document.createElement('a');
    link.href = `/#${option.optionName.toLowerCase()}`;

    document.body.appendChild(link);

    setTimeout(() => {
      requestAnimationFrame(() => {
        if(option.optionName.toLowerCase() === "home") {
          navigate("/");
          scrollToTop();
        } else {
          link.click();
        };
      });
      // make this an env variable for timing
    }, 700);
    setShowDropdownNavOptions(false);
  };




  
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
          <ul className={`dropdownNav__select ${showDropdownNavOptions ? "tall" : ""}`}>
            <div className={`dropdownNav__selectValue ${!showDropdownNavOptions ? "short" : ""}`} >

              <span className="dropdownNav__visually-hidden-label">
                Dropdown Nav Menu
              </span>
            </div>

            {dropdownNavOptions.map(option => 

              <li key={option.id}>
                  <div className={`dropdownNav__option`} onClick={(e) => handleUpdateSelectValue(e, option)}>
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