interface GameStatsProps {
  moves: number;
  matches: number;
}

const GameStats = ({ moves, matches }: GameStatsProps) => {
  return (
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
  );
};

export default GameStats;