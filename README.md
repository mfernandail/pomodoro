# Week Nº 21

## Step by step, line by line — becoming a Full Stack Developer in one year.

## Pomodoro Timer Application

A Pomodoro timer built with vanilla JavaScript, implementing the complete 25-minute work and 5/15-minute break cycle methodology.

### 📌 Features

- Complete Pomodoro Cycle Implementation, automated transitions between 25-minute work sessions, 5-minute short breaks, and 15-minute long breaks.
- Dynamic dot indicators showing current position in the 4-session cycle with real-time updates as sessions complete.
- Customizable work, short break, and long break durations with input validation.
- Start, pause, reset functionality with proper state management and prevention of multiple concurrent timers.
- Settings Panel. Collapsible configuration interface with input validation, error handling, and reset-to-defaults functionality.
- Input validation for all time inputs with specific error messages and focus management for better user experience.
- Contextual sound notifications for session transitions with toggle on/off functionality.
- Visual toggle button with icon feedback allowing users to enable/disable audio notifications.

### 🧠 Lessons Learned

- Implemented complex application state coordination across multiple variables (session type, counters, timers).
- setInterval Mastery, gained deep understanding of JavaScript timers, including proper cleanup with clearInterval, preventing memory leaks, and managing multiple timer states.
- Function Decomposition, applied single responsibility principle by breaking complex timer logic into focused functions (startSession, onSessionComplete, getDuration) improving code maintainability.
- Web Audio API Integration, successfully implemented HTML5 audio elements with error handling, browser compatibility considerations.