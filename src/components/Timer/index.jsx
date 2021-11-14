import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseAndPlayButton from '../PausePlaybutton';
import './timer.css';

export default function Timer() {

  return (
    <div className="timmer">
      <CircularProgressbar 

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
        <PauseAndPlayButton />
      </div>
    </div>
  )
}
