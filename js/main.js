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
const $typeSession = document.getElementById('type-session')

const $audioStartBreak = document.getElementById('audio-startBreak')
const $audioStartSession = document.getElementById('audio-startSession')

const $dots = document.querySelectorAll('.dot')

const $soundBtn = document.getElementById('icon_sound')

$btnSettings.addEventListener('click', showSetting)
$btnSettingClose.addEventListener('click', showSetting)
$btnStart.addEventListener('click', startTimer)
$btnPause.addEventListener('click', pauseTimer)
$btnReset.addEventListener('click', resetTimer)
$btnSettingSave.addEventListener('click', saveSettings)
$btnSettingresetDefault.addEventListener('click', resetDefault)
$soundBtn.addEventListener('click', soundFn)

$audioStartBreak.addEventListener('error', errorSound)
$audioStartSession.addEventListener('error', errorSound)

let currentMinutes = 25
let currentSeconds = 0
let intervalId = null
let isRunning = false

let currentLong = 15
let currentShort = 5

let counterHours = 0
let counterSeconds = 0

let typeSession = 'work'
let sessionCounter = 1
let totalSessionComplete = 0

let sound = true

resetControls()

function showSetting() {
  if ($settings.classList.contains('show')) {
    $settings.classList.remove('show')
  } else {
    $settings.classList.add('show')
  }
}

function startTimer() {
  $typeSession.textContent = 'Work'
  $btnStart.disabled = true
  $btnPause.disabled = false
  $btnSettings.disabled = true

  if (sound) playSounds($audioStartSession)
  //if (sound) $audioStartSession.play()

  currentMinutes = Number($inputWork.value)
  currentShort = Number($inputShort.value)
  currentLong = Number($inputLong.value)

  if (intervalId) return

  startSession()
}

function startSession() {
  const duration = getDuration(typeSession)

  currentMinutes = duration
  currentSeconds = 0

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
      //if (typeSession !== 'long') onSessionComplete()
      onSessionComplete()
    }
  }, 1000)
}

function getDuration(sessionType) {
  switch (sessionType) {
    case 'work':
      return Number($inputWork.value)
    case 'short':
      return Number($inputShort.value)
    case 'long':
      return Number($inputLong.value)
  }
}

function onSessionComplete() {
  if (typeSession === 'work' && sessionCounter < 4) {
    sessionCounter++
    typeSession = 'short'

    const workDuration = Number($inputWork.value)
    addToTotalTime(workDuration)

    //if (sound) $audioStartBreak.play()
    if (sound) playSounds($audioStartBreak)

    startSession()
  } else if (typeSession === 'work' && sessionCounter === 4) {
    typeSession = 'long'
    const workDuration = Number($inputWork.value)
    addToTotalTime(workDuration)
    sessionCounter = 1

    //if (sound) $audioStartBreak.play()
    if (sound) playSounds($audioStartBreak)

    startSession()
  } else if (typeSession === 'short') {
    typeSession = 'work'
    refreshDotsCounter()

    //if (sound) $audioStartSession.play()
    if (sound) playSounds($audioStartSession)

    startSession()
  } else if (typeSession === 'long') {
    typeSession = 'work'
    refreshDotsCounter()
    startSession()
    totalSessionComplete++

    if (sound) playSounds($audioStartSession)

    renderCounter()
  }

  $typeSession.textContent = typeSession
}

function refreshDotsCounter() {
  if (sessionCounter === 1) {
    $dots[3].classList.remove('active')
    $dots[0].classList.add('active')
  } else if (sessionCounter === 2) {
    $dots[0].classList.remove('active')
    $dots[1].classList.add('active')
  } else if (sessionCounter === 3) {
    $dots[1].classList.remove('active')
    $dots[2].classList.add('active')
  } else if (sessionCounter === 4) {
    $dots[2].classList.remove('active')
    $dots[3].classList.add('active')
  }
}

/*
function startSession(type, time) {
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
  }, 10)
}
*/

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
  resetTotal()

  if ($inputWork) {
    currentMinutes = Number($inputWork.value)

    currentSeconds = 0
    totalSessionComplete = 0
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

function renderCounter() {
  $completed.textContent = totalSessionComplete
}

function addToTotalTime(minutes) {
  counterSeconds += minutes

  while (counterSeconds >= 60) {
    counterHours++
    counterSeconds -= 60
  }

  renderTotalTime()
}

function renderTotalTime() {
  $totalTime.textContent =
    counterHours < 1
      ? `0h ${counterSeconds}m`
      : `${counterHours}h ${counterSeconds}m`
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

function resetTotal() {
  $totalTime.textContent = '0h 0m'
  $completed.textContent = 0

  counterSeconds = 0
  counterHours = 0
}

function soundFn() {
  sound = !sound

  if (sound) {
    $soundBtn.src = './assets/icons/soundOn.png'
  } else {
    $soundBtn.src = './assets/icons/soundOff.png'
  }
}

async function playSounds(audioElement) {
  if (!audioElement) return

  try {
    await audioElement.play()
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      $errorMsg.textContent =
        'Audio blocked by browser - user interaction required'
    } else {
      $errorMsg.textContent('Audio error:', error)
    }
    setTimeout(() => {
      $error.classList.remove('show')
    }, 3000)
  }
}

function errorSound() {
  $errorMsg.textContent = 'Audio file failed to load'
  $error.classList.add('show')
  setTimeout(() => {
    $error.classList.remove('show')
  }, 3000)
}