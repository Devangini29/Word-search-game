const Grid = ({ grid, onSelectLetter, selectedLetters }) => {
  return (
    <div className="grid grid-cols-10 gap-1">
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => {
          const isSelected = selectedLetters.some(
            (pos) => pos.row === rowIndex && pos.col === colIndex
          );
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 flex items-center justify-center bg-yellow-100 border-2 border-purple-400 rounded-md cursor-pointer text-xl font-bold ${
                isSelected
                  ? 'bg-red-500 text-white shadow-inner'
                  : 'hover:bg-green-300 text-blue-700'
              }`}
              onClick={() => onSelectLetter(rowIndex, colIndex)}
            >
              {letter}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Grid;