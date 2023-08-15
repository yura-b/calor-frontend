import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDesign } from '@/store/reducers/DaygerModelReducer';
import View1 from './components/Shoes/Views/View1'
import View2 from './components/Shoes/Views/View2'
import Details from './components/Shoes/Details';
import Materials from "./components/Shoes/Materials";
import Colors from "./components/Shoes/Colors";
import Button from '@/components/ui/Button';
import { daygerDetails } from './shoesData';
import styles from '@styles/Styles.module.scss';
import mergeImages from 'merge-images';

const Constructor = () => {
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();
	const { view4 } = useSelector(state => state.daygerModel);
	const modelImages = Object.values(view4)

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const handleSaveDesign = () => {
		mergeImages(['../../assets/images/constructor/parts/dayger/view4/dayger_view4_part01_leather_11.png', '../../assets/images/constructor/parts/dayger/view4/dayger_view4_part02_leather_11.png']).then((b64) => {
			console.log(b64)
		}).catch((e) => {
			console.log(e)
		});
	}

	const handleRedesign = () => {
		dispatch(resetDesign({}));
	}
	
	const handleAddToCart = () => {

	}
	return (
		<div className={`${styles.container}`}>
			<View1 />
			<Details details={daygerDetails} />
			<Materials details={daygerDetails} />
			<Colors details={daygerDetails} />
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