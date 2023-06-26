import circle from '../../assets/images/circle/Union.png';

const Semicircle = ({ position }) => {
  return (
    <div className={`flex flex-col w-auto items-baseline absolute ${position} h-40`}>
      <img src={circle} alt={''} className={'h-full'} />
    </div>
  );
};

export default Semicircle;
