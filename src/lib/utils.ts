import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SCORING_CONFIG = {
  'big-five': {
    scales: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
    maxScorePerQuestion: 5,
  },
  'disc': {
    scales: ['Dominance', 'Influence', 'Steadiness', 'Compliance'],
    maxScorePerQuestion: 5,
  }
};

export function formatInterpretation(scale: string, value: number) {
  if (value > 80) return 'Высокий уровень. Ярко выраженная черта.';
  if (value > 40) return 'Средний уровень. Сбалансированное проявление.';
  return 'Низкий уровень. Черта выражена слабо.';
}
