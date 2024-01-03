import { FC, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedColor } from '@/store/reducers/constructor/SelectedShoePartsReducer';
import { updateParts } from '@/store/reducers/constructor/ShoesConstructorReducer';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@/styles/Animations';
import { useNavigate } from 'react-router';
import constants from '@/constants/constants';
import { useMediaQuery } from '@react-hook/media-query';

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

const Colors: FC<IProps> = ({ details, shoesDetailsFromApi }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const isDetailAvailable =
    shoesDetailsFromApi &&
    (shoesDetailsFromApi?.find((item) => item?.title === selectedDetail.name) || shoesDetailsFromApi[0]);
  const isMaterialAvailable = isDetailAvailable?.materials?.find((item) => item?.title === selectedMaterial)?.available;

  useEffect(() => {
    const model = selectedModel.toLowerCase();
    const detailName = selectedDetail?.name.toLowerCase();
    const material = selectedMaterial?.toLowerCase();
    if (model === 'dayger' && detailName === 'lining') {
      const id = material === 'fur' ? constants.DAYGER_WINTER_ID : constants.DAYGER_ID;
      navigate(`/design_your_shoe/model/dayger/${id}`);
    }

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

  const [isTooltipOpen, setTooltipOpen] = useState<string | null>(null);

  const handleColorInteraction = (colorName: string, eventType: 'click' | 'hover', isOpen: boolean) => {
    if (eventType === 'click') {
      setTooltipOpen(isOpen ? colorName : null);
    } else if (eventType === 'hover') {
      setTooltipOpen(isOpen ? colorName : null);
    }
  };

  const isMobile = useMediaQuery('(max-width: 1023px)');
  return (
    <motion.div
      {...layoutFadeAnimation}
      key={selectedDetail?.name + selectedMaterial}
      ref={containerRef}
      className={`flex ${
        colors.length < 5 ? 'justify-center' : 'justify-between'
      } items-center m-auto overflow-x-auto gap-6 flex-row p-5 lg:py-6 lg:gap-6 md:w-wrapper no-scrollbar  `}
    >
      {colors.map((color, index) =>
        color.name !== null ? (
          <span key={color.name}>
            <Tooltip
              open={isTooltipOpen === color.name}
              title={color.name}
              placement={isMobile ? 'bottom' : 'top'}
              arrow
            >
              <button
                style={{ background: !color.texture ? color.hex : 'none' }}
                ref={(element) => (colorRefs.current[color.name] = element)}
                className={`min-h-[55px] min-w-[55px] rounded-full shadow focus:drop-shadow-2md focus:outline-none ring-2 focus:ring-3 ring-grayLight ${
                  !isMaterialAvailable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleColorClick({ img: color.img, name: color.name })}
                onMouseEnter={() => handleColorInteraction(color.name, 'hover', true)}
                onMouseLeave={() => handleColorInteraction(color.name, 'hover', false)}
                onTouchStart={() => handleColorInteraction(color.name, 'click', true)}
                onTouchEnd={() => handleColorInteraction(color.name, 'click', false)}
                disabled={!isMaterialAvailable}
              >
                {color.texture ? <img src={color.texture} alt={color.name} height={55} width={55} key={index} /> : null}
              </button>
            </Tooltip>
          </span>
        ) : null
      )}
    </motion.div>
  );
};

export default Colors;
