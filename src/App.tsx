import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Nav from './components/Nav/Nav';
import NotFound from './pages/NotFound/NotFound';
import SideNav from './components/SideNav/SideNav';
import './App.scss';

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;


const App = (): JSX.Element => {
  const { 
    isLoading,
    // setIsLoading,
    isLoggedIn,
    // setIsLoggedIn,
    colorMode, 
    // setColorMode 
    logoutUser,
    // showSideNav,
    setShowSideNav
  } = useAppContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    setTimeout(() => {
      setShowSideNav(false);
    }, MIN_LOADING_INTERVAL);
  };


  return (
    <div className="app" data-color-mode={colorMode}>

      <div className={`loading ${isLoading ? "isLoading" : ""}`}></div>

      <div className="app__inner">

        <Nav>
          {isLoggedIn
            ? 
              (
                <button
                  className="app__logout--nav"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              )
            : null
          }

        </Nav>

        <SideNav>
          <div className="app__sideNav-children">

            {isLoggedIn
              ? 
                (
                  <button
                    className="app__logout--sideNav"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )
              : null
            }

            {/* <ColorModeToggle inputId={"sideNavColorModeToggle"} /> */}
            
          </div>
        </SideNav>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<NotFound />} />

        </Routes>

        <Footer />

      </div>

    </div>
  )};

export default App;