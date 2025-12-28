import { motion, AnimatePresence } from 'framer-motion';
import { horseFrames } from './HorseProgress';
import malinkaLogo from '../malinka-ball.svg';
import { useState, useEffect } from 'react';

interface TransitionAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export const TransitionAnimation = ({ show, onComplete }: TransitionAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!show) {
      setCurrentFrame(0);
      return;
    }

    let frameCount = 0;
    const totalFrames = horseFrames.length * 2; // 2 цикла

    const interval = setInterval(() => {
      frameCount++;
      setCurrentFrame(frameCount % horseFrames.length);
      
      if (frameCount >= totalFrames) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, 100); // Быстрая смена кадров

    return () => clearInterval(interval);
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div className="relative flex items-center justify-center">
            {/* Лошадка */}
            <motion.img
              key={currentFrame}
              src={horseFrames[currentFrame]}
              alt="Running horse"
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
            />
            
            {/* Малинка, которая исчезает */}
            <motion.img
              src={malinkaLogo}
              alt="Malinka"
              className="w-16 h-16 md:w-20 md:h-20 object-contain absolute"
              initial={{ opacity: 1, scale: 1, x: 50 }}
              animate={{
                opacity: [1, 0.5, 0],
                scale: [1, 0.8, 0],
                x: [50, 20, -20],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

