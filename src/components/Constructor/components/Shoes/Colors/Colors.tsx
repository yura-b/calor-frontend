import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedColor } from '@/store/reducers/constructor/SelectedShoePartsReducer';
import { updateParts } from '@/store/reducers/constructor/ShoesConstructorReducer';
import { Tooltip } from '@mui/material';

interface Color {
  img: string;
  name: string;
  color: string;
  hex: string;
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
const Colors: FC<IProps> = ({ details }) => {
  const dispatch = useDispatch();
  const { selectedMaterial, selectedDetail, selectedColor, selectedModel } = useSelector(state => state.selectedShoeParts);

  const selectedDetailObj = details.find(item => item.part === selectedDetail);
  const materials = selectedDetailObj?.materials || [];
  const selectedMaterialObj = materials.find(item => item.name === selectedMaterial);
  const colors = selectedMaterialObj?.colors || [];

  const handleColorClick = (colorImg) => {
		dispatch(setSelectedColor(colorImg));
	};

  useEffect(() => {
    if (selectedColor) {
      dispatch(updateParts({selectedMaterial, selectedDetail, selectedColor, selectedModel }))
    }
  }, [selectedColor]);

  return (
    <div className='flex lg:justify-center sm:justify-start items-center m-auto overflow-x-auto gap-6 flex-row p-5 lg:py-6 lg:gap-6 overflow-hidden hover:overflow-y-auto'>
      {colors.map((color) =>
        color.name !== null ? (
          <Tooltip key={color.name} title={color.name} placement="top" arrow>
            <button
              style={{ backgroundColor: color.hex }}
              className='min-h-[50px] min-w-[50px] rounded-full shadow focus:drop-shadow-2md focus:outline-none ring-2 focus:ring-2 ring-grayLight focus:ring-grayLight'
              onClick={() => handleColorClick(color.img)}
            />
          </Tooltip>
        ) : null
      )}
    </div>
  );
}

export default Colors;