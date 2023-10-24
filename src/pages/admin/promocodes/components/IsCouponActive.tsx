import React, {FC} from 'react';

const IsCouponActive:FC<{isUsed: boolean}> = ({isUsed}) => {
    return (
        <div>
            {isUsed ? (
                <p className={'font-bolt text-red-500'}>Inactive</p>
            ) : (
                <p className={'text-mint'}>Active</p>
            )}
        </div>
    );
};

export default IsCouponActive;
