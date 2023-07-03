import React from 'react';
import homeMainImg from '@assets/images/homeMainImg.svg';
import homeSemiCircle from '@assets/images/homeSemiCircle.svg';
import Button from '@components/ui/Button';
import { Link } from 'react-router-dom';

const HomeMainContent: React.FC = (): React.ReactElement => {
  const processArr = [
    {
      title: 'DESIGN',
      content: 'Make a unique design of your shoes with the help of an online designer.',
    },
    {
      title: 'MANUFACTURE',
      content: 'We produce shoes according to your design and foot sizes in 5-7 working days.',
    },
    {
      title: 'DELIVERY',
      content: 'We pack and send your calories to the nearest post office in the world..',
    },
  ];
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className="w-full h-screen bg-custom-red relative">
      <div className="flex w-full justify-around flex-wrap items-center relative z-10 lg:max-w-5xl mx-auto">
        <div className="flex basis-full lg:basis-2/3 grow pl-10 items-center gap-4 grow">
          <p className="text-4xl font-black text-white text-right leading-tight basis-1/2">DESIGN YOUR OWN SHOE</p>
          <img src={homeMainImg} className="basis-1/2 max-w-xs md:max-w-sm lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl" />
        </div>
        <p className="text-4xl font-black text-custom-turquoise basis-1/3 leading-tight text-center grow hidden lg:block">
          {'IT’S SIMPLY AS 1  >  2 >   3'}
        </p>
        <p className="text-4xl font-black text-custom-turquoise text-center leading-tight basis-1/3 grow lg:hidden">
          {'IT’S SIMPLY AS'}
        </p>
      </div>
      <div className="w-full bg-custom-turquoise text-center px-6">
        <p className="text-4xl font-black bg-custom-turquoise text-center leading-tight text-custom-red w-full lg:hidden">
          {'1  >  2 >    3'}
        </p>
        <div className="flex flex-col justify-around lg:flex-row my-6 lg:max-w-5xl mx-auto lg:py-10">
          {processArr.map((action, index) => (
            <div className="text-gray text-left w-auto max-w-sm">
              <p className="text-2xl font-black">
                <span className="text-custom-red">{index + 1}&gt; </span>
                <span>{action.title}</span>
              </p>
              <p className="text-base ml-10 my-2">{action.content}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-around lg:flex-row my-6 lg:max-w-5xl mx-auto lg:py-10 text-left text-gray">
          <p className="text-2xl font-black text-white ">CALOR BY YOU</p>
          <div>
            <p className="font-black">
              Create your own sneakers and bag with a unique design that reflects your personality and style.
            </p>
            <p>
              Learn how to do it in our
              <span>
                <Link to="" className="font-bold border-b-2 border-gray my-4 mx-auto text-center w-max">
                  Video Guide
                </Link>
              </span>
            </p>
          </div>
          <div>
            <Button color="red" onClick={handleClick}>
              Design Your Shoe
            </Button>
            <Button color="mintExtraLight" onClick={handleClick}>
              Design Your Bag
            </Button>
          </div>
          <Link to="" className="font-bold border-b-2 border-gray my-4 mx-auto text-center w-max lg:hidden">
            Video Guide
          </Link>
        </div>
        <img src={homeSemiCircle} className="absolute z-1 top-10 left-0" />
      </div>
    </div>
  );
};

export default HomeMainContent;
