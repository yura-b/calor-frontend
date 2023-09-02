import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import IconButton from '@mui/material/IconButton/IconButton';
import styles from '@styles/Styles.module.scss';
import { useMediaQuery } from '@react-hook/media-query';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';


const NavigationMenu = ({}) => {
  const navigate = useNavigate();
  const targetElementRef = useRef(null);

  const isMobile = useMediaQuery('(max-width: 640px)');

  const goBack = () => {
    navigate(-1);
  }

  const scrollToElement = () => {
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  };

  useEffect(() => {
    if (isMobile) {
      scrollToElement()
    }
  }, [targetElementRef.current])

  return (
    <div className="w-full bg-custom-turquoise h-10 flex items-center justify-center" ref={targetElementRef}>
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
