const Score = ({ score }) => {
  return (
    <div className="text-2xl font-bold text-white bg-red-600 px-4 py-2 rounded-full shadow-lg">
      Loot: {score} Points!
    </div>
  );
};

export default Score;