import { FC, useRef, useState, useEffect } from "react";
import { useSelector } from 'react-redux';

interface IProps {
    model: string;
}

const MainView: FC<IProps> = ({ model }) => {

    const [parentHeight, setParentHeight] = useState(0);
    const [imageOnLoad, setImageOnLoad] = useState<boolean>(true);

    const { view1 } = useSelector(state => state.shoesConstructor[model]);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleImageOnLoad = () => {
        setImageOnLoad(false);
    }

    useEffect(() => {
        if (imageRef.current) {
            const imageHeight = imageRef.current.clientHeight;
            setParentHeight(imageHeight);
        }
    }, [imageOnLoad]);

    useEffect(() => {
        const updateParentHeight = () => {
            if (imageRef.current) {
                const imageHeight = imageRef.current.clientHeight;
                setParentHeight(imageHeight);
            }
        };

        updateParentHeight();

        window.addEventListener('resize', updateParentHeight);

        return () => {
            window.removeEventListener('resize', updateParentHeight);
        };
    }, []);

    return (
        <>
            <div style={{ height: parentHeight }} className='flex justify-center align-center mt-10 mb-2 mr-4 ml-4 relative'>
                <>
                    {Object.values(view1).map((src, index, array) => (
                        <img
                            key={index}
                            src={src}
                            className={`absolute ${index === array.length - 1 ? 'z-[-30]' : index === array.length - 2 ? 'z-[-20]' : 'z-[-10]'}`}
                            style={{ marginRight: '5%', marginLeft: '5%' }}
                            {...(index === array.length - 1 ? { onLoad: () => handleImageOnLoad() } : {})}
                            ref={index === 0 ? imageRef : null}
                        />
                    ))}
                </>
            </div>
        </>
    );
}

export default MainView;