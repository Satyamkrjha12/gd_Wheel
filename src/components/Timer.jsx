import React, { useState, useEffect, useRef } from "react";

const PRESETS = [5, 10, 15];

export default function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const endTimeRef = useRef(0);

  // Play audio beep when timer finishes
  const playBeep = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        try {
          osc.stop();
        } catch (e) {}
      }, 800);
    } catch (e) {
      console.warn("Audio playback not supported or blocked", e);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const handleStartPause = () => {
    if (isRunning) {
      stopTimer();
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
    } catch (e) {}

    let currentRemaining = remainingSeconds;
    if (currentRemaining <= 0) {
      currentRemaining = totalSeconds;
      setRemainingSeconds(totalSeconds);
    }

    endTimeRef.current = Date.now() + currentRemaining * 1000;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const diff = Math.max(
        0,
        Math.round((endTimeRef.current - Date.now()) / 1000)
      );
      setRemainingSeconds(diff);

      if (diff <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        playBeep();
      }
    }, 250);
  };

  const handleReset = () => {
    stopTimer();
    setRemainingSeconds(totalSeconds);
  };

  const handlePresetSelect = (mins) => {
    stopTimer();
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timeFormatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const fractionCompleted = (totalSeconds - remainingSeconds) / totalSeconds;
  const isWarning = remainingSeconds <= 60 && remainingSeconds > 0;

  let phaseText = "Opening · state your stand";
  if (remainingSeconds <= 0) {
    phaseText = "Time up · wrap up and summarise";
  } else if (fractionCompleted < 0.15) {
    phaseText = "Opening · state your stand";
  } else if (fractionCompleted < 0.8) {
    phaseText = "Body · point + fact + example";
  } else {
    phaseText = "Close · summarise the group’s views";
  }

  let buttonText = "Start";
  if (isRunning) {
    buttonText = "Pause";
  } else if (remainingSeconds < totalSeconds && remainingSeconds > 0) {
    buttonText = "Resume";
  }

  return (
    <section className="cd">
      <h2>3. Timer</h2>
      <div id="tm" className={isWarning ? "w" : ""}>
        {timeFormatted}
      </div>
      <div className="bar">
        <div
          id="bf"
          style={{ width: `${Math.min(100, Math.max(0, fractionCompleted * 100))}%` }}
        />
      </div>
      <div id="ph">{phaseText}</div>

      <div className="row">
        {PRESETS.map((m) => {
          const isActive = totalSeconds === m * 60;
          return (
            <button
              key={m}
              className={isActive ? "on" : ""}
              onClick={() => handlePresetSelect(m)}
            >
              {m} min
            </button>
          );
        })}
      </div>

      <div className="row">
        <button className="p" id="go" onClick={handleStartPause}>
          {buttonText}
        </button>
        <button id="rt" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  );
}
