export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizState {
  topic: string;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  isLoading: boolean;
  isFinished: boolean;
  error: string | null;
}

export enum PricingTier {
  BASIC = 'basic',
  PRO = 'pro'
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => any;
  }
}