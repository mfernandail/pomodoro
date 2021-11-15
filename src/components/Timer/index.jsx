import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/SettingsContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Settings from '../Settings';
import play from '../../assets/images/icons/play.svg';
import pause from '../../assets/images/icons/pause.svg';
import alertBell from '../../assets/sound/bell.mp3';
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

  const audioRef = useRef();
  
  const handlePausedClick = () => { 
    if(!contextInfo.counterStart){
      setPaused(!paused);    
      paused ? isPausedRef.current = false : isPausedRef.current = true;     
    }
  }

  const tick = () => {
    secondsLeftRef.current--; 
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    const switchMode = () => {
      const audio = audioRef.current;
      audio.play();

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
      
    }, 1000);

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
    <div className="container">
      <h1 className="container-title">Pomodoro</h1>
      
      <Settings paused={paused} />

      <audio ref={audioRef} src={alertBell}></audio>

      <div className="timer">
        <div>
          <button className="timmer_buttons">
            <img 
              className={!contextInfo.counterStart ? 'timmer_buttons--paused' : 'timmer_buttons--start'}
              src={paused ? play : pause} 
              alt={paused ? 'Play button' : 'Pause button'} 
              onClick={handlePausedClick}
            />
          </button>
        </div>

        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
            textColor:'#fff',
            pathColor: colorChange,
            tailColor:'rgba(255,255,255,.2)',
          })} 
        />

      </div>

    </div>
  )
}
