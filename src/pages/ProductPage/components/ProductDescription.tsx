import React from 'react';
import { Link } from "react-router-dom";

const ProductDescription = ({ description }) => {
    return (
        <>
            <div className="flex justify-start items-center">
                <span className="text-gray font-bold">Sunrise</span>
            </div>

            <div className="flex justify-start items-center">
                <span className="text-gray font-thin">Category</span>
            </div>

            <div className="flex flex-row justify-between items-center">
                <div className="flex justify-start">Stars</div>
                <div className="flex justify-end">Price</div>
            </div>

            <div className="flex flex-col items-start">
                <span>Season</span>
                <span>Size</span>
                <Link to="/" className="text-mint underline">Your shoe size is not on the list?</Link>
            </div>
        </>
    )
}

export default React.memo(ProductDescription);