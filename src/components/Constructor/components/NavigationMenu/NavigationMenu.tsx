import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import IconButton from '@mui/material/IconButton/IconButton';
import styles from '@styles/Styles.module.scss';

import leftArrowIcon from '@assets/images/leftArrowIcon.svg';


const NavigationMenu = ({}) => {
  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="w-full bg-custom-turquoise h-10 flex items-center justify-center">
      <div className={`flex flex-row justify-between items-center ${styles.wrapper}`}>
        <IconButton onClick={goBack} style={{ padding: 0 }}>
          <ReactSVG
            src={leftArrowIcon}
            beforeInjection={(svg) => {
              svg.classList.add('icon');
              svg.setAttribute('stroke', '#404040');
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default NavigationMenu;
