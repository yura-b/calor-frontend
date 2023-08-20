import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDesign } from '@/store/reducers/constructor/ShoesConstructorReducer';
import { setSelectedModel } from '@/store/reducers/constructor/SelectedShoePartsReducer'
import styles from '@styles/Styles.module.scss';
import MainView from './components/Shoes/Views/MainView'
import AditionalViews from './components/Shoes/Views/AditionalViews'
import Details from './components/Shoes/Details';
import Materials from "./components/Shoes/Materials";
import Colors from "./components/Shoes/Colors";
import NavigationMenu from './components/NavigationMenu';
import Button from '@/components/ui/Button';
import { shoes } from './shoesData';
import combineImages from '@/helpers/functions/combineImages';

interface IProps {
	model: string;
}

const Constructor: FC<IProps> = ({model}) => {
	const dispatch = useDispatch();

	const [isVisible, setIsVisible] = useState(false);
	const { view3 } = useSelector(state => state.shoesConstructor[model]);
	const { selectedModel } = useSelector(state => state.selectedShoeParts);
	const modelImages = Object.values(view3);
	const modelDetails = shoes.find((item) => item.product === model);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const handleSaveDesign = () => {
		combineImages(modelImages).then((base64) => {

		});
	}

	const handleRedesign = () => {
		dispatch(resetDesign());
	}
	
	const handleAddToCart = () => {
		combineImages(modelImages).then((base64) => {

		});
	}

	useEffect(() => {
		dispatch(setSelectedModel(model));
	}, [selectedModel]);

	return (
		<div>
			<NavigationMenu />
			<MainView model={model}/>
			<Details details={modelDetails?.details} />
			<Materials details={modelDetails?.details} />
			<Colors details={modelDetails?.details} />

			<div className="flex w-wrapper flex-col mx-auto">
				<div className='flex justify-center align-center'>
					<Button color="gray" className="w-full my-4 lg:block" onClick={toggleVisibility}>Preview</Button>
				</div>
				{
					isVisible && 
					<>
						<AditionalViews model={model}/>
						<div className='flex flex-col justify-center items-center'>
							<Button color="mint" className="w-full my-4 lg:block" onClick={handleSaveDesign}>Save design</Button>
							<Button color="transparentGray" className="w-full my-4 lg:block" onClick={handleRedesign}>Redesign</Button>
							<Button color="gray" className="w-full my-4 lg:block" onClick={handleAddToCart}>Add to cart</Button>
						</div>
					</>
				}
			</div>
		</div>
	)
}

export default Constructor;