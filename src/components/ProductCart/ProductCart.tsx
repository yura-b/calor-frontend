import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import BasicRating from '@/components/ui/Rating/Rating';
import Button from '@/components/ui/Button';

const ProductCart: FC = ({ product, type }): React.ReactElement => {

  return (
    <div className="w-full flex-col lg:w-[33.33%] md:w-[50%] px-5 my-5 flex justify-end">
      {/* Product img */}
      <div className="min-h-[10vh]">
        <Link to={`/product/${product._id}`}>
          <img className="p-6 m-auto" src={product.photos?.[0] || product.photo} />
        </Link>
      </div>
      {/* Product content */}
      <div className="flex justify-start items-center mb-1">
        {product.title}
      </div>
      <div className="flex flex-row justify-between">
        <BasicRating includeTitle={false} readOnly={true} size="small" rating={product.rating} />
        <span>{product?.rating ? product?.rating : "0"}</span>
      </div>
      <div>{product.categoryTitle}</div>
      <div className="flex flex-row justify-between">
        <span>From</span>
        <span>{product.price} $</span>
      </div>
      <Button className="max-w-full" color="transparentMint" to={type === "shoes" ? `model/${product.title.toLowerCase()}/${product._id}` : `product/${product.subcategory.toLowerCase()}/${product._id}`}>
        {
          type === "shoes" ? "Design" : "Add to cart"
        }
      </Button>
    </div >
  );
};

export default ProductCart;
