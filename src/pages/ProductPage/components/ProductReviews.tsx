
import Rating from "@/components/ui/Rating/Rating";
import ProductComments from "./ProductComments";
import WriteReviewModal from "./WriteReviewModal";

const ProductReviews = () => {
    return (
        <>
            <h2>Reviews</h2>
            <div className="flex flex-col justify-center items-center">
                {/* Product Rating */}
                <Rating includeTitle={true} readOnly={true}/>
                {/* Product Comments */}
                <ProductComments />
                {/* Leave a Comment */}
                <WriteReviewModal />
            </div>
        </>
    )
}

export default ProductReviews;