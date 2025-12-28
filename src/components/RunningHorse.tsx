import { useState, useEffect } from 'react';
import horse1 from '../horse/1.png';
import horse2 from '../horse/2.png';
import horse3 from '../horse/3.png';
import horse4 from '../horse/4.png';
import horse5 from '../horse/5.png';
import horse6 from '../horse/6.png';
import horse7 from '../horse/7.png';
import horse8 from '../horse/8.png';

const horseFrames = [horse1, horse2, horse3, horse4, horse5, horse6, horse7, horse8];

interface RunningHorseProps {
  size?: 'small' | 'large';
  customSize?: number; // Кастомный размер в пикселях
}

export const RunningHorse = ({ size = 'small', customSize }: RunningHorseProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % horseFrames.length);
    }, 100); // Меняем кадр каждые 100ms (8 кадров = 0.8 сек полный цикл)

    return () => clearInterval(interval);
  }, []);

  let sizeClasses: string;
  if (customSize) {
    sizeClasses = `w-${customSize / 4} h-${customSize / 4}`;
    // Используем inline стиль для точного размера
    return (
      <img
        src={horseFrames[currentFrame]}
        alt="Running horse"
        style={{ width: `${customSize}px`, height: `${customSize}px` }}
        className="object-contain"
      />
    );
  } else {
    sizeClasses = size === 'small' 
      ? 'w-16 h-16 md:w-20 md:h-20' 
      : 'w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52';
  }

  return (
    <img
      src={horseFrames[currentFrame]}
      alt="Running horse"
      className={`${sizeClasses} object-contain`}
    />
  );
};
