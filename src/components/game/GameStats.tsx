interface GameStatsProps {
  moves: number;
  matches: number;
  onReset: () => void;
  onBackToHome: () => void;
}

const GameStats = ({ moves, matches, onReset, onBackToHome }: GameStatsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-lg font-semibold">Moves</p>
          <p className="text-3xl font-bold text-blue-500">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Matches</p>
          <p className="text-3xl font-bold text-violet-500">{matches}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Reset Game
        </button>
        <button
          onClick={onBackToHome}
          className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-50 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default GameStats;