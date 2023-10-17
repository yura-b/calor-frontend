import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import IconButton from '@mui/material/IconButton/IconButton';
import styles from '@styles/Styles.module.scss';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';
import VideoGuideLink from '@components/VideoGuideLink';

const NavigationMenu = ({}) => {
  const navigate = useNavigate();
  const targetElementRef = useRef(null);

  const goBack = () => {
    navigate(-1);
  };

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
        <div>
          <VideoGuideLink
            className="text-gray"
            src="https://drive.google.com/file/d/1f81GlGWzVE5LRmEqKjmBBxHPlwbaC_-e/view?usp=sharing"
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
