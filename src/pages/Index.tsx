import { useState } from "react";
import MemoryGame from "@/components/game/MemoryGame";
import HomeScreen from "@/components/game/HomeScreen";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gridSize, setGridSize] = useState(4);

  const handleStartGame = (size: number) => {
    setGridSize(size);
    setGameStarted(true);
  };

  const handleBackToHome = () => {
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
          Memory Quest
        </h1>
        <p className="text-lg text-center mb-8 text-gray-600 italic">
          Sharpen your mind, one match at a time!
        </p>
        {gameStarted ? (
          <MemoryGame gridSize={gridSize} onBackToHome={handleBackToHome} />
        ) : (
          <HomeScreen onStartGame={handleStartGame} />
        )}
      </div>
    </div>
  );
};

export default Index;