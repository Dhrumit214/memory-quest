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

  // Define icon colors based on the icon type
  const getIconColor = () => {
    switch (value) {
      case "Sun":
        return "#FFB800";
      case "Moon":
        return "#6B7280";
      case "Star":
        return "#FFD700";
      case "Heart":
        return "#FF4B6E";
      case "Cloud":
        return "#60A5FA";
      case "Flower":
        return "#EC4899";
      case "Leaf":
        return "#34D399";
      case "Gem":
        return "#8B5CF6";
      case "Smile":
        return "#F59E0B";
      case "Drop":
        return "#3B82F6";
      default:
        return "#6B7280";
    }
  };

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
          {IconComponent && (
            <IconComponent
              size={32}
              color={getIconColor()}
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;