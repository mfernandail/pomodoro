import { useState } from 'react';
import { Context } from './context/SettingsContext';
import Timer from './components/Timer';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [workMinutes, setWorkMinutes] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(1);

  return (
    <main>
      <Context.Provider value={{workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes}} >
        <Timer />
        <Settings />
      </Context.Provider>
    </main>
  )
}

export default App;
