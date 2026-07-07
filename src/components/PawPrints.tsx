// Decorative floating paw print background animation
// Pure CSS animation, no impact on game logic

export function PawPrints() {
  const paws = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${12 + Math.random() * 10}s`,
    size: `${0.8 + Math.random() * 1.2}rem`,
  }));

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
          🐾
        </div>
      ))}
    </div>
  );
}
