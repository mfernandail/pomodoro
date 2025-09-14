const $display = document.getElementById('display')

const $btnStart = document.getElementById('start')
const $btnPause = document.getElementById('pause')
const $btnReset = document.getElementById('reset')
const $btnSettings = document.getElementById('settings-btn')

const $completed = document.getElementById('completed')
const $totalTime = document.getElementById('total-time')

const $settings = document.getElementById('settings')

const $btnWork = document.getElementById('work')
const $btnShort = document.getElementById('short')
const $btnLong = document.getElementById('long')
const $btnSettingClose = document.getElementById('close')
const $btnSettingSave = document.getElementById('save')

$btnSettings.addEventListener('click', showSetting)
$btnSettingClose.addEventListener('click', showSetting)
$btnStart.addEventListener('click', startTimer)
$btnPause.addEventListener('click', pauseTimer)

let currentMinutes = 2
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

  let idInterval = setInterval(() => {
    if (currentSeconds > 0) {
      currentSeconds--
    } else {
      currentSeconds = 59
      currentMinutes--
    }

    $display.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(
      currentSeconds
    ).padStart(2, '0')}`

    if (currentMinutes === 0 && currentSeconds === 0) {
      clearInterval(idInterval)
      console.log('stop timer')
    }
  }, 1000)

  console.log({ idInterval })
}

function pauseTimer() {
  $btnStart.disabled = false
  $btnPause.disabled = true
}

function resetControls() {
  $btnStart.disabled = false
  $btnPause.disabled = true
}