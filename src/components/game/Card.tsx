import { cn } from "@/lib/utils";

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card = ({ value, isFlipped, isMatched, onClick }: CardProps) => {
  return (
    <div
      className={cn(
        "memory-card cursor-pointer w-full pb-[100%] relative",
        isFlipped && "flipped"
      )}
      onClick={onClick}
    >
      <div className="memory-card-inner absolute inset-0">
        <div className="memory-card-front absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg shadow-lg" />
        <div
          className={cn(
            "memory-card-back absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold",
            isMatched && "bg-green-100"
          )}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default Card;