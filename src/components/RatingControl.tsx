import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Optional: if using buttons for rating

interface RatingControlProps {
  initialRating?: number; // 0-5
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Icon size
  className?: string;
}

const RatingControl: React.FC<RatingControlProps> = ({
  initialRating = 0,
  maxRating = 5,
  onRatingChange,
  readOnly = false,
  size = 'md',
  className,
}) => {
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  console.log("Rendering RatingControl, currentRating:", currentRating);

  const handleStarClick = (ratingValue: number) => {
    if (readOnly) return;
    const newRating = ratingValue === currentRating ? 0 : ratingValue; // Allow unsetting by clicking same star
    setCurrentRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
    console.log("Rating set to:", newRating);
  };

  const handleStarHover = (ratingValue: number) => {
    if (readOnly) return;
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  const iconSizeClass = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  return (
    <div className={`flex items-center space-x-1 ${className || ''}`} onMouseLeave={handleMouseLeave}>
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hoverRating || currentRating);
        return (
          <button
            key={ratingValue}
            type="button"
            disabled={readOnly}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => handleStarHover(ratingValue)}
            className={`p-0.5 rounded-sm ${readOnly ? 'cursor-default' : 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'}`}
            aria-label={`Rate ${ratingValue} out of ${maxRating} stars`}
          >
            <Star
              className={`${iconSizeClass} transition-colors ${
                isFilled ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'
              }`}
            />
          </button>
        );
      })}
      {/* Optional: Display current rating as text */}
      {/* {!readOnly && <span className="ml-2 text-sm text-muted-foreground">({currentRating}/{maxRating})</span>} */}
    </div>
  );
};

export default RatingControl;