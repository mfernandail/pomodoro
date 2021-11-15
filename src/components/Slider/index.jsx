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
        min={1}
        max={120}
      />
    </>
  )
}
