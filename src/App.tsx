import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DropdownNav from './components/DropdownNav/DropdownNav';
// import FloatingButton from './components/FloatingButton/FloatingButton';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import LogoutButton from './components/LogoutButton/LogoutButton';
import Modal from './components/Modal/Modal';
import Nav from './components/Nav/Nav';
import NavSocials from './components/NavSocials/NavSocials';
import NotFound from './pages/NotFound/NotFound';
import './App.scss';

// const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const navOptions = [
  {id: 1, optionName: "HOME"},
  {id: 2, optionName: "SOLUTIONS"},
  {id: 3, optionName: "DETAILS"},
  {id: 4, optionName: "EXPERTISE"}
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
          <Route path="/*" element={<NotFound />} />

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