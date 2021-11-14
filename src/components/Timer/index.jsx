import { useContext, useState } from 'react';
import { Context } from '../../context/SettingsContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import PauseAndPlayButton from '../PausePlaybutton';

import play from '../../images/icons/play.svg';
import pause from '../../images/icons/pause.svg';

import 'react-circular-progressbar/dist/styles.css';
import './timer.css';

export default function Timer() {
  const [paused, setPaused] = useState(false)
  
  const contextInfo = useContext(Context);

  const handlePausedClick = () => {
    setPaused(!paused)
  }


  return (
    <div className="timmer">
      <CircularProgressbar s
        value={60} 
        text={`${60}%`} 
        styles={buildStyles({
          textColor:'#fff',
          // pathColor: mode === 'work' ? '#f54e4e' : '#4aec8c',
          pathColor:'#4aec8c',
          tailColor:'rgba(255,255,255,.2)'
        })}      
      />

      <div>
        {/* <PauseAndPlayButton /> */}

        <button className="timmer_buttons">
          <img 
            src={paused ? play : pause} 
            alt={paused ? 'Play button' : 'Pause button'} 
            onClick={handlePausedClick}
          />
        </button>

      </div>
    </div>
  )
}
