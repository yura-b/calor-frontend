import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMaterial } from '@/store/reducers/ActiveShoePartsReducer';

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

const Materials: FC<IProps> = ({ details }) => {
	const dispatch = useDispatch();
  const { selectedMaterial, selectedDetail } = useSelector(state => state.activeShoeParts);
  const selectedDetailObj = details.find(item => item.part === selectedDetail);
  const materials = selectedDetailObj?.materials || [];
  
	const handleMaterialClick = (materialId) => {
		dispatch(setSelectedMaterial(materialId));
	};

  useEffect(() => {
    dispatch(setSelectedMaterial(materials[0].name));
  }, [selectedDetail])
  
  return (
    <div className='flex justify-center items-start m-auto overflow-x-auto gap-6 flex-row p-5 lg:py-6 lg:gap-6'>
      {
        materials.map((material) => (
            <button className={`capitalize min-w-[150px] h-[40px] border border-gray p-1 ${selectedMaterial === material.name ? 'bg-grayLight' : 'bg-white'}`} onClick={() => handleMaterialClick(material.name)}>{material.name}</button>
        ))}
    </div>
  );
}

export default Materials;