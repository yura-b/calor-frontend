import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDetail } from '@/store/reducers/constructor/SelectedShoePartsReducer';

interface Color {
  name: string;
}

interface Material {
  name: string;
  colors: Color[];
}

interface Detail {
  part: string;
  name: string;
  image: string;
  materials: Material[];
}

interface IProps {
  details: Detail[];
}

const Details: FC<IProps> = ({ details }) => {
	const { selectedDetail } = useSelector(state => state.selectedShoeParts);
	const dispatch = useDispatch();
	
	const handleDetailClick = (detailPart) => {
		dispatch(setSelectedDetail(detailPart));
	};

	return (
		<>
			<div className='flex justify-between items-start m-auto overflow-x-auto gap-6 flex-row p-5 lg:py-6 lg:gap-6'>
				{
					details.map((detail) => {
						return (
							<div className='min-h-[70px] justify-center items-center flex flex-col cursor-pointer' onClick={() => handleDetailClick(detail.part)}>
								<div className={`flex items-center justify-center w-20 h-20 rounded-full ${selectedDetail === detail.part ? 'bg-grayLight' : 'bg-grayExtraLight'}`}>
									<img src={detail.image} alt={detail.name} />
								</div>
								<span className={`inline-block text-center ${selectedDetail === detail.part ? 'font-bold' : ''}`}>{detail.name}</span>
							</div>
						)
					})
				}
			</div>
		</>
	);
}

export default Details;