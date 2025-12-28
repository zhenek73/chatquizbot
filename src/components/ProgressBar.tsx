import clsx from 'clsx';
import malinka from '../malinka-ball.svg';
import { RunningHorse } from './RunningHorse';

type AnswerStatus = 'correct' | 'incorrect' | null;

interface ProgressBarProps {
  currentQuestionIndex: number; // от 0 до 10 (текущий вопрос, на котором пользователь)
  answers: AnswerStatus[]; // массив статусов ответов для каждого вопроса
  size?: 'normal' | 'large'; // размер кружков
  showHorse?: boolean; // показывать ли лошадку на текущем вопросе (для результатов = false)
}

export const ProgressBar = ({ 
  currentQuestionIndex, 
  answers, 
  size = 'normal',
  showHorse = true 
}: ProgressBarProps) => {
  const totalQuestions = 11;
  const circleSize = size === 'large' ? 'w-14 h-14' : 'w-12 h-12';
  const malinkaSize = size === 'large' ? 'w-14 h-14' : 'w-12 h-12';
  const horseSize = size === 'large' ? 'w-24 h-24' : 'w-20 h-20';

  return (
    <div className="flex justify-center gap-3 my-8">
      {Array.from({ length: totalQuestions }, (_, i) => {
        const answerStatus = answers[i] || null;
        const isCurrent = i === currentQuestionIndex && showHorse;
        const isCorrect = answerStatus === 'correct';

        // Текущий вопрос - показываем большую бегущую лошадку
        if (isCurrent) {
          return (
            <div
              key={i}
              className={`${horseSize} flex items-center justify-center`}
            >
              <RunningHorse customSize={size === 'large' ? 96 : 80} />
            </div>
          );
        }

        // Правильный ответ - показываем малинку вместо кружка
        if (isCorrect) {
          return (
            <div
              key={i}
              className={`${malinkaSize} flex items-center justify-center`}
            >
              <img
                src={malinka}
                alt="Malinka"
                className={`${malinkaSize} object-contain`}
              />
            </div>
          );
        }

        // Не отвечен или неправильно - серый пустой кружок с номером
        return (
          <div
            key={i}
            className={clsx(
              `${circleSize} rounded-full border-4 border-gray-600 bg-transparent transition-all duration-300 flex items-center justify-center text-white font-bold text-lg`
            )}
          >
            <span>{i + 1}</span>
          </div>
        );
      })}
    </div>
  );
};
