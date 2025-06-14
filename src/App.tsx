import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Nav from './components/Nav/Nav';
import NotFound from './pages/NotFound/NotFound';
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
    logoutUser
  } = useAppContext();

  const navigate = useNavigate();

     const handleLogout = () => {
    logoutUser();
    navigate("/");
    setTimeout(() => {
      // setShowSideNav(false);
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