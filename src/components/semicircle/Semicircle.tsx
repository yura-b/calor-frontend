import dot from '@assets/images/circle/dot.png';
import circle from '@assets/images/circle/circle.png';

const Semicircle = () => {
  return (
    <div className="flex flex-col w-auto items-baseline absolute">
      <img src={dot} alt={''} className={'h-full'} />
      <img src={circle} alt={''} className={'h-full'} />
    </div>
  );
};

export default Semicircle;
