import React from 'react';

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }): React.ReactElement => {
  const starClasses = 'inline-block text-xl';

  const renderStars = () => {
    return Array(5)
      .fill(null)
      .map((_, i) => {
        const starClass = i + 1 <= rating ? `${starClasses} text-yellow` : `${starClasses} text-lighterGray`;
        return (
          <span key={i} className={starClass}>
            &#9733;
          </span>
        );
      });
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
