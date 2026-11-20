import React, { useState, useEffect } from "react";
import { TOPICS } from "./data/topics";
import SpinWheel from "./components/SpinWheel";
import TopicCard from "./components/TopicCard";
import Timer from "./components/Timer";
import GdStructure from "./components/GdStructure";
import TopicList from "./components/TopicList";
import "./App.css";

export default function App() {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [usedIndices, setUsedIndices] = useState(() => new Set());
  const [isSpinning, setIsSpinning] = useState(false);
  const [theme, setTheme] = useState("system"); // "system" | "light" | "dark"

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const handleTopicSelected = (index, markUsed = false) => {
    setSelectedTopicIndex(index);
    if (markUsed) {
      setUsedIndices((prev) => new Set([...prev, index]));
    }
  };

  const handleResetWheel = () => {
    if (isSpinning) return;
    setUsedIndices(new Set());
  };

  const cycleTheme = () => {
    if (theme === "system") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else setTheme("system");
  };

  const activeTopic =
    selectedTopicIndex !== null ? TOPICS[selectedTopicIndex] : null;

  return (
    <div className="app-container">
      <header>
        <div className="header-top">
          <p className="k">Week 13 · GD Final Practice</p>
          <button
            className="theme-toggle"
            onClick={cycleTheme}
            aria-label={`Toggle color theme (current: ${theme})`}
            title={`Theme: ${theme}. Click to change.`}
          >
            {theme === "system" && "🌓 System"}
            {theme === "light" && "☀️ Light"}
            {theme === "dark" && "🌙 Dark"}
          </button>
        </div>
        <h1>GD Spin Wheel</h1>
        <p>
          Spin, read the pointers, start the timer, discuss.
        </p>
      </header>

      <main>
        {/* Section 1: Spin wheel */}
        <SpinWheel
          topics={TOPICS}
          usedIndices={usedIndices}
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
          onTopicSelected={handleTopicSelected}
          onReset={handleResetWheel}
        />

        {/* Section 2: Selected topic & pointers */}
        <TopicCard topic={activeTopic} />

        {/* Section 3: Timer & guidelines */}
        <Timer />

        {/* Section 4: GD key structure & Do/Don't */}
        <GdStructure />

        {/* Section 5: All topics quick-list */}
        <TopicList
          topics={TOPICS}
          usedIndices={usedIndices}
          onSelectTopic={(index) => handleTopicSelected(index, false)}
        />
      </main>
    </div>
  );
}
