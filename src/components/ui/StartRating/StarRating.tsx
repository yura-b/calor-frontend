import React from 'react';

interface Props {
  rating: number;
}

const StarRating: React.FC<Props> = ({ rating }): React.ReactElement => {
  const starClasses = 'inline-block text-xl';

  const renderStars = (): React.ReactElement[] => {
    const stars: React.ReactElement[] = [];

    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? `${starClasses} text-yellow-500` : `${starClasses} text-gray-300`;
      stars.push(
        <span key={i} className={starClass}>
          &#9733;
        </span>
      );
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
