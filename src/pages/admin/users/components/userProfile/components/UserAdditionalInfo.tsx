import React, { useState } from 'react';
import UserProfileReviews from '@pages/admin/users/components/userProfile/components/UserProfileReviews.tsx';
import { Review } from '@/constants/interfaces/review.ts';

enum chosenSectionEnum {
  orderHistory = 'Orders History',
  reviews = 'Reviews',
  promoCode = 'Promo Codes',
  appointments = 'Appointments',
}

const sections: chosenSectionEnum[] = [
  chosenSectionEnum.orderHistory,
  chosenSectionEnum.reviews,
  chosenSectionEnum.promoCode,
  chosenSectionEnum.appointments,
];

const UserAdditionalInfo: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const [chosenSection, setChosenSection] = useState<chosenSectionEnum>(chosenSectionEnum.orderHistory);
  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const chosen = ' text-white bg-black';

  return (
    <div className={'flex flex-col mt-4'}>
      <div className={'flex flex-row mb-6'}>
        {sections.map((section) => {
          if (section === chosenSection) {
            return (
              <div key={section} className={defaultStyles + chosen} onClick={() => setChosenSection(section)}>
                {section}
              </div>
            );
          }
          return (
            <div key={section} className={defaultStyles} onClick={() => setChosenSection(section)}>
              {section}
            </div>
          );
        })}
      </div>
      <div>{chosenSection === chosenSectionEnum.reviews && <UserProfileReviews reviews={reviews} />}</div>
    </div>
  );
};

export default UserAdditionalInfo;
