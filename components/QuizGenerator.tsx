import React, { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/geminiService';
import { Question } from '../types';
import { Loader2, RefreshCw, CheckCircle, XCircle, Timer, BookOpen } from 'lucide-react';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer Effect
  useEffect(() => {
    if (loading || quizFinished || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setQuizFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, quizFinished, questions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setQuizFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers({});
    setQuestions([]);

    try {
      const qs = await generateQuizQuestions(topic, difficulty);
      setQuestions(qs);
      setTimeLeft(qs.length * 60); // 1 minute per question
    } catch (err) {
      alert("Failed to generate quiz. Please check your API Key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    // Record the answer
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: option
    }));

    // Update score if correct
    if (option === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Delay slightly before moving to next question to give visual feedback? 
    // For this UX, we wait for manual 'Next' or auto-advance could be added.
    // Let's implement immediate feedback but require a click to proceed.
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600 animate-pulse">Consulting the AI Professor about "{topic}" ({difficulty})...</p>
      </div>
    );
  }

  if (questions.length === 0 && !quizFinished) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">What do you want to learn?</h2>
          <p className="text-slate-600 mt-2">Enter any topic and select your difficulty level.</p>
        </div>
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2">
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-4 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g., Python, History)..." 
            className="flex-1 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Start Quiz
          </button>
        </form>
      </div>
    );
  }

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
             {percentage >= 70 ? <CheckCircle className="h-12 w-12 text-green-500" /> : <BookOpen className="h-12 w-12 text-blue-500" />}
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
          <p className="text-slate-600 text-lg">You scored <span className="font-bold text-blue-600">{score}</span> out of {questions.length}</p>
          
          <button 
            onClick={() => setQuestions([])}
            className="mt-6 inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            New Topic
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Detailed Review</h3>
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={q.id} className={`p-6 rounded-xl border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex gap-3 mb-3">
                  <span className="font-bold text-slate-500">Q{index + 1}.</span>
                  <h4 className="font-semibold text-slate-900">{q.text}</h4>
                </div>
                
                <div className="ml-8 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-500 w-24">Your Answer:</span>
                    <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {userAnswer || 'Skipped'}
                    </span>
                    {isCorrect ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                  </div>
                  {!isCorrect && (
                     <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-500 w-24">Correct Answer:</span>
                      <span className="font-medium text-green-700">{q.correctAnswer}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 ml-8 p-3 bg-white/60 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold">Explanation: </span> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasAnsweredCurrent = userAnswers[currentIndex] !== undefined;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Quiz Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Topic</span>
           <span className="font-semibold text-slate-800">{topic} <span className="text-slate-400 font-normal">({difficulty})</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Progress</span>
            <span className="font-semibold text-blue-600">{currentIndex + 1} / {questions.length}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono font-medium ${timeLeft < 30 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
            <Timer className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-6 mt-2">{currentQ.text}</h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = userAnswers[currentIndex] === option;
            const isCorrect = option === currentQ.correctAnswer;
            
            // Determine styling based on whether the user has answered
            let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
            
            if (!hasAnsweredCurrent) {
               btnClass += "border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
            } else {
               // Reveal phase
               if (isSelected && isCorrect) {
                 btnClass += "border-green-500 bg-green-50 text-green-900 font-medium";
               } else if (isSelected && !isCorrect) {
                 btnClass += "border-red-500 bg-red-50 text-red-900";
               } else if (!isSelected && isCorrect) {
                 btnClass += "border-green-500 bg-green-50 text-green-900"; // Show correct answer
               } else {
                 btnClass += "border-slate-100 text-slate-400 opacity-60";
               }
            }

            return (
              <button 
                key={idx}
                disabled={hasAnsweredCurrent}
                onClick={() => handleOptionSelect(option)}
                className={btnClass}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {hasAnsweredCurrent && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {hasAnsweredCurrent && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {hasAnsweredCurrent && (
        <div className="animate-fade-in-up">
          <button 
            onClick={nextQuestion}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            {currentIndex === questions.length - 1 ? "Finish & Review" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;