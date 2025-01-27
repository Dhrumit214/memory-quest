import { Button } from "@/components/ui/button";
import { Lightbulb, Wand2, Eye } from "lucide-react";
import { toast } from "sonner";

interface PowerUpState {
  hint: boolean;
  matchAll: boolean;
  revealAll: boolean;
}

interface PowerUpsProps {
  isChecking: boolean;
  powerUpsUsed: PowerUpState;
  setPowerUpsUsed: (state: PowerUpState) => void;
  cards: Array<{
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  setCards: (cards: Array<{
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>) => void;
  firstCard: number | null;
  setFirstCard: (cardId: number | null) => void;
}

const PowerUps = ({
  isChecking,
  powerUpsUsed,
  setPowerUpsUsed,
  cards,
  setCards,
  firstCard,
  setFirstCard
}: PowerUpsProps) => {
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
  );
};

export default PowerUps;