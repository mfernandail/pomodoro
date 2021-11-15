import { useState } from 'react';
import { Context } from './context/SettingsContext';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [workMinutes, setWorkMinutes] = useState(10);
  const [breakMinutes, setBreakMinutes] = useState(2);
  const [counterStart, setCounterStart] = useState(true);

  return (
    <main>
      <Context.Provider value={{
          workMinutes, setWorkMinutes, 
          breakMinutes, setBreakMinutes,
          counterStart, setCounterStart
      }} >
        <Timer />
      </Context.Provider>
    </main>
  )
}

export default App;
