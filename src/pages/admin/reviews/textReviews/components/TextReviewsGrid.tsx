import React, {useState} from 'react';
import CustomSearch from '@components/admin/CustomSearch.tsx';

const TextReviewsGrid = () => {
    const [filter, setFilter] = useState('')


    return (
        <div>
            <CustomSearch searchButton={setFilter}/>

        </div>
    );
};

export default TextReviewsGrid;
