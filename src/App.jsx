import { useState } from 'react';
import { Context } from './context/SettingsContext';
import './App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <Context.Provider value={{}} >
        <h1>Pomodoro</h1>
      </Context.Provider>
    </main>
  )
}

export default App;
