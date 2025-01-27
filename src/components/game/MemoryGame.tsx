import { useState, useEffect } from "react";
import Card from "./Card";
import GameStats from "./GameStats";
import Confetti from "./Confetti";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Lightbulb, Wand2, Eye } from "lucide-react";

// Define the symbols array using Lucide icon names with PascalCase
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
  "Drop"
];

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
    const numPairs = Math.floor(totalCards / 2);
    const gameSymbols = SYMBOLS.slice(0, numPairs);
    let cardPairs = [...gameSymbols, ...gameSymbols];
    
    // If we have an odd number of total cards, remove the last duplicate
    if (totalCards % 2 !== 0) {
      cardPairs.pop();
    }
    
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

  const useHintPowerUp = () => {
    if (powerUpsUsed.hint) {
      toast("Watch an ad to use Hint power-up again!");
      return;
    }

    const unmatched = cards.filter(card => !card.isMatched);
    if (unmatched.length < 2) return;

    let firstValue = unmatched[0].value;
    let matchingPair = unmatched.filter(card => card.value === firstValue);

    if (matchingPair.length >= 2) {
      const newCards = [...cards];
      matchingPair.forEach(card => {
        newCards[card.id].isFlipped = true;
      });
      setCards(newCards);

      setTimeout(() => {
        const resetCards = [...cards];
        matchingPair.forEach(card => {
          resetCards[card.id].isFlipped = false;
        });
        setCards(resetCards);
      }, 2000);

      setPowerUpsUsed(prev => ({ ...prev, hint: true }));
      toast("Hint power-up used! A matching pair was revealed.");
    }
  };

  const useMatchAllPowerUp = () => {
    if (powerUpsUsed.matchAll) {
      toast("Watch an ad to use Match All power-up again!");
      return;
    }

    if (firstCard === null) {
      toast("Select a card first to match all of its type!");
      return;
    }

    const selectedValue = cards[firstCard].value;
    const newCards = [...cards];
    let matchCount = 0;

    newCards.forEach(card => {
      if (card.value === selectedValue) {
        card.isFlipped = true;
        card.isMatched = true;
        matchCount++;
      }
    });

    setCards(newCards);
    setMatches(prev => prev + matchCount / 2);
    setFirstCard(null);
    setPowerUpsUsed(prev => ({ ...prev, matchAll: true }));
    toast("Match All power-up used! All matching cards were paired.");
  };

  const useRevealAllPowerUp = () => {
    if (powerUpsUsed.revealAll) {
      toast("Watch an ad to use Reveal All power-up again!");
      return;
    }

    const newCards = cards.map(card => ({
      ...card,
      isFlipped: true
    }));
    setCards(newCards);

    setTimeout(() => {
      const resetCards = cards.map(card => ({
        ...card,
        isFlipped: card.isMatched
      }));
      setCards(resetCards);
    }, 5000);

    setPowerUpsUsed(prev => ({ ...prev, revealAll: true }));
    toast("Reveal All power-up used! All cards are visible for 5 seconds.");
  };

  return (
    <div className="w-full max-w-[90vw] mx-auto p-4">
      <div className="flex flex-col items-center gap-8">
        <GameStats moves={moves} matches={matches} />
        
        <div className="flex gap-4 mb-8">
          <Button
            variant="outline"
            onClick={useHintPowerUp}
            className="flex gap-2 items-center"
            disabled={isChecking}
          >
            <Lightbulb className="w-4 h-4" />
            Hint
          </Button>
          <Button
            variant="outline"
            onClick={useMatchAllPowerUp}
            className="flex gap-2 items-center"
            disabled={isChecking}
          >
            <Wand2 className="w-4 h-4" />
            Match All
          </Button>
          <Button
            variant="outline"
            onClick={useRevealAllPowerUp}
            className="flex gap-2 items-center"
            disabled={isChecking}
          >
            <Eye className="w-4 h-4" />
            Reveal All
          </Button>
        </div>

        <div 
          className="grid gap-2"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: '100%',
            maxWidth: gridSize <= 4 ? "500px" : 
                     gridSize <= 5 ? "600px" : 
                     gridSize <= 6 ? "700px" : 
                     gridSize <= 7 ? "800px" : "900px",
            margin: "0 auto",
            aspectRatio: '1/1'
          }}
        >
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="w-full h-full"
            >
              <Card
                value={card.value}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
              />
            </div>
          ))}
        </div>

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