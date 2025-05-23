import { useState } from 'react'
import './App.scss'

function App() {
  const [ count, setCount ] = useState(0);

  return (
    <>
      <div className="App">
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </>
  )};

export default App;