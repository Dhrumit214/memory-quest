import { useState, useEffect } from "react";
import Card from "./Card";
import GameStats from "./GameStats";
import Confetti from "./Confetti";
import { toast } from "sonner";

const SYMBOLS = ["🎮", "🎲", "🎯", "🎨", "🎭", "🎪", "🎢", "🎡", "🎠", "🎪", "🎨", "🎭", "🎯", "🎲", "🎮", "🎡", 
                "🎢", "🎪", "🎨", "🎭", "🎯", "🎲", "🎮", "🎡", "🎢", "🎪", "🎨", "🎭", "🎯", "🎲", "🎮", "🎡",
                "🎢", "🎪", "🎨", "🎭", "🎯", "🎲", "🎮", "🎡", "🎢", "🎪", "🎨", "🎭", "🎯", "🎲", "🎮", "🎡",
                "🦁", "🐯", "🐮", "🐷", "🐸", "🐙", "🦈", "🦋", "🦉", "🦒", "🦘", "🦫", "🦭", "🦚", "🦜", "🦢"];

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
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

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const numPairs = totalCards / 2;
    const gameSymbols = SYMBOLS.slice(0, numPairs);
    const shuffledCards = [...gameSymbols, ...gameSymbols]
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
          if (newMatches === cards.length / 2) {
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
      <GameStats moves={moves} matches={matches} onReset={initializeGame} onBackToHome={onBackToHome} />
      <div 
        className="grid gap-2 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          maxWidth: gridSize <= 5 ? "500px" : gridSize <= 6 ? "600px" : "800px",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default MemoryGame;