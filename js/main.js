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
const $btnSettingresetDefault = document.getElementById('resetDefault')

const $error = document.getElementById('error')
const $errorMsg = document.getElementById('error_msg')

$btnSettings.addEventListener('click', showSetting)
$btnSettingClose.addEventListener('click', showSetting)
$btnStart.addEventListener('click', startTimer)
$btnPause.addEventListener('click', pauseTimer)
$btnReset.addEventListener('click', resetTimer)
$btnSettingSave.addEventListener('click', saveSettings)
$btnSettingresetDefault.addEventListener('click', resetDefault)

let currentMinutes = 25
let currentSeconds = 0
let intervalId = null
let isRunning = false

let currentLong = 15
let currentShort = 5

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
  $btnSettings.disabled = true

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
    }
  }, 1000)
}

function pauseTimer() {
  $btnStart.disabled = false
  $btnSettings.disabled = false
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
  $btnSettings.disabled = false
  $btnPause.disabled = true
  intervalId = null
}

function renderDisplay(minutes, seconds) {
  $display.textContent = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
}

function saveSettings() {
  const validateWork = validateInput($inputWork, 1, 60, 'Work')

  const validateShort = validateInput($inputShort, 1, 60, 'Short')
  const validateLong = validateInput($inputLong, 1, 60, 'Long')

  if (!validateWork || !validateLong || !validateShort) return

  $errorMsg.textContent = ''

  $error.classList.remove('show')
  $settings.classList.remove('show')

  const minutes = Number($inputWork.value)

  console.log(minutes)
  renderDisplay(minutes, 0)
}

function validateInput(input, min, max, fieldName) {
  const value = Number(input.value)

  if (isNaN(value)) {
    $error.classList.add('show')
    input.focus()
    input.value = ''
    $errorMsg.textContent = `${fieldName} have to be a number`
    return false
  }

  if (value < min || value > max) {
    $error.classList.add('show')
    input.focus()
    input.value = ''
    $errorMsg.textContent = `${fieldName} have to be min ${min} and max ${max}`
    return false
  }

  return true
}

function resetDefault() {
  const confirmReset = confirm(
    'Do you like reset the configuration (Work: 25; Short: 5; Long: 15)'
  )

  if (confirmReset) {
    const DEFAULT_WORK = 25
    const DEFAULT_SHORT = 5
    const DEFAULT_LONG = 15

    $inputWork.value = DEFAULT_WORK
    $inputShort.value = DEFAULT_SHORT
    $inputLong.value = DEFAULT_LONG

    currentMinutes = DEFAULT_WORK
    currentSeconds = 0
    renderDisplay(currentMinutes, currentSeconds)
  }
}