import { useEffect, useState } from 'react';

export const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Create 50 snowflakes
    const count = 50;
    const flakes = Array.from({ length: count }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((index) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 10;
        const size = 0.5 + Math.random() * 0.5;

        return (
          <div
            key={index}
            className="snowflake"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              fontSize: `${size}em`,
            }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
};

