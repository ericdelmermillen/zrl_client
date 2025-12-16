import type { JSX } from "react";
import { type IconType } from "./typing/types/types";
import { useAppContext } from "./contexts/AppContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidCommentError, BiSolidLogInCircle } from "react-icons/bi";
import { BsCpuFill, BsLightningChargeFill, BsShieldExclamation } from "react-icons/bs";
import { FaCogs, FaExclamationTriangle, FaGlobeAmericas, FaIdCard } from "react-icons/fa";
import { FaBugs, FaCode, FaLink, FaMicrochip, FaRobot, FaUserSecret } from "react-icons/fa6";
import { GiLightningArc } from "react-icons/gi";
import { IoIosLock, IoMdKey } from "react-icons/io";
import { IoFingerPrintOutline } from "react-icons/io5";
import { MdOutlinePassword, MdOutlineSyncProblem, MdSecurity } from "react-icons/md";
import { PiKeyhole, PiTerminal } from "react-icons/pi";
import { RiSettings5Fill } from "react-icons/ri";
import { TbCloudLock, TbError404, TbFaceId, TbScan } from "react-icons/tb";
import { Toaster } from "react-hot-toast";
import DropdownNav from "./components/DropdownNav/DropdownNav";
// import FloatingButton from "./components/FloatingButton/FloatingButton";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import Modal from "./components/Modal/Modal";
import Nav from "./components/Nav/Nav";
import NavSocials from "./components/NavSocials/NavSocials";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import WallPaper from "./components/WallPaper/WallPaper"
import "./App.scss";


// const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const navOptions = [
  {id: 1, optionName: "SOLUTIONS"},
  {id: 2, optionName: "DETAILS"},
  {id: 3, optionName: "EXPERTISE"},
  {id: 4, optionName: "VALUES"}
]

const LoginIconOptions: IconType[] = [  
  IoIosLock,
  IoMdKey,
  IoFingerPrintOutline,
  TbFaceId,
  FaUserSecret,
  MdSecurity,
  FaIdCard,
  RiSettings5Fill,
  FaGlobeAmericas,
  TbCloudLock,
  FaLink,
  PiTerminal,
  BiSolidLogInCircle,
  TbScan,
  MdOutlinePassword,
  PiKeyhole
];

const notFoundIconOptions: IconType[] = [  
  AiOutlineException,
  BsCpuFill,
  BiSolidCommentError,
  BsLightningChargeFill,
  BsShieldExclamation,
  FaBugs,
  FaCode,
  FaCogs,
  FaMicrochip,
  FaRobot,
  GiLightningArc,
  TbError404,
  FaExclamationTriangle,
  MdOutlineSyncProblem
];


const App = (): JSX.Element => {
  const { 
    isLoading,
    // setIsLoading,
    isLoggedIn,
    // setIsLoggedIn,
    colorMode, 
    // setColorMode 
    prevScrollYPos,
    scrollYPos,
    modalType
  } = useAppContext();


  return (
    <div className="app" data-color-mode={colorMode}>

      <div className={`loading ${isLoading ? "isLoading" : ""}`}></div>

      <div 
        id="nav-container" 
        className={`app__nav-container ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}
      >
        <div className="app__nav-background"></div>

        <Nav navOptions={navOptions}>
          {isLoggedIn
            ? 
              (
                <div className="app__logout app__logout--nav ">
                  <LogoutButton />
                </div>
              )
            : null
          }

        </Nav>

        <DropdownNav navOptions={navOptions}>
          {isLoggedIn
            ? 
              (
                <div className="app__logout app__logout--dropdown-nav">
                  <LogoutButton />
                </div>
              )
            : 
              <div className="app__dropdown-nav app__dropdown-nav--socials">
                <NavSocials />
              </div>
          }
        </DropdownNav>

      </div>

      <div className="app__inner">

        <Modal>
          {modalType === "privacy"
            ? <p>Privacy Policy</p>
            : modalType === "terms"
            ? <p>Terms & Conditions</p>
            : null
          }
        </Modal>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/login"
            element={
              <Login>
                <WallPaper 
                customIcons={LoginIconOptions}
                />
              </Login>
            }
          />
          <Route
            path="/*"
            element={
              <NotFound>
                <WallPaper 
                customIcons={notFoundIconOptions}/>
              </NotFound>
            }
          />

        </Routes>

        {/* <FloatingButton /> */}

        <Footer />

        <Toaster
          position="bottom-center"
          reverseOrder={false} // Newest toast at the bottom
          gutter={8} // Space between toasts
          containerStyle={{ top: 20, right: 20 }}
          toastOptions={{
            duration: 3000,
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
            style: {
              background: "#333",
              color: "#fff",
              padding: "16px",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "white",
                secondary: "green",
              },
              style: {
                background: "green",
                color: "#fff",
              },
            },
            error: {
              duration: 3000,
              icon: "🔥",
              style: {
                background: "red",
                color: "#fff",
              },
            },
            loading: {
              duration: Infinity,
              icon: "⏳",
              style: {
                background: "#007bff",
                color: "#fff",
              },
            },
          }}
        />

      </div>

    </div>
  )};

export default App;