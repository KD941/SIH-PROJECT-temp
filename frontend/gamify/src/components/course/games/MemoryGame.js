import React, { useState, useEffect } from 'react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameCompleted, setGameCompleted] = useState(false);

  const symbols = ['🚀', '⭐', '🌟', '💫', '🌙', '☀️', '🌈', '⚡'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameCompleted(true);
    }
  }, [timeLeft, gameCompleted]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].symbol === cards[second].symbol) {
        setMatchedCards(prev => [...prev, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameCompleted(true);
    }
  }, [matchedCards.length, cards.length]);

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .map((symbol, index) => ({ id: index, symbol }))
      .sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimeLeft(120);
    setGameCompleted(false);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards(prev => [...prev, index]);
    }
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
          <h2 className="text-2xl font-bold text-white mb-2">Memory Game Complete!</h2>
          <p className="text-slate-400 mb-4">Excellent memory skills!</p>
        </div>

        <div className="bg-dark-800 border border-slate-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-neon-green">{moves}</div>
              <div className="text-sm text-slate-400">Moves</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-blue">{formatTime(120 - timeLeft)}</div>
              <div className="text-sm text-slate-400">Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-yellow">{Math.round((16 / moves) * 100)}%</div>
              <div className="text-sm text-slate-400">Efficiency</div>
            </div>
          </div>
        </div>

        <button
          onClick={initializeGame}
          className="btn bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold shadow-glow"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Game Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-dark-800 border border-slate-700 px-4 py-2 rounded-lg">
            <div className="text-sm text-slate-400">Moves</div>
            <div className="text-xl font-bold text-neon-green">{moves}</div>
          </div>
          <div className="bg-dark-800 border border-slate-700 px-4 py-2 rounded-lg">
            <div className="text-sm text-slate-400">Time</div>
            <div className="text-xl font-bold text-neon-blue">{formatTime(timeLeft)}</div>
          </div>
        </div>
        <button
          onClick={initializeGame}
          className="btn btn-outline"
        >
          Restart
        </button>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(index);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-3xl ${
                isMatched
                  ? 'bg-neon-green/20 border-neon-green shadow-glow'
                  : isFlipped
                  ? 'bg-neon-blue/20 border-neon-blue shadow-glow'
                  : 'bg-dark-800 border-slate-600 hover:border-slate-500'
              }`}
            >
              {isFlipped || isMatched ? card.symbol : '?'}
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="bg-dark-800 border border-slate-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">How to Play:</h3>
        <p className="text-slate-400 text-sm">
          Click on cards to flip them and find matching pairs. Try to complete the game in as few moves as possible!
        </p>
      </div>
    </div>
  );
};

export default MemoryGame;


