import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/SettingsContext';
import ReactSlider from 'react-slider';
import './settings.css';

export default function Settings() {
  const [enableBtn, setEnableBtn] = useState(true);

  const contextInfo = useContext(Context);

  const handleClick = () => {
    setEnableBtn(!enableBtn);
    contextInfo.setCounterStart(!contextInfo.counterStart);

    // contextInfo.setBreakMinutes(1);
    // contextInfo.setWorkMinutes(1);
  }

  return (
    <div className="settings">
      <div className="settings_slider">
        <label htmlFor="">Work {contextInfo.workMinutes}:00</label>
        <ReactSlider
          disabled = {!enableBtn}
          className = {!enableBtn ?'settings_slider--slider ' :'settings_slider--slider'}
          thumbClassName = {!enableBtn ?'settings_slider--thumb thumb-disabled' :'settings_slider--thumb'}
          trackClassName = {'track'}
          value = {contextInfo.workMinutes}
          onChange = {newValue => contextInfo.setWorkMinutes(newValue)}
          max = {180}
        />

        <label htmlFor="">Break {contextInfo.breakMinutes}:00</label>
        <ReactSlider
          disabled = {!enableBtn}
          className = {!enableBtn ?'settings_slider--slider break-disabled' :'settings_slider--slider break'}
          thumbClassName = {!enableBtn ?'settings_slider--thumb thumb-break-disabled' :'settings_slider--thumb thumb-break'}
          trackClassName = {'track'}
          value = {contextInfo.breakMinutes}
          onChange = {newValue => contextInfo.setBreakMinutes(newValue)}
          min = {1}
          max = {180}
        />

        <button
          onClick={handleClick}
          className="settings_slider--btn"
        >
          {
            enableBtn ? 'Ok' : 'Modify'
          }
        </button>
      </div>
    </div>
  )
}
