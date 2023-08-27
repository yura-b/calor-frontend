import {} from 'react';

const ProductsCart = ({subcategory, products}) => {
    return (
        <>
            <div>
                <span>{subcategory}</span>
            </div>
            {
                products.map(product => <span>{product.description}</span>)
            }
        </>
    )
}

export default ProductsCart;