import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizStart } from './components/QuizStart';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import { Snowflakes } from './components/Snowflakes';
import { questions } from './data/questions';
import { QuizState } from './types';
import { saveQuizState, loadQuizState, clearQuizState } from './utils/storage';
import { shuffleArray } from './utils/shuffle';

type AppState = 'start' | 'quiz' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('start');
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answeredQuestions: [],
    selectedAnswer: null,
    showResult: false,
    isCorrect: null,
    answers: Array(questions.length).fill(null) as Array<boolean | null>,
  });
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [shuffledCorrectIndex, setShuffledCorrectIndex] = useState<number>(0);

  // Function to shuffle options for a specific question index
  const shuffleQuestionOptions = (questionIndex: number) => {
    const question = questions[questionIndex];
    if (question) {
      const shuffled = shuffleArray(question.options);
      const originalCorrect = question.options[question.correctIndex];
      const newCorrectIndex = shuffled.findIndex(opt => opt === originalCorrect);
      setShuffledOptions(shuffled);
      setShuffledCorrectIndex(newCorrectIndex);
    }
  };

  // Load saved state on mount
  useEffect(() => {
    const saved = loadQuizState();
    if (saved && saved.currentQuestionIndex < questions.length) {
      // Ensure answers array has correct length
      const answers = saved.answers || Array(questions.length).fill(null);
      if (answers.length !== questions.length) {
        answers.length = questions.length;
        answers.fill(null, saved.currentQuestionIndex);
      }
      setQuizState({ ...saved, answers });
      setAppState('quiz');
      shuffleQuestionOptions(saved.currentQuestionIndex);
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (appState === 'quiz') {
      saveQuizState(quizState);
    }
  }, [quizState, appState]);

  const handleStart = () => {
    const newState: QuizState = {
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: [],
      selectedAnswer: null,
      showResult: false,
      isCorrect: null,
      answers: Array(questions.length).fill(null) as Array<boolean | null>,
    };
    setQuizState(newState);
    setAppState('quiz');
    shuffleQuestionOptions(0);
  };

  const handleSelectAnswer = (index: number) => {
    if (quizState.showResult) return;

    const isCorrect = index === shuffledCorrectIndex;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = isCorrect;

    setQuizState({
      ...quizState,
      selectedAnswer: index,
      showResult: true,
      isCorrect,
      score: newScore,
      answeredQuestions: [...quizState.answeredQuestions, quizState.currentQuestionIndex],
      answers: newAnswers,
    });
  };

  const handleNext = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      clearQuizState();
      setAppState('result');
    } else {
      setQuizState({
        ...quizState,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showResult: false,
        isCorrect: null,
      });
    }
  };

  // Shuffle options when question changes
  useEffect(() => {
    if (appState === 'quiz' && quizState.currentQuestionIndex < questions.length) {
      shuffleQuestionOptions(quizState.currentQuestionIndex);
    }
  }, [quizState.currentQuestionIndex, appState]);

  const handleRestart = () => {
    clearQuizState();
    setAppState('start');
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: [],
      selectedAnswer: null,
      showResult: false,
      isCorrect: null,
      answers: Array(questions.length).fill(null) as Array<boolean | null>,
    });
  };

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen relative">
      <Snowflakes />
      <AnimatePresence mode="wait">
        {appState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizStart onStart={handleStart} />
          </motion.div>
        )}

        {appState === 'quiz' && currentQuestion && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizQuestion
              question={currentQuestion}
              shuffledOptions={shuffledOptions}
              shuffledCorrectIndex={shuffledCorrectIndex}
              selectedAnswer={quizState.selectedAnswer}
              showResult={quizState.showResult}
              isCorrect={quizState.isCorrect}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNext}
              questionNumber={quizState.currentQuestionIndex + 1}
              totalQuestions={questions.length}
              answers={quizState.answers}
            />
          </motion.div>
        )}

        {appState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResult
              score={quizState.score}
              totalQuestions={questions.length}
              onRestart={handleRestart}
              answers={quizState.answers}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
