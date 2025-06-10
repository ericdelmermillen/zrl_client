import { useAppContext } from './contexts/AppContext';
import './App.scss';


function App() {
  const { 
    isLoggedIn,
    setIsLoggedIn,
    colorMode, 
    // setColorMode 
  } = useAppContext();

  console.log(`colorMode: ${colorMode}`);
  console.log(`isLoggedIn: ${isLoggedIn}`);
  

  return (
    <>
      <div className="App">
        <div className="card">
          <button 
            onClick={() => setIsLoggedIn(c => !c)}
          >
            {`isLoggedIn: ${isLoggedIn ? 'true' : 'false'}`}
          </button>
        </div>
      </div>
    </>
  )};

export default App;