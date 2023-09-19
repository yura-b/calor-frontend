import React, { useRef } from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import styles from '@styles/Styles.module.scss';
import appointmentCheck from '@assets/images/appointment/appointmentCheck.svg';
import heel from '@assets/images/appointment/heel.svg';
import calor from '@assets/images/appointment/calor.svg';
import moment from 'moment';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import { useMediaQuery } from '@react-hook/media-query';
import MainLayout from '@/components/MainLayout';
import Button from '@/components/ui/Button';
import { paths } from '@routes/paths.ts';

const AppointmentPage: React.FC = (): React.ReactElement => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const urlParams = new URLSearchParams(window.location.search);
  function getParameterByName(name) {
    return urlParams.get(name);
  }
  const fullName = getParameterByName('invitee_full_name');
  const startTime = getParameterByName('event_start_time');
  const endTime = getParameterByName('event_end_time');

  const formattedStartTime = moment(startTime).format('MM.DD.YYYY hh:mm A');
  const formattedEndTime = moment(endTime).format('MM.DD.YYYY hh:mm A');

  return (
    <div className="font-poppins h-screen">
      <div>
        <Head title={titles.appointment} />
        <MainLayout>
          <div className=" hidden lg:block lg:mt-4">
            <NavigationLinks color="gray" className=" w-auto" />
          </div>
          {urlParams.size !== 0 ? (
            <div className="flex justify-center items-center lg:min-h-[80vh] h-full uppercase">
              <div className={`${styles.container} m-auto pt-0 mt-2`}>
                <div className="bg-custom-turquoise min-h-[80vh]  lg:min-h-[78vh] m-auto relative shadow-lg rounded-lg mt-3 lg:mt-0">
                  <div className="py-3  w-full bg-transparent lg:bg-mint sticky lg:top-0  h-[50px] rounded-t-lg">
                    <h1 className={`${styles.header2} text-white text-center uppercase`}>Appointment</h1>
                  </div>
                  <img src={heel} className="absolute top-[12%] left-1/2 transform -translate-x-1/2" />
                  <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 lg:min-w-[500px] w-full px-4 flex flex-col items-center">
                    <h2 className={`${styles.header2} normal-case mb-[30px]`}>Congratulations!</h2>
                    <img src={appointmentCheck} className="block max-w-[50px] mb-[30px]" />
                    <p className={`${styles.body2} normal-case text-center `}>
                      <span className="font-bold">{fullName ? fullName + ',' : ''}</span> {fullName ? 'your' : 'Your'}{' '}
                      appointment is scheduled {formattedStartTime && formattedEndTime ? 'for' : ''} <br />
                      <span className="font-semibold text-[15px]">
                        {formattedStartTime && formattedEndTime ? formattedStartTime + '-' + formattedEndTime : ''}
                      </span>
                    </p>
                    <p className={`${styles.body2} normal-case font-bold mt-2`}>See You</p>
                    <img src={calor} className="max-w-[100%] lg:w-[300px] mt-[100px]" />
                    <Button to={paths.home} color="gray" className="w-full mt-20">
                      Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center relative">
              <h1 className={`${styles.header2}  top-4 text-gray  uppercase mt-10`}>Appointment</h1>
              <div className="z-6 relative px-0  sm:p-0 w-full ">
                <iframe
                  ref={iframeRef}
                  src="https://calendly.com/magic-0ba?background_color=b8e4d8&text_color=4e4e4d&primary_color=e22d21"
                  frameBorder="0"
                  style={{ width: '100%', height: '100%', minHeight: isMobile ? '60vh' : '80vh' }}
                ></iframe>
              </div>
            </div>
          )}
        </MainLayout>
      </div>
    </div>
  );
};

export default AppointmentPage;
