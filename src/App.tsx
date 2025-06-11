import type { JSX } from 'react';
import { useAppContext } from './contexts/AppContext';
import './App.scss';


const App = (): JSX.Element => {
  const { 
    isLoggedIn,
    setIsLoggedIn,
    colorMode, 
    // setColorMode 
  } = useAppContext();


  return (
    <div className={`App ${colorMode || 'light'}`}>
      <div className="card">
        <button onClick={() => setIsLoggedIn((prev) => !prev)}>
          {`isLoggedIn: ${isLoggedIn}`}
        </button>
      </div>
    </div>
  );
};

export default App;