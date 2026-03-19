import { useState, type JSX } from "react";
import { type IconType } from "./typing/types/types";
import { type NavOption } from "./typing/interfaces/interfaces";
import { useAppContext } from "./hooks/hooks";
import { Routes, Route, Navigate } from "react-router-dom";
import { AiOutlineException } from "react-icons/ai";
import { BiSolidCommentError } from "react-icons/bi";
import { BsCpuFill, BsLightningChargeFill, BsShieldExclamation } from "react-icons/bs";
import { FaChartBar, FaClipboardList, FaCog, FaCogs, FaExclamationTriangle, FaFileAlt, FaGlobeAmericas, FaIdCard, FaSyncAlt, FaTachometerAlt, FaTasks, FaWrench } from "react-icons/fa";
import { FaBugs, FaChartLine, FaCode, FaFolderOpen, FaLink, FaMicrochip, FaPowerOff, FaRobot, FaUserSecret } from "react-icons/fa6";
import { GiLightningArc } from "react-icons/gi";
import { IoIosLock, IoMdKey } from "react-icons/io";
import { IoFingerPrintOutline } from "react-icons/io5";
import { MdMonitor, MdOutlineSyncProblem, MdSecurity } from "react-icons/md";
import { PiKeyhole, PiTerminal } from "react-icons/pi";
import { RiSettings5Fill } from "react-icons/ri";
import { TbCloudLock, TbError404, TbFaceId, TbScan } from "react-icons/tb";
import { ToastContainer } from "react-toastify";
import Admin from "./pages/Admin/Admin";
import DropdownNav from "./components/DropdownNav/DropdownNav";
// import FloatingButton from "./components/FloatingButton/FloatingButton";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import IsLoading from "./components/IsLoading/IsLoading";
import Login from "./pages/Login/Login";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import Modal from "./components/Modal/Modal";
import Nav from "./components/Nav/Nav";
import NavSocials from "./components/NavSocials/NavSocials";
import NotFound from "./pages/NotFound/NotFound";
import WallPaper from "./components/WallPaper/WallPaper"
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";


const navOptions: NavOption[] = [
  {id: 1, optionName: "SOLUTIONS"},
  {id: 2, optionName: "DETAILS"},
  {id: 3, optionName: "EXPERTISE"},
  {id: 4, optionName: "VALUES"}
]

const LoginIconOptions: IconType[] = [  
  FaGlobeAmericas,
  FaIdCard,
  FaLink,
  FaUserSecret,
  IoFingerPrintOutline,
  IoIosLock,
  IoMdKey,
  MdSecurity,
  PiKeyhole,
  PiTerminal,
  RiSettings5Fill,
  TbCloudLock,
  TbFaceId,
  TbScan
];

const AdminIconOptions: IconType[] = [  
  FaChartBar,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaFileAlt,
  FaFolderOpen,
  FaPowerOff,
  FaTachometerAlt,
  FaTasks,
  FaSyncAlt,
  FaWrench,
  MdMonitor,
  PiTerminal,
  RiSettings5Fill
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
  FaFileAlt,
  FaMicrochip,
  FaRobot,
  GiLightningArc,
  TbError404,
  FaExclamationTriangle,
  MdOutlineSyncProblem
];


const App = (): JSX.Element => {
  const { 
    appIsLoading,
    isLoggedIn,
    colorMode, 
    // setColorMode,
    prevScrollYPos,
    scrollYPos
  } = useAppContext();

  // local state: used here to prevent showing NotFound page if admin user was logged in and on protected page before refreshing and calling server for session verification
  const [ loginStatusPending ]= useState(localStorage.getItem("wasLoggedIn") === "true");

  return (
    <div className="app" data-color-mode={colorMode}>

      <div className={`app__isLoading ${appIsLoading ? "show" : ""}`}>
        <IsLoading />
      </div>

      <div 
        id="nav-container" 
        className={`app__nav-container ${prevScrollYPos < scrollYPos && scrollYPos > 50 
          ? "hide" 
          : ""}`}
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

        <Modal/>

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

          {isLoggedIn || loginStatusPending

            ? (
                <Route
                  path="/admin"
                  element={
                    <Admin>
                      <WallPaper 
                        customIcons={AdminIconOptions}/>
                    </Admin>
                }/>
              )
            : null

          }
          
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
 
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnHover
          theme={colorMode === "dark" ? "dark" : "light" } 
        />
      </div>
      <Footer />

    </div>
  )};

export default App;