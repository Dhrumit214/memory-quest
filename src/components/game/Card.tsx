import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card = ({ value, isFlipped, isMatched, onClick }: CardProps) => {
  // Dynamically get the icon component from lucide-react
  const IconComponent = (Icons as any)[value];

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
            "memory-card-back absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center",
            isMatched && "bg-green-100"
          )}
        >
          {IconComponent && <IconComponent size={32} />}
        </div>
      </div>
    </div>
  );
};

export default Card;