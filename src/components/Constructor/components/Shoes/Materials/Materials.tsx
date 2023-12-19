import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMaterial, setSelectedColor } from '@/store/reducers/constructor/SelectedShoePartsReducer';

interface Color {
  name: string;
}

interface Material {
  name: string;
  img?: string;
  colors: Color[];
}

interface Detail {
  part: string;
  name: string;
  image: string;
  materials: Material[];
}

interface MaterialData {
  available: boolean;
  title: string;
}

interface ShoeDetail {
  title: string;
  materials: MaterialData[];
}

interface IProps {
  details: Detail[];
  shoesDetailsFromApi: ShoeDetail[];
}

const Materials: FC<IProps> = ({ details, shoesDetailsFromApi }) => {
  const dispatch = useDispatch();
  const { selectedMaterial, selectedDetail, selectedModel } = useSelector((state) => state.selectedShoeParts);
  const selectedDetailObj = details.find((item) => item.part === selectedDetail.part);
  const materials = selectedDetailObj?.materials || [];

  const handleMaterialClick = (materialName) => {
    const selectedMaterialObj = materials.find((material) => material.name === materialName);

    if (selectedMaterialObj) {
      if (!selectedMaterialObj.colors) {
        dispatch(setSelectedColor({ img: selectedMaterialObj.img, name: selectedMaterialObj.img }));
      }
      dispatch(setSelectedMaterial(materialName));
    }
  };

  const isDetailAvailable =
    shoesDetailsFromApi &&
    (shoesDetailsFromApi?.find((item) => item?.title === selectedDetail.name) || shoesDetailsFromApi[0]);
  useEffect(() => {
    dispatch(setSelectedMaterial(materials[0].name));
  }, [selectedDetail, selectedModel]);

  return (
    <div className="flex justify-center items-start m-auto overflow-x-auto gap-6 flex-row lg:gap-6">
      {materials.map((material, i) => (
        <button
          key={i}
          className={`capitalize min-w-[150px] h-[40px] border border-gray p-1 ${
            selectedMaterial === material.name ? 'bg-grayLight' : 'bg-white'
          }  ${!isDetailAvailable?.materials[i]?.available ? 'opacity-50 ' : ''}`}
          onClick={() => handleMaterialClick(material.name)}
          // disabled={!isDetailAvailable?.materials[i]?.available}
        >
          {material.name}
        </button>
      ))}
    </div>
  );
};

export default Materials;
