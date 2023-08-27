

import React from "react";
import Rating from "@/components/ui/Rating/Rating";
import ProductComments from "./ProductComments";
import WriteReviewModal from "./WriteReviewModal";

const ProductReviews = () => {
    return (
        <>
            <h2>Reviews</h2>
            {/* Product Rating */}
            <div className="flex flex-col justify-center items-center">
                <Rating includeTitle={true} readOnly={true}/>
                <ProductComments />
                <WriteReviewModal />
            </div>
        </>
    )
}

export default ProductReviews;