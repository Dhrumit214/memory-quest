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
  return (
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
            onClick={() => onCardClick(card.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default GameGrid;