import { useState, useEffect } from "react";
import GameStats from "./GameStats";
import Confetti from "./Confetti";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PowerUps from "./PowerUps";
import GameGrid from "./GameGrid";

const SYMBOLS = [
  "Sun",
  "Moon",
  "Star",
  "Heart",
  "Cloud",
  "Flower",
  "Leaf",
  "Gem",
  "Smile",
  "Drop",
  "Zap",
  "Apple",
  "Bird",
  "Fish",
  "Tree",
  "Bell",
  "Book",
  "Car",
  "Home",
  "Gift",
  "Cake",
  "Cat",
  "Dog",
  "Eye",
  "Flag",
  "Key",
  "Lock",
  "Map",
  "Phone",
  "Ring",
  "Ship",
  "Watch"
]; // Added more symbols for larger grids

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface PowerUpState {
  hint: boolean;
  matchAll: boolean;
  revealAll: boolean;
}

interface MemoryGameProps {
  gridSize: number;
  onBackToHome: () => void;
}

const MemoryGame = ({ gridSize, onBackToHome }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [powerUpsUsed, setPowerUpsUsed] = useState<PowerUpState>({
    hint: false,
    matchAll: false,
    revealAll: false
  });

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const numPairs = totalCards / 2;
    const gameSymbols = SYMBOLS.slice(0, numPairs);
    const cardPairs = [...gameSymbols, ...gameSymbols];
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setMoves(0);
    setMatches(0);
    setFirstCard(null);
    setShowConfetti(false);
    setPowerUpsUsed({
      hint: false,
      matchAll: false,
      revealAll: false
    });
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const handleCardClick = (clickedId: number) => {
    if (isChecking || cards[clickedId].isFlipped || cards[clickedId].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[clickedId].isFlipped = true;
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(clickedId);
    } else {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      if (cards[firstCard].value === cards[clickedId].value) {
        newCards[firstCard].isMatched = true;
        newCards[clickedId].isMatched = true;
        setCards(newCards);
        setMatches((prev) => {
          const newMatches = prev + 1;
          if (newMatches === Math.floor(cards.length / 2)) {
            setShowConfetti(true);
            toast("Congratulations! You've won! 🎉");
          }
          return newMatches;
        });
        setIsChecking(false);
      } else {
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[clickedId].isFlipped = false;
          setCards(newCards);
          setIsChecking(false);
        }, 1000);
      }
      setFirstCard(null);
    }
  };

  return (
    <div className="w-full max-w-[90vw] mx-auto p-4">
      <div className="flex flex-col items-center gap-8">
        <GameStats moves={moves} matches={matches} />
        
        <PowerUps
          isChecking={isChecking}
          powerUpsUsed={powerUpsUsed}
          setPowerUpsUsed={setPowerUpsUsed}
          cards={cards}
          setCards={setCards}
          firstCard={firstCard}
          setFirstCard={setFirstCard}
        />

        <GameGrid
          gridSize={gridSize}
          cards={cards}
          onCardClick={handleCardClick}
        />

        <div className="flex gap-4 mt-8">
          <Button
            onClick={initializeGame}
            variant="default"
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white"
          >
            Reset Game
          </Button>
          <Button
            onClick={onBackToHome}
            variant="outline"
            className="border-blue-500 text-blue-500"
          >
            Back to Home
          </Button>
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default MemoryGame;