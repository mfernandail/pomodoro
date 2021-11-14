import { useState } from 'react';
import play from '../../images/icons/play.svg';
import pause from '../../images/icons/pause.svg';
import './pausePlayButton.css';

export default function PauseAndPlayButton() {
  const [button, setButton] = useState(true);

  const handleClick = e => {
    setButton(!button)
  }

  return (
    <button className="playButton">
      <img 
        src={button ? play : pause} 
        alt={button ? 'Play button' : 'Pause button'} 
        onClick={handleClick}
      />
    </button>
  )
}
