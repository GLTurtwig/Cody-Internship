import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const Countdown = ({ timeID }) => {
    const [timeLeft, setTimeLeft] = useState(timeID - Date.now());
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeID - Date.now());
        }, 1000);
    
    return () => clearInterval(interval);
    }, [timeID]);
  return (
    <div className="de_countdown">{hours}h {minutes}m {seconds}s</div>
  );
};

export default Countdown;
