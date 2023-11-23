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
        <div className="flex items-center">
          {/* <VideoGuideLink
            className="text-gray underline"
            srcWebm={'1SQKSw80FbYOuB3DVwChePYTz6gxkWVC9'}
            srcMp4={'10D7QoQ_F0DzHEzwDZ-OtaZjJArOmnrJn'}
            srcMov={'1zGoyjI4UI8-t-AnUyVJFyoiM7ckNtL9y'}
            showVideoIcon={true}
          /> */}
          <VideoGuideLink
            className="text-gray underline"
            srcMp4={'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/gid_2.mp4'}
            showVideoIcon={true}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
