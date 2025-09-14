const $display = document.getElementById('display')

const $btnStart = document.getElementById('start')
const $btnPause = document.getElementById('pause')
const $btnReset = document.getElementById('reset')
const $btnSettings = document.getElementById('settings-btn')

const $completed = document.getElementById('completed')
const $totalTime = document.getElementById('total-time')

const $settings = document.getElementById('settings')

const $inputWork = document.getElementById('work')
const $inputShort = document.getElementById('short')
const $inputLong = document.getElementById('long')
const $btnSettingClose = document.getElementById('close')
const $btnSettingSave = document.getElementById('save')
const $error = document.getElementById('error')

$btnSettings.addEventListener('click', showSetting)
$btnSettingClose.addEventListener('click', showSetting)
$btnStart.addEventListener('click', startTimer)
$btnPause.addEventListener('click', pauseTimer)
$btnReset.addEventListener('click', resetTimer)
$btnSettingSave.addEventListener('click', saveSettings)

let currentMinutes = 25
let currentSeconds = 0
let intervalId = null
let isRunning = false

resetControls()

function showSetting() {
  if ($settings.classList.contains('show')) {
    $settings.classList.remove('show')
  } else {
    $settings.classList.add('show')
  }
}

function startTimer() {
  $btnStart.disabled = true
  $btnPause.disabled = false

  currentMinutes = Number($inputWork.value)
  console.log(typeof currentMinutes)

  if (intervalId) return

  intervalId = setInterval(() => {
    if (currentSeconds > 0) {
      currentSeconds--
    } else {
      currentSeconds = 59
      currentMinutes--
    }

    renderDisplay(currentMinutes, currentSeconds)

    if (currentMinutes === 0 && currentSeconds === 0) {
      clearInterval(intervalId)
      console.log('stop timer')
    }
  }, 1000)
}

function pauseTimer() {
  $btnStart.disabled = false
  $btnPause.disabled = true
  clearInterval(intervalId)
  intervalId = null
}

function resetTimer() {
  clearInterval(intervalId)
  resetControls()
  if ($inputWork) {
    currentMinutes = Number($inputWork.value)
    currentSeconds = 0
    renderDisplay(currentMinutes, currentSeconds)
  }
}

function resetControls() {
  $btnStart.disabled = false
  $btnPause.disabled = true
  intervalId = null
}

function renderDisplay(minutes, seconds) {
  $display.textContent = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
}

function saveSettings() {
  if (!isNaN($inputWork)) {
    $error.textContent = 'Debe ser un numero'
    return
  }
  if (Number($inputWork.value) > 60) {
    $error.textContent = 'debe ser menor a 60 minutos'
    return
  }
  $error.textContent = ''
  $settings.classList.remove('show')

  const minutes = Number($inputWork.value)

  console.log(minutes)
  renderDisplay(minutes, 0)
}