import { FC } from 'react';
import ProductsCart from './ProductsCart/ProductsCart';

export interface IAccessories {
	_id: string
	name: string
	price: number
	rating: number
	category: ICategory
	subcategory: string
	photos: string[]
	description: string
	size: number[]
	stripeID: string
	__v: number
}

export interface ICategory {
	_id: string
	categoryTitle: string
	subCategory: string[]
	__v: number
}
const SubcategoriesList: FC<IAccessories> = ({ accessories }) => {
	const subcategories = [...new Set(accessories.map(accessory => accessory.subcategory))];

	return (

		<div className="flex flex-col">
			{subcategories.map(subcategory => (
				<>
					<div className="flex items-center justify-between">
						<div>
							<span>{subcategory}</span>
						</div>
						<div>
							Show more
						</div>
					</div>
					<ProductsCart
						products={accessories.filter(product => product.subcategory === subcategory)}
					/>
				</>
			))}
		</div>
	)
}

export default SubcategoriesList;