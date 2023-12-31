import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDetail } from '@/store/reducers/constructor/SelectedShoePartsReducer';
import styles from '@styles/Styles.module.scss';

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
  const { selectedDetail } = useSelector((state) => state.selectedShoeParts);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const materialRefs = useRef({});

  const handleDetailClick = (detailPart) => {
    dispatch(setSelectedDetail(detailPart));
  };

  useEffect(() => {
    if (selectedDetail.part && materialRefs.current[selectedDetail.part]) {
      const container = containerRef.current;
      const selectedElement = materialRefs.current[selectedDetail.part];

      const containerWidth = container.offsetWidth;
      const selectedElementLeft = selectedElement.offsetLeft;
      const selectedElementWidth = selectedElement.offsetWidth;

      const scrollCenterPosition = selectedElementLeft + selectedElementWidth / 2 - containerWidth / 2;

      container.scrollTo({
        left: scrollCenterPosition,
        behavior: 'smooth',
      });
    }
  }, [selectedDetail]);

  return (
    <>
      <div
        ref={containerRef}
        className={`flex justify-between items-start m-auto overflow-x-auto gap-6 flex-row p-5 lg:py-6 lg:gap-6 xl:w-wrapper no-scrollbar`}
      >
        {details.map((detail) => {
          return (
            <div
              className="min-h-[70px] justify-center items-center flex flex-col cursor-pointer"
              onClick={() => handleDetailClick({ part: detail.part, name: detail.name })}
            >
              <div
                ref={(element) => (materialRefs.current[detail.part] = element)}
                className={`flex items-center justify-center w-20 h-20 rounded-full ${
                  selectedDetail.part === detail.part ? 'bg-grayLight' : 'bg-grayExtraLight'
                }`}
              >
                <img src={detail.image} alt={detail.name} />
              </div>
              <span className={`inline-block text-center ${selectedDetail.part === detail.part ? 'font-bold' : ''}`}>
                {detail.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Details;
