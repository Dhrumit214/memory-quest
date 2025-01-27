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
    const baseWidth = Math.min(window.innerWidth * 0.9, 800); // 90% of viewport width up to 800px
    return baseWidth;
  };

  // Calculate card size based on container width and grid size
  const getCardSize = () => {
    const containerWidth = getContainerWidth();
    const gap = 8; // 2rem gap
    const availableWidth = containerWidth - (gap * (gridSize - 1));
    return Math.floor(availableWidth / gridSize);
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div
        className="grid gap-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `${getContainerWidth()}px`,
          gap: '0.5rem',
        }}
      >
        {cards.map((card) => (
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