import { type FC, useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.js";
import { scrollToTop } from "../../../utils/utils";
import "./DropdownNav.scss";

// const MIN_LOADING_INTERVAL = import.meta.env.VIT_MIN_LOADING_INTERVAL;

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
    setShowDropdownNavOptions,
    handleNavigateHome
  } = useAppContext();

  const innerRef = useRef<HTMLDivElement | null>(null);

  // define acceptable strings in a type later

  // ***

  const navigate = useNavigate();

  const handleUpdateSelectValue = (option: SelectOption): void => {
    if(option.optionName.toLowerCase() === "home") {
      handleNavigateHome();
      scrollToTop()
    };

    if(option.optionName.toLowerCase() === "solutions") {
      navigate("/#solutions");
    };
    
    if(option.optionName.toLowerCase() === "details") {
      navigate("/#details");
    };
    
    if(option.optionName.toLowerCase() === "expertise") {
      navigate("/#expertise");
    };

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
          <div className={`dropdownNav__select ${showDropdownNavOptions ? "tall" : ""}`}>
            <div className={`dropdownNav__selectValue ${!showDropdownNavOptions ? "short" : ""}`} >

              <span className="dropdownNav__visually-hidden-label">
                Dropdown Nav Menu
              </span>
            </div>

            {dropdownNavOptions.map(option => 

              <a 
                href={option.optionName.toLowerCase() !== "home" ? `#${option.optionName.toLocaleLowerCase()}` : ""}
                className="dropdownNav__link"
                key={option.id}
                onClick={() => handleUpdateSelectValue(option)}
              >
                <div 
                  className={`dropdownNav__option`} 
                  key={option.id} 
                  onClick={() => handleUpdateSelectValue(option)}
                >
                    {`${option.optionName}`}
                </div>
              </a>
            )}

            { children }

          </div>
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
