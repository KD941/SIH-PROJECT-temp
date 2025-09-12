import React, { useState, useEffect } from 'react';

const FillInTheBlanks = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameCompleted, setGameCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "JavaScript is a _____ programming language that makes web pages interactive.",
      answer: "dynamic",
      options: ["static", "dynamic", "compiled", "binary"]
    },
    {
      id: 2,
      text: "Variables in JavaScript are declared using _____ or _____ keywords.",
      answer: "let, const",
      options: ["let, const", "var, let", "int, string", "public, private"]
    },
    {
      id: 3,
      text: "A _____ is a block of code that performs a specific task.",
      answer: "function",
      options: ["variable", "function", "array", "object"]
    },
    {
      id: 4,
      text: "Arrays in JavaScript are _____ indexed, starting from 0.",
      answer: "zero",
      options: ["zero", "one", "negative", "random"]
    },
    {
      id: 5,
      text: "The _____ operator is used to check if two values are equal in JavaScript.",
      answer: "===",
      options: ["==", "===", "!=", "!=="]
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, gameCompleted]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        correct++;
      }
    });
    setScore(correct);
    setGameCompleted(true);
  };

  const handleSubmit = () => {
    calculateScore();
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setScore(0);
    setTimeLeft(60);
    setGameCompleted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center shadow-glow">
            <svg className="w-10 h-10 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Game Complete!</h2>
          <p className="text-slate-400 mb-4">Great job on the Fill in the Blanks challenge!</p>
        </div>

        <div className="bg-dark-800 border border-slate-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-neon-green">{score}</div>
              <div className="text-sm text-slate-400">Correct</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-blue">{questions.length}</div>
              <div className="text-sm text-slate-400">Total</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-yellow">{Math.round((score / questions.length) * 100)}%</div>
              <div className="text-sm text-slate-400">Score</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-dark-800 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-slate-300 mb-2">{q.text}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Your answer:</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      userAnswers[q.id] === q.answer
                        ? 'bg-neon-green/20 text-neon-green'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {userAnswers[q.id] || 'No answer'}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  {userAnswers[q.id] === q.answer ? (
                    <svg className="w-6 h-6 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="mt-6 btn bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold shadow-glow"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div>
      {/* Timer */}
      <div className="bg-gradient-to-r from-neon-blue to-purple-500 text-white text-2xl font-bold text-center py-3 rounded-lg mb-6 shadow-glow">
        <span>{formatTime(timeLeft)}</span>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-dark-800 border border-slate-700 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Fill in the blank:
        </h3>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          {currentQ.text.split('_____').map((part, index) => (
            <span key={index}>
              {part}
              {index < currentQ.text.split('_____').length - 1 && (
                <span className="inline-block mx-2">
                  <select
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    className="bg-dark-700 border border-slate-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-neon-green"
                  >
                    <option value="">Select answer</option>
                    {currentQ.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                  </select>
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn btn-outline disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-sm font-bold ${
                index === currentQuestion
                  ? 'bg-neon-blue text-white'
                  : userAnswers[questions[index].id]
                  ? 'bg-neon-green text-dark-900'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={currentQuestion === questions.length - 1 ? handleSubmit : handleNext}
          className="btn bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold shadow-glow"
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlanks;


