import React, { useRef, useEffect, useCallback } from "react";
import { WEDGE_COLORS } from "../data/topics";

export default function SpinWheel({
  topics,
  usedIndices,
  isSpinning,
  setIsSpinning,
  onTopicSelected,
  onReset,
}) {
  const canvasRef = useRef(null);
  const angRef = useRef(0);
  const animFrameRef = useRef(null);

  const N = topics.length;
  const S = (2 * Math.PI) / N;

  const draw = useCallback(() => {
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
      ctx.fillText(topics[i].s, 395, 0);
      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fillStyle = "#0F1B2D";
    ctx.fill();

    ctx.restore();
  }, [N, S, topics, usedIndices]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;

    const availableIndices = topics
      .map((_, i) => i)
      .filter((i) => !usedIndices.has(i));

    if (availableIndices.length === 0) return;

    const chosenIdx =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];

    // Pointer is at 12 o'clock (-Math.PI / 2)
    const base =
      -Math.PI / 2 - (chosenIdx + 0.5 + (Math.random() - 0.5) * 0.6) * S;
    const currentAng = angRef.current;
    const end =
      base + 2 * Math.PI * Math.ceil((currentAng - base) / (2 * Math.PI) + 5);
    const startAng = currentAng;
    const startTime = performance.now();
    const duration = 4500;

    setIsSpinning(true);

    const animate = (currentTime) => {
      const progress = Math.min(1, (currentTime - startTime) / duration);
      // Cubic ease-out: 1 - (1 - k)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      angRef.current = startAng + (end - startAng) * ease;
      draw();

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        onTopicSelected(chosenIdx, true);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const remainingTopics = N - usedIndices.size;

  return (
    <section className="cd">
      <h2>1. Spin for a topic</h2>
      <div className="wh">
        <div className="pt" aria-hidden="true"></div>
        <canvas
          ref={canvasRef}
          id="w"
          width="880"
          height="880"
          aria-label={`Spin wheel with ${N} GD topics`}
        />
      </div>
      <div className="row">
        <button
          className="p"
          id="sp"
          onClick={handleSpin}
          disabled={isSpinning || remainingTopics === 0}
        >
          {isSpinning ? "Spinning..." : "Spin the wheel"}
        </button>
        <button id="rs" onClick={onReset} disabled={isSpinning}>
          Reset wheel
        </button>
      </div>
      <p className="row">
        <small id="uc">
          {remainingTopics > 0
            ? `${remainingTopics} topic${remainingTopics > 1 ? "s" : ""} left`
            : "All topics used. Reset the wheel."}
        </small>
      </p>
    </section>
  );
}
