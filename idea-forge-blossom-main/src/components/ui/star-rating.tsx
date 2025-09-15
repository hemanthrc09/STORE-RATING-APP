import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const StarRating = ({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = "md" 
}: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoveredRating || rating);
        return (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              readonly ? "cursor-default" : "cursor-pointer",
              "transition-all duration-150",
              isFilled 
                ? "fill-warning text-warning" 
                : "fill-transparent text-muted-foreground hover:text-warning"
            )}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoveredRating(star)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
          />
        );
      })}
    </div>
  );
};