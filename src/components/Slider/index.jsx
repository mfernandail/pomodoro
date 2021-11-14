import ReactSlider from 'react-slider';

export default function Slider({enable}) {
  return (
    <>
      <label htmlFor="">Work minutes:</label>
      <ReactSlider
        disabled={!enable}
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        // value={45}
        // value={settingsInfo.workMinutes}
        // onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
    </>
  )
}
