import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMaterial, setSelectedColor } from '@/store/reducers/constructor/SelectedShoePartsReducer';

interface Color {
  name: string;
}

interface Material {
  name: string;
  img?: string
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
  const { selectedMaterial, selectedDetail, selectedModel } = useSelector(state => state.selectedShoeParts);
  console.log(selectedDetail, 'selectedDetail', details, 'details')
  const selectedDetailObj = details.find(item => item.part === selectedDetail);
  console.log(selectedDetailObj)
  const materials = selectedDetailObj?.materials || [];
  
	const handleMaterialClick = (materialName) => {
    const selectedMaterialObj = materials.find((material) => material.name === materialName);
    
    if (selectedMaterialObj) {
      if (!selectedMaterialObj.colors) {
        dispatch(setSelectedColor(selectedMaterialObj.img));
      }
        dispatch(setSelectedMaterial(materialName));
    }
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