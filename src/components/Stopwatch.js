import React, { useState, useRef } from 'react';
import  '../App.css'
function Stopwatch() {
  const style={fontSize:"153px",textAlign:"center",marginTop:"15%"}
  const [isRunning, setIsRunning] = useState(false);
  const [gstartTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStopped,setIsstopped] = useState(false)
  const timerstyle={textAlign:"center"}
  const intervalRef = useRef(null);
  let elapsed
  // const isStopped = false;
  const handleStart = () => {
    if (!isRunning) {
      if(!isStopped){
      setElapsedTime(0);
      }
      setIsRunning(true);
      const startTime = new Date(); 
      intervalRef.current = setInterval(() => {
        const currentTime = new Date();
        if(!isStopped){
         elapsed = currentTime - startTime;
        }
        else{
          elapsed = elapsedTime + (currentTime - startTime)
        }
        console.log(elapsed)
        setElapsedTime(elapsed);
      }, 1000);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsstopped(true)
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setIsstopped(false)
  };

  const formatTime = (time) => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 1000 / 60) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / 1000 / 60 / 60) % 24)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div style={style}>{formatTime(elapsedTime)}</div>
      {!isRunning && (
        <div style={timerstyle}>
        <button className='Button' onClick={handleStart}>{!isStopped? "Start":"Resume"}</button>
        </div>
      )}
      {isRunning && (
        <div style={timerstyle}>
          <button className='Button' onClick={handleStop}>Stop</button>
          <button className='Button' onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
