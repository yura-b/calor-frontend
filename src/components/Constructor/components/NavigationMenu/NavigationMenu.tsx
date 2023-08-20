import { useNavigate, useLocation } from 'react-router-dom';
import styles from '@/styles/Styles.module.scss';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { setSelectedModel, setSelectedDetail, setSelectedMaterial } from '@/store/reducers/constructor/SelectedShoePartsReducer';
import { IconButton } from "@mui/material";
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';


const NavigationMenu = ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Get model name from url
    const path = location.pathname;
    const pathSegments = path.split('/').filter(segment => segment !== '');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const models = ['dayger', 'sunrise', 'yolo'];
    const currentIndex = models.indexOf(lastSegment);

    const goBack = () => {
        if (currentIndex === 0) {
            dispatch(setSelectedModel(models.length - 1));
            dispatch(setSelectedDetail('part01'));
            navigate(`../${models[models.length - 1]}`);
        }
        if (currentIndex > 0) {
            dispatch(setSelectedModel(models[currentIndex - 1]));
            dispatch(setSelectedDetail('part01'));
            navigate(`../${models[currentIndex - 1]}`);
        }

    };

    const goNext = () => {
        if (currentIndex === models.length - 1) {
            dispatch(setSelectedModel(models[0]));
            dispatch(setSelectedDetail('part01'));
            navigate(`../${models[0]}`);
        }
        if (currentIndex < models.length - 1) {
            dispatch(setSelectedModel(models[currentIndex + 1]));
            dispatch(setSelectedDetail('part01'));
            navigate(`../${models[currentIndex + 1]}`);
        }
    };

    return (
        <div className="w-full bg-custom-turquoise h-10 flex items-center justify-center">
            <div className={`flex flex-row justify-between items-center w-wrapper`}>
                <IconButton onClick={goBack}>
                    <ReactSVG
                        src={leftArrowIcon}
                        beforeInjection={(svg) => {
                            svg.classList.add('icon');
                            svg.setAttribute('stroke', '#404040');
                        }}
                    />
                </IconButton>
                <div className="capitalize">
                    <span className="text-gray">Model {lastSegment}</span>
                </div>
                <IconButton onClick={goNext}>
                    <ReactSVG
                        src={rightArrowIcon}
                        beforeInjection={(svg) => {
                            svg.classList.add('icon');
                            svg.setAttribute('stroke', '#404040');
                        }}
                    />
                </IconButton>
            </div>
        </div>
    )
}

export default NavigationMenu;