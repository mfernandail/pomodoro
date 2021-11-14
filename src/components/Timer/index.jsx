import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/SettingsContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import play from '../../images/icons/play.svg';
import pause from '../../images/icons/pause.svg';
import 'react-circular-progressbar/dist/styles.css';
import './timer.css';

export default function Timer() {
  const contextInfo = useContext(Context);

  const [paused, setPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState('work'); //work - null - break
  const [colorChange, setColorChange] = useState('#f54e4e')

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(paused);
  const modeRef = useRef(mode);
  
  const handlePausedClick = () => { 
    if(!contextInfo.counterStart){
      setPaused(!paused);    
      paused ? isPausedRef.current = false : isPausedRef.current = true;
    }
    // setPaused(!paused);    
    // paused ? isPausedRef.current = false : isPausedRef.current = true;
  }

  const tick = () => {
    secondsLeftRef.current--; 
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    const switchMode = () => {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? contextInfo.workMinutes : contextInfo.breakMinutes) * 60;
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

      console.log(modeRef.current)
      modeRef.current === 'work' ? setColorChange('#f54e4e') : setColorChange('#4aec8c');
    }

    secondsLeftRef.current = contextInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const timerInterval = setInterval(() => {
      if(isPausedRef.current) {
        return;
      }
      if(secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
      
    }, 100);

    return () => clearInterval(timerInterval);

  }, [contextInfo]);

  
  const totalSeconds = mode === 'work'
    ? contextInfo.workMinutes * 60
    : contextInfo.breakMinutes * 60;

  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if(seconds < 10) seconds = '0'+seconds;

  return (
    <div className="timmer">

      <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
          textColor:'#fff',
          pathColor: colorChange,
          tailColor:'rgba(255,255,255,.2)',
        })} 
      />

      <div>
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
