import { useEffect, useState } from "react";

interface ConfettiProps {
  count?: number;
  duration?: number;
}

const Confetti = ({ count = 50, duration = 3000 }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; color: string; left: string; duration: number }>>([]);

  useEffect(() => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      duration: 1000 + Math.random() * 2000,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [count, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti absolute top-0"
          style={{
            left: particle.left,
            backgroundColor: particle.color,
            animation: `fall ${particle.duration}ms linear forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;