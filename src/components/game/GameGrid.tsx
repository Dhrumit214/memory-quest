import Card from "./Card";

interface GameGridProps {
  gridSize: number;
  cards: Array<{
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  onCardClick: (id: number) => void;
}

const GameGrid = ({ gridSize, cards, onCardClick }: GameGridProps) => {
  // Calculate the container width based on grid size
  const getContainerWidth = () => {
    const baseWidth = Math.min(window.innerWidth * 0.8, 600); // Reduced to 80% of viewport width up to 600px
    return baseWidth;
  };

  // Ensure we have exactly gridSize * gridSize cards
  const totalCards = gridSize * gridSize;
  const displayCards = cards.slice(0, totalCards);

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `${getContainerWidth()}px`,
          gap: '8px',
          maxWidth: '100%',
        }}
      >
        {displayCards.map((card) => (
          <div
            key={card.id}
            style={{
              width: '100%',
              aspectRatio: '1/1',
            }}
          >
            <Card
              value={card.value}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => onCardClick(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;