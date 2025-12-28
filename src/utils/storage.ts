import { QuizState } from '../types';

const STORAGE_KEY = 'quiz_state';

export const saveQuizState = (state: QuizState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
};

export const loadQuizState = (): QuizState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load quiz state:', error);
  }
  return null;
};

export const clearQuizState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz state:', error);
  }
};

