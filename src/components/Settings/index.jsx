import { useState } from 'react';
import ReactSlider from 'react-slider';
import Slider from '../Slider';
import './settings.css';

export default function Settings() {
  const [enableBtn, setEnableBtn] = useState(true);

  const handleClick = () => {
    setEnableBtn(!enableBtn);
  }

  return (
    <div className="settings">
      <div className="settings_slider">
        <label htmlFor="">Work minutes:</label>
        <ReactSlider
          disabled={!enableBtn}
          className={'settings_slider--slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          // value={45}
          // value={settingsInfo.workMinutes}
          // onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
          min={1}
          max={120}
        />
        <label htmlFor="">Break minutes:</label>
        <ReactSlider
          disabled={!enableBtn}
          className={'settings_slider--slider break'}
          thumbClassName={'thumb thumb-break'}
          trackClassName={'track'}
          // value={45}
          // value={settingsInfo.workMinutes}
          // onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
          min={1}
          max={120}
        />

        {/* <Slider 
          enable={enableBtn}           
        /> */}

        <button
          onClick={handleClick}
        >
          {
            enableBtn ? 'Enable' : 'Disable'
          }
        </button>
      </div>
    </div>
  )
}
