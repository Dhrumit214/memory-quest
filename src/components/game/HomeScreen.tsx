import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HomeScreenProps {
  onStartGame: (gridSize: number) => void;
}

const HomeScreen = ({ onStartGame }: HomeScreenProps) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [customSize, setCustomSize] = useState("4");

  const handleStartGame = () => {
    let gridSize: number;
    switch (difficulty) {
      case "easy":
        gridSize = 4;
        break;
      case "medium":
        gridSize = 6;
        break;
      case "hard":
        gridSize = 8;
        break;
      case "custom":
        gridSize = Math.min(Math.max(parseInt(customSize) || 4, 2), 10);
        break;
      default:
        gridSize = 4;
    }
    onStartGame(gridSize);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
        Choose Difficulty Level
      </h2>
      <RadioGroup
        value={difficulty}
        onValueChange={setDifficulty}
        className="space-y-4 mb-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="easy" id="easy" />
          <Label htmlFor="easy">Easy (4x4 grid - 16 cards)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium">Medium (6x6 grid - 36 cards)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hard" id="hard" />
          <Label htmlFor="hard">Hard (8x8 grid - 64 cards)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom">Custom</Label>
        </div>
      </RadioGroup>

      {difficulty === "custom" && (
        <div className="mb-6">
          <Label htmlFor="gridSize">Grid Size (2-10)</Label>
          <Input
            id="gridSize"
            type="number"
            min="2"
            max="10"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            className="mt-1"
          />
        </div>
      )}

      <button
        onClick={handleStartGame}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
      >
        Start Game
      </button>
    </div>
  );
};

export default HomeScreen;