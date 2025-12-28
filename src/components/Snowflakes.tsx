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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: 1 }}>
      {snowflakes.map((index) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2; // Уменьшено с 5 до 2 секунд
        const duration = 8 + Math.random() * 8; // Уменьшено с 10-20 до 8-16 секунд
        const size = 0.5 + Math.random() * 0.5;
        const startY = -100 - Math.random() * 50; // Начальная позиция выше экрана

        return (
          <div
            key={index}
            className="snowflake"
            style={{
              left: `${left}%`,
              top: `${startY}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              animationName: 'snowfall',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
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

