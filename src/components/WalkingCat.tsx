// Animated ASCII cat that walks across the screen at random intervals
// Pure CSS/React animation, no impact on game logic

import { useState, useEffect } from "react";

const WALKING_FRAMES = [
  `  /\\_/\\  
 ( -.o ) ~
  > ^ <  
 /| | |\\  `,
  `  /\\_/\\  
 ( o.- ) ~
  > ^ <  
  /| | |\\ `,
];

export function WalkingCat() {
  const [visible, setVisible] = useState(false);
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState(-200);
  const [vertical, setVertical] = useState(50);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Trigger a walk at random intervals
  useEffect(() => {
    function scheduleWalk() {
      const delay = 15000 + Math.random() * 20000;
      setTimeout(() => {
        const goRight = Math.random() > 0.5;
        setDirection(goRight ? "right" : "left");
        setPosition(goRight ? -200 : window.innerWidth + 200);
        setVertical(20 + Math.random() * 60);
        setVisible(true);
      }, delay);
    }
    scheduleWalk();
  }, [visible]);

  // Animate position
  useEffect(() => {
    if (!visible) return;
    const speed = direction === "right" ? 2 : -2;
    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev + speed;
        const offscreen =
          direction === "right" ? next > window.innerWidth + 200 : next < -200;
        if (offscreen) {
          clearInterval(interval);
          setVisible(false);
          return prev;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [visible, direction]);

  // Animate walking frames
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % WALKING_FRAMES.length);
    }, 300);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="walking-cat"
      style={{
        left: position,
        top: `${vertical}%`,
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      <pre>{WALKING_FRAMES[frame]}</pre>
    </div>
  );
}
