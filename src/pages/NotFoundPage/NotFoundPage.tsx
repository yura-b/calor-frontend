import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import Button from '@/components/ui/Button';
import { paths } from '@routes/paths.ts';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const NotFoundPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-full min-h-screen">
      <Head title={titles.notFound} />
      <MainLayout>
        <div className=" flex flex-col justify-center items-center min-h-[50vh]">
          <h1 className="text-gray lg:text-[60px] font-bold sm:text-[50px] text-[40px] uppercase xl:mt-[5vw]">
            404 - Not Found
          </h1>
          <Button to={paths.home} color="gray" className="max-w-[300px] block mt-10">
            Home{' '}
            <span className="ml-4">
              <HomeRoundedIcon />
            </span>
          </Button>
        </div>
      </MainLayout>
    </div>
  );
};

export default NotFoundPage;
