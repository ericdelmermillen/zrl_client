import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Routes, Route, 
  // useNavigate
 } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import './App.scss';


const App = (): JSX.Element => {
  const { 
    isLoading,
    // setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    colorMode, 
    // setColorMode 
  } = useAppContext();

  // const navigate = useNavigate();


  return (
    <div className="app" data-color-mode={colorMode}>

      <div className={`loading ${isLoading ? "isLoading" : ""}`}></div>

      <div className="app__inner">

        <button onClick={() => setIsLoggedIn((prev) => !prev)}>
          {`isLoggedIn: ${isLoggedIn}`}
        </button>


          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>

      </div>

    </div>
  )};

export default App;