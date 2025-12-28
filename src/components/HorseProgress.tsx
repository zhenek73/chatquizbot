import { motion } from 'framer-motion';
import malinkaLogo from '../malinka-ball.svg';
import horse1 from '../horse/1.png';
import horse2 from '../horse/2.png';
import horse3 from '../horse/3.png';
import horse4 from '../horse/4.png';
import horse5 from '../horse/5.png';
import horse6 from '../horse/6.png';
import horse7 from '../horse/7.png';
import horse8 from '../horse/8.png';

export const horseFrames = [horse1, horse2, horse3, horse4, horse5, horse6, horse7, horse8];

interface HorseProgressProps {
  totalQuestions: number;
  answers: Array<boolean | null>; // true = correct, false = incorrect, null = not answered
  currentQuestionIndex?: number;
}

export const HorseProgress = ({ totalQuestions, answers, currentQuestionIndex }: HorseProgressProps) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const answer = answers[index];
        const isCurrent = currentQuestionIndex !== undefined && index === currentQuestionIndex;
        
        if (answer === true) {
          // Правильный ответ - показываем лошадку (каждый правильный ответ = свой кадр по порядку)
          const correctCount = answers.slice(0, index + 1).filter(a => a === true).length;
          const horseFrameIndex = (correctCount - 1) % 8;
          
          return (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.05, type: "spring" }}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
            >
              <img
                src={horseFrames[horseFrameIndex]}
                alt={`Horse frame ${horseFrameIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          );
        } else if (answer === false) {
          // Неправильный ответ - крутящаяся малинка
          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
            >
              <img
                src={malinkaLogo}
                alt="Malinka"
                className="w-full h-full object-contain animate-spin"
              />
            </motion.div>
          );
        } else {
          // Неотвеченный вопрос - серый placeholder
          return (
            <div
              key={index}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center ${
                isCurrent ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className="w-8 h-8 rounded-full border-2 border-gray-500 bg-gray-500/20" />
            </div>
          );
        }
      })}
    </div>
  );
};

