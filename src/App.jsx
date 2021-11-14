import { useState } from 'react';
import { Context } from './context/SettingsContext';
import Timer from './components/Timer';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <Context.Provider value={{}} >
        <Timer />
        <Settings />
      </Context.Provider>
    </main>
  )
}

export default App;
