import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [time, setTime] = React.useState(1500);
  const [timingType, setTimingType] = React.useState("SESSION");
  const [play, setPlay] = React.useState(false);
  
  const timeout = setTimeout(() => {
    if(time && play){
      setTime(time - 1)
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
  const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTime(time + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTime(time - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTime(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!time && timingType === "SESSION"){
      setTime(breakLength * 60)
      setTimingType("BREAK")
      audio.play()
    }
    if(!time && timingType === "BREAK"){
      setTime(sessionLength * 60)
      setTimingType("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock()
  }, [play, time, timeout])
  
  const timeFormat = () => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
    (minutes < 10 ? "0" + minutes: minutes) + ":" +
    (seconds < 10 ? "0" + seconds: seconds)
    )
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";  
  
return (
<div id="container">
  <div className="clock">
  <h2 className="title">Pomodoro Clock</h2>
  <div id="break-session-length">
  <div>
    <h3 id="break-label">Break</h3>
    <div>  
    <button id="break-increment" disabled={play} onClick={handleBreakIncrease}>+</button>
      <p id="break-length">{breakLength}</p>
      <button id="break-decrement" disabled={play} onClick={handleBreakDecrease}>-</button>
    </div>
    </div>
    <div>
      <h3 id="session-label">Session</h3>
      <div>
        <button id="session-increment" disabled={play} onClick={handleSessionIncrease}>+</button>
        <p id="session-length">{sessionLength}</p>
        <button id="session-decrement" disabled={play} onClick={handleSessionDecrease}>-</button>
  </div>
  </div>
 </div>
    <div className="time-wrapper">
      <div className="timer">
           <h2 id="timer-label">{title}</h2>
           <h3 id="time-left">{timeFormat()}</h3>
        </div>
        <button id="start_stop" onClick={handlePlay}>Start/Stop</button>
        <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  </div>
  <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
  </div>)
}

ReactDOM.render(<App/>,document.getElementById('app'));
