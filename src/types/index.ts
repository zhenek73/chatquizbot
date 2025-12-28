export interface Question {
  id: number;
  description: string;
  options: string[];
  correctIndex: number;
}

export interface StatSection {
  title: string;
  content: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answeredQuestions: number[];
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean | null;
  answers: Array<boolean | null>; // true = correct, false = incorrect, null = not answered
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          onClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
        };
        BackButton: {
          onClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
      };
    };
  }
}

