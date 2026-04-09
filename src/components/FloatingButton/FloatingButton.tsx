import { type FC } from "react";
import { useAppContext } from "../../hooks/hooks";
import { FaAngleUp } from "react-icons/fa";
import { scrollToTop } from "../../../utils/utils";
import Day_2 from "../../assets/svgs/Day_2";
import Night_5 from "../../assets/svgs/Night_5";


import "./FloatingButton.scss";


const FloatingButton: FC = () => {
  const { colorMode, toggleColorMode } = useAppContext();
  
  return (
    <>
      <div className="floatingButton">
        <button className="floatingButton__toTheTop" type="button">
          <FaAngleUp 
            className="floatingButton__toTheTop--icon"
            onClick={scrollToTop}
          />
        </button>

        <button 
          className="floatingButton__colorMode-toggle" 
          onClick={toggleColorMode}
          type="button"
        >
          <Day_2 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/>

          <Night_5 className={`floatingButton__colorMode-toggle--night ${colorMode === "light" ? "show" : ""}`}/>

        </button>
      </div>
    </>
  );
};

export default FloatingButton;