import { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import NavigationLinks from '@/components/MainLayout/components/Header/components/NavigationLinks';
import styles from '@/styles/Styles.module.scss';
import { useParams } from 'react-router';
import { getEventById, getEvents } from '@/api/manager/event';
import Loader from '@components/ui/Loader';
import Aside from './components/Aside';
import EventArticle from './components/EventArticle';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([getEventById(id), getEvents()])
      .then(([eventByIdResponse, eventsResponse]) => {
        setEvent(eventByIdResponse.data);
        setEvents(eventsResponse.data);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <div className="font-poppins h-screen text-gray">
        <MainLayout>
          <div className="hidden lg:block lg:mt-4 lg:mb-2">
            <NavigationLinks color="gray" className="w-auto" />
          </div>
          <div className={styles.container}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="flex gap-10">
                  <div className="w-8/12">
                    <EventArticle article={event} />
                  </div>
                  <div className="w-4/12 p-10 bg-mintExtraLight">
                    <Aside events={events} />
                  </div>
                </div>
              </>
            )}
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default EventPage;
