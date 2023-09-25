import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedColor } from '@/store/reducers/constructor/SelectedShoePartsReducer';
import { updateParts } from '@/store/reducers/constructor/ShoesConstructorReducer';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@/styles/Animations';
import styles from '@styles/Styles.module.scss';

interface Color {
  img: string;
  name: string;
  color: string;
  hex: string;
  texture: string;
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
  const { selectedMaterial, selectedDetail, selectedColor, selectedModel } = useSelector(
    (state) => state.selectedShoeParts
  );
  const containerRef = useRef(null);
  const colorRefs = useRef({});
  const selectedDetailObj = details.find((item) => item.part === selectedDetail.part);
  const materials = selectedDetailObj?.materials || [];
  const selectedMaterialObj = materials.find((item) => item.name === selectedMaterial);
  const colors = selectedMaterialObj?.colors || [];

  const handleColorClick = (colorImg) => {
    dispatch(setSelectedColor(colorImg));
  };

  useEffect(() => {
    if (selectedColor) {
      dispatch(updateParts({ selectedMaterial, selectedDetail, selectedColor, selectedModel }));
    }
  }, [selectedColor]);

  useEffect(() => {
    if (selectedColor && colorRefs.current[selectedColor.name]) {
      const container = containerRef.current;
      const selectedElement = colorRefs.current[selectedColor.name];

      const containerWidth = container.offsetWidth;
      const selectedElementLeft = selectedElement.offsetLeft;
      const selectedElementWidth = selectedElement.offsetWidth;

      const scrollCenterPosition = selectedElementLeft + selectedElementWidth / 2 - containerWidth / 2;

      container.scrollTo({
        left: scrollCenterPosition,
        behavior: 'smooth',
      });
    }
  }, [selectedColor]);

  return (
    <motion.div
      {...layoutFadeAnimation}
      key={selectedDetail?.name + selectedMaterial}
      ref={containerRef}
      className={`flex ${
        colors.length < 5 ? 'justify-center' : 'justify-between'
      } items-center m-auto overflow-x-auto gap-6 flex-row p-5 lg:py-6 lg:gap-6 md:w-wrapper no-scrollbar`}
    >
      {colors.map((color, index) =>
        color.name !== null ? (
          <Tooltip key={color.name} title={color.name} placement="top" arrow>
            <button
              style={{ background: !color.texture ? color.hex : 'none' }}
              ref={(element) => (colorRefs.current[color.name] = element)}
              className="min-h-[55px] min-w-[55px] p-1 rounded-full shadow focus:drop-shadow-2md focus:outline-none ring-2 focus:ring-3 ring-grayLight"
              onClick={() => handleColorClick({ img: color.img, name: color.name })}
            >
              {color.texture ? <img src={color.texture} alt={color.name} height={55} width={55} key={index} /> : null}
            </button>
          </Tooltip>
        ) : null
      )}
    </motion.div>
  );
};

export default Colors;
