import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Modal from './components/Modal/Modal';
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
    setShowSideNav,
    modalType
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

      <div className="app__inner">

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
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<NotFound />} />

        </Routes>

        <Footer />

        <Toaster
          position="bottom-center"
          reverseOrder={false} // Newest toast at the bottom
          gutter={8} // Space between toasts
          containerStyle={{ top: 20, right: 20 }}
          toastOptions={{
            duration: 3000,
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
            style: {
              background: '#333',
              color: '#fff',
              padding: '16px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'white',
                secondary: 'green',
              },
              style: {
                background: 'green',
                color: '#fff',
              },
            },
            error: {
              duration: 3000,
              icon: '🔥',
              style: {
                background: 'red',
                color: '#fff',
              },
            },
            loading: {
              duration: Infinity,
              icon: '⏳',
              style: {
                background: '#007bff',
                color: '#fff',
              },
            },
          }}
        />

      </div>

    </div>
  )};

export default App;