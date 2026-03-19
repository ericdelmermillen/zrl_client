import { type FC } from "react";
import { useAppContext } from "../../hooks/hooks";
import { FaAngleUp } from "react-icons/fa";
import { scrollToTop } from "../../../utils/utils";
import Day_1 from "../../assets/svgs/Day_1";
// import Day_2 from "../../assets/svgs/Day_2";
// import Day_3 from "../../assets/svgs/Day_3";
// import Day_3 from "../../assets/svgs/Day_3";
// import Day_4 from "../../assets/svgs/Day_4";
// import Day_5 from "../../assets/svgs/Day_5";
// import Night_1 from "../../assets/svgs/Night_1";
// import Night_2 from "../../assets/svgs/Night_2";
// import Night_3 from "../../assets/svgs/Night_3";
// import Night_4 from "../../assets/svgs/Night_4";
import Night_5 from "../../assets/svgs/Night_5";


import "./FloatingButton.scss";


const FloatingButton: FC = () => {
  const { colorMode, toggleColorMode } = useAppContext();
  
  return (
    <>
      <div className="floatingButton">
        <button className="floatingButton__toTheTop">
          <FaAngleUp 
            className="floatingButton__toTheTop--icon"
            onClick={scrollToTop}
          />
        </button>

        <button className="floatingButton__colorMode-toggle" onClick={toggleColorMode} >

          <Day_1 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/>
          {/* <Day_2 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/> */}
          {/* <Day_3 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/> */}
          {/* <Day_3 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/> */}
          {/* <Day_4 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/> */}
          {/* <Day_5 className={`floatingButton__colorMode-toggle--day ${colorMode === "dark" ? "show" : ""}`}/> */}
          {/* <Night_1 className={`floatingButton__colorMode-toggle--night ${colorMode === "light" ? "show" : ""}`}/> */}
          {/* <Night_2 className={`floatingButton__colorMode-toggle--night ${colorMode === "light" ? "show" : ""}`}/> */}
          {/* <Night_3 className={`floatingButton__colorMode-toggle--night ${colorMode === "light" ? "show" : ""}`}/> */}
          {/* <Night_4 className={`floatingButton__colorMode-toggle--night ${colorMode === "light" ? "show" : ""}`}/> */}
          <Night_5 className={`floatingButton__colorMode-toggle--night ${colorMode === "light" ? "show" : ""}`}/>

        </button>
      </div>
    </>
  )};

export default FloatingButton;