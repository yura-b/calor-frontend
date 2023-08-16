import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDesign } from '@/store/reducers/DaygerModelReducer';
import View1 from './components/Shoes/Views/View1'
import View2 from './components/Shoes/Views/View2'
import Details from './components/Shoes/Details';
import Materials from "./components/Shoes/Materials";
import Colors from "./components/Shoes/Colors";
import Button from '@/components/ui/Button';
import { shoes } from './shoesData';
import styles from '@styles/Styles.module.scss';
import combineImages from '@/helpers/functions/combineImages';
import { setSelectedMaterial, setSelectedColor } from '@/store/reducers/ActiveShoePartsReducer';

interface IProps {
	model: string;
}

const Constructor: FC<IProps> = ({model}) => {
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();
	const { view2 } = useSelector(state => state.daygerModel);
	const { selectedMaterial } = useSelector(state => state.activeShoeParts);
	const modelImages = Object.values(view2);

	const modelDetails = shoes.find((item) => item.product === model);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const handleSaveDesign = () => {
		combineImages(modelImages).then((base64) => {
			console.log(base64)
		});
	}

	const handleRedesign = () => {
		dispatch(resetDesign({}));
	}
	
	const handleAddToCart = () => {
		combineImages(modelImages).then((base64) => {
			console.log(base64)
		});
	}

	return (
		<div className={`${styles.container}`}>
			<View1 />
			<Details details={modelDetails?.details} />
			<Materials details={modelDetails?.details} />
			<Colors details={modelDetails?.details} />
			<div className='flex justify-center align-center'>
				<Button color="gray" className="w-full my-4 lg:block" onClick={toggleVisibility}>Preview</Button>
			</div>
			{
				isVisible && 
				<>
					<View2 />
					<div className='flex flex-col justify-center items-center'>
						<Button color="mint" className="w-full my-4 lg:block" onClick={handleSaveDesign}>Save design</Button>
						<Button color="transparentGray" className="w-full my-4 lg:block" onClick={handleRedesign}>Redesign</Button>
						<Button color="gray" className="w-full my-4 lg:block" onClick={handleAddToCart}>Add to cart</Button>
					</div>
				</>
			}
		</div>
	)
}

export default Constructor;