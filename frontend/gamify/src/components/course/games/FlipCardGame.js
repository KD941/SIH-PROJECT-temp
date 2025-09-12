import React, { useEffect, useMemo, useRef, useState } from 'react';

const TOTAL_TIME = 150; // seconds
const FLIP_UNLOCK_DELAY = 60; // seconds

const FlipCardGame = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [canFlip, setCanFlip] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef();

  const formatted = useMemo(() => {
    const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const s = String(timeLeft % 60).padStart(2, '0');
    return `${m}:${s}`;
  }, [timeLeft]);

  useEffect(() => {
    setStatus(`You can flip the card in ${FLIP_UNLOCK_DELAY} seconds.`);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1;
        const elapsed = TOTAL_TIME - next;
        if (elapsed >= FLIP_UNLOCK_DELAY && !canFlip) {
          setCanFlip(true);
          setStatus('You can now flip the card!');
        } else if (!canFlip) {
          const secondsToWait = FLIP_UNLOCK_DELAY - elapsed;
          setStatus(`You can flip the card in ${Math.max(0, secondsToWait)} seconds.`);
        }
        if (next <= 0) {
          clearInterval(timerRef.current);
          handleSubmit('Time\'s up! Submitting your current answer.');
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = () => {
    if (submitted) return;
    if (!canFlip) {
      setStatus('You cannot flip the card yet!');
      return;
    }
    if (!isFlipped) {
      setIsFlipped(true);
      setStatus('Review the answer and submit your response.');
    }
  };

  const handleSubmit = async (message = 'Your answer has been submitted for grading!') => {
    if (submitted) return;
    clearInterval(timerRef.current);
    setSubmitted(true);
    setStatus('Submitting...');
    try {
      await new Promise((r) => setTimeout(r, 400));
      setStatus(`✅ ${message}`);
      setIsFlipped(true);
    } catch (e) {
      setStatus('⚠️ Submission failed. Please try again.');
    }
  };

  return (
    <div>
      {/* Timer */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-3xl font-bold text-center py-3 rounded-lg mb-6 shadow-glow">
        <span>{formatted}</span>
      </div>

      {/* 3D Flip Card */}
      <div className="scene h-64 mb-6" style={{ perspective: 1000 }}>
        <div
          onClick={handleCardClick}
          className={`card relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          } ${canFlip && !submitted ? 'cursor-pointer' : 'cursor-not-allowed'} `}
        >
          {/* Back - question (shown initially) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-dark-800 text-slate-200 border border-slate-700 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            <h3 className="text-sm text-slate-400 mb-2">Question</h3>
            <p className="text-2xl font-bold text-center">In biology, what is the 'powerhouse' of the cell?</p>
          </div>
          {/* Front - answer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-indigo-600 text-white border border-indigo-400 shadow-glow [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            <h3 className="text-sm text-indigo-200 mb-2">Correct Answer</h3>
            <p className="text-3xl font-extrabold text-center">Mitochondria</p>
          </div>
        </div>
      </div>

      {/* Answer input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">Your Answer</label>
        <textarea
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-3 rounded-lg bg-dark-800 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your answer here..."
          disabled={submitted}
        />
      </div>

      {/* Status + Submit */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-slate-400 h-6">{status}</p>
        <button
          onClick={() => handleSubmit()}
          disabled={submitted}
          className="w-full max-w-sm btn btn-primary disabled:opacity-50"
        >
          Submit for Grading
        </button>
      </div>
    </div>
  );
};

export default FlipCardGame;




