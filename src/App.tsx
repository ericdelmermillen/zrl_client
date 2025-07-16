import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DropdownNav from './components/DropdownNav/DropdownNav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Modal from './components/Modal/Modal';
import Nav from './components/Nav/Nav';
import NotFound from './pages/NotFound/NotFound';
import './App.scss';

// const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;


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
    logoutUser,
    modalType
  } = useAppContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };


  return (
    <div className="app" data-color-mode={colorMode}>

      <div className={`loading ${isLoading ? "isLoading" : ""}`}></div>

      <div 
        id="nav-container" 
        className={`app__nav-container ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}
      >
        <div className="app__nav-background"></div>

        <Nav>
          {isLoggedIn
            ? 
              (
                <button
                  className="app__logout app__logout--nav"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              )
            : null
          }

        </Nav>

        <DropdownNav>
          {isLoggedIn
            ? 
              (
                <button
                  className="app__logout app__logout--dropdown-nav"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              )
            : null
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
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home" element={<Navigate to="/" replace />} />
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