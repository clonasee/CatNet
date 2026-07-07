// Decorative floating paw print background animation
// Pure CSS animation, no impact on game logic

import { useMemo } from "react";

export function PawPrints() {
  const paws = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i / 12) * 100}%`,
        delay: `${i * 1.5}s`,
        duration: `${14 + (i % 4) * 3}s`,
        size: `${0.9 + (i % 3) * 0.4}rem`,
      })),
    [],
  );

  return (
    <div className="paw-container">
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="paw"
          style={{
            left: paw.left,
            animationDelay: paw.delay,
            animationDuration: paw.duration,
            fontSize: paw.size,
          }}
        >
          ^..^
        </div>
      ))}
    </div>
  );
}
