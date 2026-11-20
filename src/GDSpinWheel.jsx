import React, { useState, useEffect, useRef, useCallback } from "react";

// --- TOPICS DATA ---
export const TOPICS = [
  {
    s: "AI vs Engineers",
    c: "Technology & AI",
    t: "Will AI replace software engineers?",
    p: [
      "AI already speeds up routine coding and testing, so repetitive roles may shrink",
      "Engineers are still needed for design, review, domain knowledge and accountability",
      "Angle: new roles in AI tooling and review are growing, so upskilling matters",
      "Close: AI changes the job; people who learn it stay ahead",
    ],
  },
  {
    s: "WFH vs Office",
    c: "Workplace",
    t: "Work from home vs work from office",
    p: [
      "WFH saves commute time and cost and allows focused work",
      "Office helps mentoring for freshers and faster team bonding",
      "Angle: measure output, not hours; hybrid is a common middle path",
      "Close: choose by the type of task, not by habit",
    ],
  },
  {
    s: "Social Media",
    c: "Social",
    t: "Social media: boon or bane for students?",
    p: [
      "Free reach for learning, networking and personal branding",
      "Distraction, comparison stress and misinformation",
      "Angle: recruiters check LinkedIn, so your digital footprint matters",
      "Close: a boon with time limits and fact-checking",
    ],
  },
  {
    s: "Data Privacy",
    c: "Technology & AI",
    t: "Data privacy and cyber fraud in digital India",
    p: [
      "Apps and UPI made services fast, but personal data is collected widely",
      "Phishing and fraud hit first-time digital users hardest",
      "Angle: India has a data protection law (DPDP Act, 2023); awareness is the weak link",
      "Close: convenience needs consent, security and digital literacy",
    ],
  },
  {
    s: "Make in India",
    c: "Economy",
    t: "Make in India: has it worked?",
    p: [
      "Incentives such as PLI schemes pull in manufacturing and jobs",
      "Import dependence on key components and skill gaps remain",
      "Angle: electronics and mobile assembly are often cited as visible gains",
      "Close: success rests on supply chains and skills, not slogans",
    ],
  },
  {
    s: "UPI Divide",
    c: "Economy",
    t: "UPI and cashless India: success story or digital divide?",
    p: [
      "Fast, cheap and used even by small vendors",
      "Low connectivity, language barriers and fraud risk exclude many",
      "Angle: UPI is often cited globally as a model for instant payments",
      "Close: inclusion matters as much as adoption",
    ],
  },
  {
    s: "Startups",
    c: "Economy",
    t: "Are startups the future of job creation in India?",
    p: [
      "They create jobs and innovation beyond big companies",
      "High failure rates and funding slowdowns lead to layoffs",
      "Angle: startups often give freshers wider responsibility sooner",
      "Close: great for risk-takers, not a full replacement for stable employers",
    ],
  },
  {
    s: "Gig Economy",
    c: "Economy",
    t: "Gig economy: freedom or insecurity?",
    p: [
      "Flexible income and easy entry for many workers",
      "No fixed benefits, insurance or job security",
      "Angle: social security for platform workers is a live policy debate",
      "Close: flexibility works only with a safety net",
    ],
  },
  {
    s: "Brain Drain",
    c: "Social",
    t: "Brain drain: loss or gain for India?",
    p: [
      "Trained engineers and doctors leave, and the country loses talent",
      "Remittances, global networks and returning talent bring benefits",
      "Angle: think “brain circulation” rather than a one-way exit",
      "Close: make opportunities at home attractive enough to stay",
    ],
  },
  {
    s: "Women at Work",
    c: "Social",
    t: "Women in the workforce: what holds progress back?",
    p: [
      "Diverse teams make better decisions and strengthen the economy",
      "Safety, mobility, bias and career breaks hold many back",
      "Angle: flexible work and childcare support improve retention",
      "Close: equal opportunity is both fair and productive",
    ],
  },
  {
    s: "Degree vs Skills",
    c: "Education",
    t: "Is a degree still necessary for a successful career?",
    p: [
      "A degree gives fundamentals, credibility and campus hiring access",
      "Skills and projects decide performance on the job",
      "Angle: many companies now test skills directly in assessments",
      "Close: the degree opens the door; skills keep you in the room",
    ],
  },
  {
    s: "EVs in India",
    c: "Environment",
    t: "Electric vehicles: India’s next big shift?",
    p: [
      "Lower tailpipe emissions and lower running cost",
      "Charging network, battery cost and the power grid mix are challenges",
      "Angle: two-wheelers and public buses are practical first movers",
      "Close: EVs work best with clean power and charging access",
    ],
  },
  {
    s: "Failure",
    c: "Abstract",
    t: "Is failure the stepping stone to success?",
    p: [
      "Failure teaches fast and builds resilience",
      "Repeated failure without reflection just wastes time",
      "Angle: pick one real example and say what was learned",
      "Close: failure helps only when you analyse it",
    ],
  },
  {
    s: "Layoff vs Pay Cut",
    c: "Case discussion",
    t: "Your company must cut costs: layoffs or pay cuts?",
    p: [
      "Layoffs protect the company’s survival quickly",
      "Pay cuts keep the team and morale intact",
      "Angle: consider a hiring freeze, reskilling and honest communication",
      "Close: choose the option that protects both people and the business",
    ],
  },
  {
    s: "Monitoring",
    c: "Workplace ethics",
    t: "Should companies monitor employees’ work devices?",
    p: [
      "It protects data and prevents misuse of company systems",
      "It hurts trust, privacy and creativity",
      "Angle: a clear policy and consent make monitoring more acceptable",
      "Close: monitor security and outcomes, not every keystroke",
    ],
  },
  {
    s: "Placement Metric",
    c: "Education",
    t: "Are placements the right measure of a college’s success?",
    p: [
      "Placements show job outcomes and industry links",
      "They ignore learning quality, research, higher studies and startups",
      "Angle: look at the share placed and the median pay, not only the top package",
      "Close: use placements as one metric, not the whole picture",
    ],
  },
];

const POINTER_LABELS = ["One side", "Other side", "Angle", "Balanced close"];
const WEDGE_COLORS = [
  "#0F766E",
  "#B45309",
  "#1D4ED8",
  "#BE185D",
  "#6D28D9",
  "#15803D",
  "#C2410C",
  "#0E7490",
];
const PRESETS = [5, 10, 15];

export default function GDSpinWheel() {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [usedIndices, setUsedIndices] = useState(() => new Set());
  const [isSpinning, setIsSpinning] = useState(false);
  const [theme, setTheme] = useState("system"); // 'system' | 'light' | 'dark'

  // Timer states
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const canvasRef = useRef(null);
  const angRef = useRef(0);
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const endTimeRef = useRef(0);
  const audioCtxRef = useRef(null);

  const N = TOPICS.length;
  const S = (2 * Math.PI) / N;

  // Handle color theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Canvas drawing
  const drawWheel = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 880, 880);
    ctx.save();
    ctx.translate(440, 440);

    for (let i = 0; i < N; i++) {
      const a = angRef.current + i * S;
      const isUsed = usedIndices.has(i);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 420, a, a + S);
      ctx.closePath();

      ctx.globalAlpha = isUsed ? 0.4 : 1;
      ctx.fillStyle = isUsed ? "#6B7280" : WEDGE_COLORS[i % WEDGE_COLORS.length];
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.rotate(a + S / 2);
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 30px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(TOPICS[i].s, 395, 0);
      ctx.restore();
    }

    // Hub
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fillStyle = "#0F1B2D";
    ctx.fill();

    ctx.restore();
  }, [N, S, usedIndices]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Spin handling
  const handleSpin = () => {
    if (isSpinning) return;

    const available = TOPICS.map((_, i) => i).filter((i) => !usedIndices.has(i));
    if (available.length === 0) return;

    const chosen = available[Math.floor(Math.random() * available.length)];
    const base = -Math.PI / 2 - (chosen + 0.5 + (Math.random() - 0.5) * 0.6) * S;
    const currentAng = angRef.current;
    const end =
      base + 2 * Math.PI * Math.ceil((currentAng - base) / (2 * Math.PI) + 5);
    const startAng = currentAng;
    const startTime = performance.now();
    const duration = 4500;

    setIsSpinning(true);

    const step = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      angRef.current = startAng + (end - startAng) * ease;
      drawWheel();

      if (p < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsSpinning(false);
        setSelectedTopicIndex(chosen);
        setUsedIndices((prev) => new Set([...prev, chosen]));
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleResetWheel = () => {
    if (isSpinning) return;
    setUsedIndices(new Set());
  };

  // Timer Beep
  const playBeep = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

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
      console.warn("Audio Context error:", e);
    }
  };

  // Timer controls
  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsTimerRunning(false);
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      stopTimer();
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioClass();
      }
    } catch (e) {}

    let cur = remainingSeconds;
    if (cur <= 0) {
      cur = totalSeconds;
      setRemainingSeconds(totalSeconds);
    }

    endTimeRef.current = Date.now() + cur * 1000;
    setIsTimerRunning(true);

    timerIntervalRef.current = setInterval(() => {
      const diff = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setRemainingSeconds(diff);

      if (diff <= 0) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setIsTimerRunning(false);
        playBeep();
      }
    }, 250);
  };

  const resetTimer = () => {
    stopTimer();
    setRemainingSeconds(totalSeconds);
  };

  const selectPreset = (mins) => {
    stopTimer();
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Timer calculations
  const remainingCount = N - usedIndices.size;
  const activeTopic = selectedTopicIndex !== null ? TOPICS[selectedTopicIndex] : null;
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timerStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const fraction = (totalSeconds - remainingSeconds) / totalSeconds;
  const isWarning = remainingSeconds <= 60 && remainingSeconds > 0;

  let phase = "Opening · state your stand";
  if (remainingSeconds <= 0) {
    phase = "Time up · wrap up and summarise";
  } else if (fraction < 0.15) {
    phase = "Opening · state your stand";
  } else if (fraction < 0.8) {
    phase = "Body · point + fact + example";
  } else {
    phase = "Close · summarise the group’s views";
  }

  let timerBtnLabel = "Start";
  if (isTimerRunning) timerBtnLabel = "Pause";
  else if (remainingSeconds < totalSeconds && remainingSeconds > 0)
    timerBtnLabel = "Resume";

  return (
    <div className="app-container">
      <header>
        <div className="header-top">
          <p className="k">Week 13 · GD Final Practice</p>
          <button
            className="theme-toggle"
            onClick={() =>
              setTheme((prev) =>
                prev === "system" ? "dark" : prev === "dark" ? "light" : "system"
              )
            }
          >
            {theme === "system" && "🌓 System"}
            {theme === "light" && "☀️ Light"}
            {theme === "dark" && "🌙 Dark"}
          </button>
        </div>
        <h1>GD Spin Wheel</h1>
        <p>
          Spin, read the pointers, start the timer, discuss. Bolna hai, bhaukna
          nahi.
        </p>
      </header>

      <main>
        {/* Section 1: Spin */}
        <section className="cd">
          <h2>1. Spin for a topic</h2>
          <div className="wh">
            <div className="pt" aria-hidden="true"></div>
            <canvas
              ref={canvasRef}
              id="w"
              width="880"
              height="880"
              aria-label="Spin wheel with 16 GD topics"
            />
          </div>
          <div className="row">
            <button
              className="p"
              id="sp"
              onClick={handleSpin}
              disabled={isSpinning || remainingCount === 0}
            >
              {isSpinning ? "Spinning..." : "Spin the wheel"}
            </button>
            <button id="rs" onClick={handleResetWheel} disabled={isSpinning}>
              Reset wheel
            </button>
          </div>
          <p className="row">
            <small id="uc">
              {remainingCount > 0
                ? `${remainingCount} topic${remainingCount > 1 ? "s" : ""} left`
                : "All topics used. Reset the wheel."}
            </small>
          </p>
        </section>

        {/* Section 2: Selected topic */}
        <section className="cd">
          <h2>2. Your topic</h2>
          <div id="tp">
            {activeTopic ? (
              <>
                <span className="ch">{activeTopic.c}</span>
                <p id="tt">{activeTopic.t}</p>
                {activeTopic.p.map((point, k) => (
                  <p className="pn" key={k}>
                    <b>{POINTER_LABELS[k]}</b>
                    {point}
                  </p>
                ))}
              </>
            ) : (
              <>
                <span className="ch">Waiting</span>
                <p id="tt">
                  Spin the wheel or pick a topic from the list below.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section 3: Timer */}
        <section className="cd">
          <h2>3. Timer</h2>
          <div id="tm" className={isWarning ? "w" : ""}>
            {timerStr}
          </div>
          <div className="bar">
            <div
              id="bf"
              style={{
                width: `${Math.min(100, Math.max(0, fraction * 100))}%`,
              }}
            />
          </div>
          <div id="ph">{phase}</div>
          <div className="row">
            {PRESETS.map((m) => (
              <button
                key={m}
                className={totalSeconds === m * 60 ? "on" : ""}
                onClick={() => selectPreset(m)}
              >
                {m} min
              </button>
            ))}
          </div>
          <div className="row">
            <button className="p" id="go" onClick={toggleTimer}>
              {timerBtnLabel}
            </button>
            <button id="rt" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </section>

        {/* Section 4: GD structure */}
        <section className="cd wide">
          <h2>GD key structure</h2>
          <div className="st">
            <div>
              <h3>Opening · first 30 sec</h3>
              <p>Define the topic, give context, state your stand.</p>
            </div>
            <div>
              <h3>Body · main discussion</h3>
              <p>
                Point + fact + example. Then pass the ball to another speaker.
              </p>
            </div>
            <div>
              <h3>Close · last minutes</h3>
              <p>Summarise the group’s views. Do not just repeat yours.</p>
            </div>
            <div>
              <h3>SPEAK</h3>
              <p>
                Start with a stand · Point with proof · Everyone included · Add,
                don’t repeat · Keep it crisp and calm.
              </p>
            </div>
          </div>
          <div className="dd">
            <div className="ok">
              <h3>Do</h3>
              <ul>
                <li>Enter early with a clear stand</li>
                <li>Use one fact or example per point</li>
                <li>Invite the quiet member in</li>
                <li>Disagree with the idea, politely</li>
                <li>Offer to summarise at the end</li>
              </ul>
            </div>
            <div className="no">
              <h3>Don’t</h3>
              <ul>
                <li>Interrupt or raise your voice</li>
                <li>Stay silent for the whole GD</li>
                <li>Drift away from the topic</li>
                <li>Memorise and recite a monologue</li>
                <li>Make personal remarks</li>
              </ul>
            </div>
          </div>
          <p>
            <small>
              Class tip: one group discusses (fishbowl) while the rest score
              them on content, communication, listening, leadership and
              composure.
            </small>
          </p>
        </section>

        {/* Section 5: All topics list */}
        <section className="cd wide">
          <h2>All topics</h2>
          <div className="tl" id="tl">
            {TOPICS.map((topic, i) => (
              <button
                key={i}
                className={usedIndices.has(i) ? "u" : ""}
                onClick={() => setSelectedTopicIndex(i)}
                title={topic.t}
              >
                {topic.s}
              </button>
            ))}
          </div>
          <p>
            <small>
              Topics are compiled from commonly reported campus GD themes for
              2025–26 (technology, economy, workplace, social issues, case and
              abstract). Companies do not publish official topic lists, so
              treat these as likely, not guaranteed.
            </small>
          </p>
        </section>
      </main>
    </div>
  );
}
