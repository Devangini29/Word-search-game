import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Timer from './components/Timer';
import Score from './components/Score';

const App = () => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchGrid();
  }, []);

  const fetchGrid = async () => {
    const response = await fetch('http://localhost:5000/grid');
    const data = await response.json();
    setGrid(data.grid);
    setWords(data.words);
  };

  const handleSelectLetter = (row, col) => {
    if (gameOver) return;
    const newSelection = [...selectedLetters, { row, col }];
    setSelectedLetters(newSelection);
  };

  const handleSubmitWord = async () => {
    const word = selectedLetters
      .map(({ row, col }) => grid[row][col])
      .join('')
      .toLowerCase();
    const response = await fetch('http://localhost:5000/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word }),
    });
    const data = await response.json();

    if (data.valid && !foundWords.includes(word) && words.includes(word)) {
      setScore(score + word.length * 10);
      setFoundWords([...foundWords, word]);
    }
    setSelectedLetters([]);
  };

  const handleTimeUp = () => {
    setGameOver(true);
    alert(`Time’s Up, Word Wizard! Final Score: ${score}`);
  };

  const resetGame = () => {
    setSelectedLetters([]);
    setScore(0);
    setFoundWords([]);
    setGameOver(false);
    fetchGrid();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-red-400 to-purple-500 flex flex-col items-center justify-center p-6 font-['Comic_Sans_MS',_'cursive']">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg animate-bounce">
        Word Wacko Search-o-Tron!
      </h1>

      {/* Timer and Score */}
      <div className="flex space-x-6 mb-6">
        <Timer initialTime={60} onTimeUp={handleTimeUp} />
        <Score score={score} />
      </div>

      {/* Main Game Layout: Grid and Words Side-by-Side */}
      <div className="flex flex-row items-start space-x-8">
        {/* Grid */}
        <div className="bg-white p-4 rounded-lg shadow-2xl border-4 border-pink-600">
          <Grid grid={grid} onSelectLetter={handleSelectLetter} selectedLetters={selectedLetters} />
        </div>

        {/* Words List */}
        <div className="bg-green-200 p-6 rounded-lg shadow-xl border-4 border-orange-500 w-64">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 underline">
            Wordz to Snag!
          </h2>
          <ul className="text-lg text-blue-900">
            {words.map((word) => (
              <li
                key={word}
                className={`mb-2 ${foundWords.includes(word) ? 'line-through text-gray-500' : 'hover:text-red-600'}`}
              >
                {word.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSubmitWord}
          className={`px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg transform transition-transform ${
            gameOver || selectedLetters.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-pink-600 hover:bg-pink-700 hover:scale-105'
          }`}
          disabled={gameOver || selectedLetters.length === 0}
        >
          Zap That Word!
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transform transition-transform"
        >
          New Wacky Game!
        </button>
      </div>
    </div>
  );
};

export default App;