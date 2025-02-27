import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { Context } from "../../../App";

const dayOfWeekTranslation = {
    Monday: 'Poniedziałek',
    Tuesday: 'Wtorek',
    Wednesday: 'Środa',
    Thursday: 'Czwartek',
    Friday: 'Piątek',
    Saturday: 'Sobota',
    Sunday: 'Niedziela',
  };
const getTimeWithOffset = (offset) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // UTC in ms
    return new Date(utc + offset * 3600000);
  };
export default function TokyoClock() {
  const {colorMode} = useContext(Context);
    const [timePoland, setTimePoland] = useState(getTimeWithOffset(1));
    const [timeJapan, setTimeJapan] = useState(getTimeWithOffset(9));
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimePoland(getTimeWithOffset(1));
        setTimeJapan(getTimeWithOffset(9));
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className={`clock-container ${colorMode ? "clock-light" : "clock-dark"}`}>
        <div className="clock">
          <h3 style={{color:"black"}}>Czas w japonii:</h3>
          <p className="date">Jap: {timeJapan.toLocaleDateString('pl-PL')}</p>
          <p className="time">
            {dayOfWeekTranslation[timeJapan.toLocaleDateString('en-US', { weekday: 'long' })] || timeJapan.toLocaleDateString('en-US', { weekday: 'long' })}, {timeJapan.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
      </div>
    );
  };
  // Zegar dla polski
        {/* <div className="clock">
          <p className="date">Pol: {timePoland.toLocaleDateString('pl-PL')}</p>
          <p className="time">
            {dayOfWeekTranslation[timePoland.toLocaleDateString('en-US', { weekday: 'long' })] || timePoland.toLocaleDateString('en-US', { weekday: 'long' })}, {timePoland.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div> */}