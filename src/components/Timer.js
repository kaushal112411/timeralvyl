import React from 'react'
import  '../App.css'
import { useState,useEffect } from 'react'
export const Timer = () => {
    const [start, setStart] = useState(false);
    const [reset, setReset] = useState(false);
    const [stop, setStop] = useState(false);
    const [hours, setHours] = useState(0);
    const [stopped,setStopped] = useState(false)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
   const style={fontSize:"153px",textAlign:"center",marginTop:"15%"}
   const timerstyle={textAlign:"center"}
   const buttonstyle={margin:"1%",padding:"10px",width:"5%"}
   const  startTimer =()=>{
    setStart(true)
    setStop(true)
    setStopped(false)
   }
   const stopTimer =()=>{
    setStart(false)
    setStop(false)
    setReset(false)
    setStopped(true)
   }
   const resetTimer=()=>{
     setStart(false)
     setStop(false)
     setReset(true)
     setStopped(false)
   }

   const getTime = () => {
    const time = Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
  
  let interval
  if(start){
     interval = setInterval(() =>{
           
            setSeconds(seconds+1)
            if(seconds == 59){
              setMinutes(minutes+1)
              setSeconds(0)
            }
            if(minutes == 59){
                setHours(hours+1)
                setMinutes(0)
            }
            if(hours == 24){
                resetTimer()
            }
        }
            , 
        1000)
  }
  else{
    if(reset){
       setHours(0)
       setMinutes(0)
       setSeconds(0)
    }
  }
     return () => clearInterval(interval);
  }, [seconds,start,reset]);
  return (
    <div>
        <div>
         <div style={style} >
         {hours<10?"0"+ hours:hours}:{minutes<10?"0"+ minutes:minutes}:{seconds<10?"0" + seconds:seconds}
         </div>
        </div>
      {/* <div style={style}>
       <span><p>{hours<10?"0"+ hours:hours}:</p></span> 
       <span>{minutes<10?"0"+ minutes:minutes}:</span>
       <span>{seconds<10?"0" + seconds:seconds}</span>
      </div> */}
       <div style={timerstyle}>
      <button className={"Button"}  disabled={start} onClick={startTimer}>{stopped?"RESUME":"START"}</button>
      <button className={"Button"}  onClick={resetTimer}>RESET</button>
      <button className={"Button"}  disabled={!stop} onClick={stopTimer}>STOP</button>
      </div>
    </div>
  )
}
