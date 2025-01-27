import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Cpu, Fire, Skull } from "lucide-react";

interface HomeScreenProps {
  onStartGame: (gridSize: number) => void;
}

const HomeScreen = ({ onStartGame }: HomeScreenProps) => {
  const [difficulty, setDifficulty] = useState("easy");

  const handleStartGame = () => {
    let gridSize: number;
    switch (difficulty) {
      case "easy":
        gridSize = 4;
        break;
      case "medium":
        gridSize = 5;
        break;
      case "hard":
        gridSize = 6;
        break;
      case "superhard":
        gridSize = 8;
        break;
      default:
        gridSize = 4;
    }
    onStartGame(gridSize);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <img
          src="/placeholder.svg"
          alt="Memory Quest Logo"
          className="w-32 h-32 mx-auto mb-4"
        />
      </div>
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
          <Brain className="w-5 h-5 text-blue-500 mr-2" />
          <Label htmlFor="easy">Easy (4x4 grid - 16 cards)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Cpu className="w-5 h-5 text-yellow-500 mr-2" />
          <Label htmlFor="medium">Medium (5x5 grid - 25 cards)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hard" id="hard" />
          <Fire className="w-5 h-5 text-orange-500 mr-2" />
          <Label htmlFor="hard">Hard (6x6 grid - 36 cards)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="superhard" id="superhard" />
          <Skull className="w-5 h-5 text-red-500 mr-2" />
          <Label htmlFor="superhard">Super Hard (8x8 grid - 64 cards)</Label>
        </div>
      </RadioGroup>

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