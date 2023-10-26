import { FC } from 'react';
import styles from '@/styles/Styles.module.scss';
import { useNavigate } from 'react-router';
import { ReactSVG } from 'react-svg';
import IconButton from '@mui/material/IconButton/IconButton';
import leftArrowIcon from '@/assets/images/leftArrowIcon.svg';
interface IProps {
  isArrowBack?: boolean;
  title: string;
  background?: 'transparent';
  setShowMeasureForm: React.Dispatch<React.SetStateAction<boolean>>;
  showMeasureForm: boolean;
}

const MeasurementHeader: FC<IProps> = ({
  isArrowBack = false,
  title,
  background = 'transparent',
  setShowMeasureForm,
  showMeasureForm,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (showMeasureForm) {
      setShowMeasureForm(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={`w-full 
      h-[5vh]
      mb-4
      flex
      justify-between
      items-center
      bg-${background}`}
    >
      {isArrowBack && (
        <IconButton
          sx={{
            padding: 0,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
            '&.MuiButtonBase-root:checked': {
              bgcolor: 'transparent',
            },
          }}
          onClick={goBack}
        >
          <ReactSVG
            src={leftArrowIcon}
            beforeInjection={(svg) => {
              svg.classList.add('icon');
              svg.setAttribute('stroke', '#404040');
            }}
          />
        </IconButton>
      )}
      <span className={`m-auto ${styles.header1}`}>{title}</span>
    </div>
  );
};

export default MeasurementHeader;
