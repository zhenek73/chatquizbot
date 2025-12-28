import { motion } from 'framer-motion';
import { StatSection } from './StatSection';
import { statistics } from '../data/statistics';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';
import malinkaLogo from '../malinka-ball.svg';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  answers: Array<boolean | null>;
}

const getUnlockedSectionsCount = (score: number): number => {
  if (score >= 11) return 6;
  if (score >= 9) return 5;
  if (score >= 7) return 4;
  if (score >= 5) return 3;
  if (score >= 3) return 2;
  if (score >= 0) return 1;
  return 0;
};

const getRequiredScoreForSection = (sectionIndex: number): number => {
  if (sectionIndex === 0) return 0;
  if (sectionIndex === 1) return 3;
  if (sectionIndex === 2) return 5;
  if (sectionIndex === 3) return 7;
  if (sectionIndex === 4) return 9;
  if (sectionIndex === 5) return 11;
  return 0;
};

export const QuizResult = ({ score, totalQuestions, onRestart, answers }: QuizResultProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const unlockedCount = getUnlockedSectionsCount(score);

  // Преобразуем answers в формат для ProgressBar
  const answerStatuses = answers.map((answer) => {
    if (answer === null) return null;
    return answer === true ? 'correct' : 'incorrect';
  });


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-6 max-w-5xl mx-auto w-full relative z-10"
    >
      <Header />

      {/* Score section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          🏆 Результаты викторины
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="frosted-glass rounded-3xl p-8 mb-6 inline-block"
        >
          <div className="text-6xl md:text-7xl font-bold text-pink-primary mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl text-gray-200 mb-6">
            Правильных ответов ({percentage}%)
          </div>
          
          {/* Progress bar */}
          <ProgressBar 
            currentQuestionIndex={totalQuestions - 1} 
            answers={answerStatuses}
            size="large"
            showHorse={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-pink-primary mb-8 font-semibold"
        >
          Открыто разделов статистики: {unlockedCount} из {statistics.length}
        </motion.p>
      </motion.div>

      {/* Statistics sections */}
      <div className="space-y-6 mb-8">
        {statistics.map((section, index) => {
          const requiredScore = getRequiredScoreForSection(index);
          const isLocked = score < requiredScore;

          return (
            <StatSection
              key={index}
              section={section}
              index={index}
              isLocked={isLocked}
              requiredScore={requiredScore}
            />
          );
        })}
      </div>

      {/* New Year message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mb-8"
      >
        <div className="frosted-glass rounded-3xl p-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <img src={malinkaLogo} alt="Malinka" className="w-12 h-12" />
            <img src={malinkaLogo} alt="Malinka" className="w-12 h-12" />
            <img src={malinkaLogo} alt="Malinka" className="w-12 h-12" />
          </motion.div>
          <p className="text-2xl md:text-3xl font-bold text-white">
            С Новым 2026 годом от PayCash! 🎄
          </p>
        </div>
      </motion.div>

      {/* Restart button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-gradient-to-r from-pink-600 to-purple-600 
                     text-white font-bold py-4 px-12 rounded-2xl 
                     shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/70
                     transition-all duration-300
                     text-lg md:text-xl"
        >
          Пройти заново 🔄
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
