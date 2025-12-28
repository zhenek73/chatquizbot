import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';

interface QuizQuestionProps {
  question: Question;
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean | null;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  answers: Array<boolean | null>;
}

export const QuizQuestion = ({
  question,
  shuffledOptions,
  shuffledCorrectIndex,
  selectedAnswer,
  showResult,
  isCorrect,
  onSelectAnswer,
  onNext,
  questionNumber,
  totalQuestions,
  answers,
}: QuizQuestionProps) => {
  // Преобразуем answers в формат для ProgressBar
  const answerStatuses = answers.map((answer) => {
    if (answer === null) return null;
    return answer === true ? 'correct' : 'incorrect';
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col p-4 md:p-6 max-w-4xl mx-auto w-full relative z-10"
    >
      <Header />
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-300">
            Вопрос {questionNumber} из {totalQuestions}
          </span>
          <span className="text-sm text-pink-primary font-semibold">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <ProgressBar 
          currentQuestionIndex={questionNumber - 1} 
          answers={answerStatuses}
          showHorse={true}
        />
      </div>

      {/* Question description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="frosted-glass rounded-3xl p-6 md:p-8 mb-6"
      >
        <div className="whitespace-pre-line">
          {question.description.split('\n\n').map((part, index) => {
            if (index === 0) {
              // Основное описание
              return (
                <p key={index} className="text-white text-lg leading-relaxed mb-4">
                  {part}
                </p>
              );
            } else {
              // Характеристики
              return (
                <div key={index} className="text-gray-300 text-base leading-relaxed">
                  {part}
                </div>
              );
            }
          })}
        </div>
      </motion.div>

      {/* Answer options */}
      <div className="space-y-4 flex-1">
        <AnimatePresence>
          {shuffledOptions.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === shuffledCorrectIndex;
            const showCorrect = showResult && isCorrectAnswer;
            const showIncorrect = showResult && isSelected && !isCorrectAnswer;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => !showResult && onSelectAnswer(index)}
                disabled={showResult}
                className={`
                  w-full text-left p-4 md:p-6 rounded-xl
                  transition-all duration-300
                  font-medium text-lg
                  ${
                    showCorrect
                      ? 'bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/50'
                      : showIncorrect
                      ? 'bg-red-500/20 border-2 border-red-500'
                      : isSelected
                      ? 'bg-white/20 border-2 border-pink-500/50 shadow-lg shadow-pink-500/30'
                      : 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-pink-500/50'
                  }
                  ${showResult ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-white">{option}</span>
                  {showCorrect && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl"
                    >
                      ✅
                    </motion.span>
                  )}
                  {showIncorrect && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl"
                    >
                      ❌
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <div
              className={`
                rounded-xl p-6 text-center
                ${
                  isCorrect
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-red-500/20 border-2 border-red-500'
                }
              `}
            >
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isCorrect ? '🎉 Правильно! +1 очко' : '😔 Неправильно'}
              </motion.p>
              {isCorrect && (
                <p className="text-gray-300">
                  Правильный ответ: {shuffledOptions[shuffledCorrectIndex]}
                </p>
              )}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600 
                         text-white font-bold py-4 rounded-2xl 
                         shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/70
                         transition-all duration-300
                         text-lg"
            >
              {questionNumber < totalQuestions ? 'Далее →' : 'Посмотреть результаты 🏆'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
