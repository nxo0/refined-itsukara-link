import classNames from 'classnames';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { EventMarker } from '../components/app/EventMarker';
import { Layout } from '../components/app/Layout';
import { Skyscraper } from '../components/app/Skyscraper';
import { TimetableController } from '../components/app/TimetableController';
import { Tutorial } from '../components/app/Tutorial';
import { useEvents } from '../components/hooks/useEvents';
import type { TimetableProps } from '../components/ui/Timetable';
import { TimetableProvider } from '../components/ui/Timetable';

const Timetable = dynamic<TimetableProps>(
  () => import('../components/ui/Timetable').then((m) => m.Timetable),
  { ssr: false },
);

const Events = (): JSX.Element => {
  const { data } = useEvents();

  const startAt = data ? dayjs(data.data.events[0].start_date) : dayjs();
  const endAt = data
    ? dayjs(data.data.events[data.data.events.length - 1].end_date)
    : dayjs();

  return (
    <Layout variant="single">
      <Head>
        <title>にじさんじの配信一覧 | Refined Itsukara.link</title>
        <meta
          name="description"
          content="にじさんじライバーの最近の配信の一覧です"
        />
      </Head>
      <TimetableProvider
        startAt={startAt}
        endAt={endAt}
        interval={30}
        scale={5}
        itemHeight={60}
      >
        <div
          className={classNames(
            'absolute', // TODO: separate
            'box-border',
            'flex',
            'top-0',
            'left-0',
            'p-2',
            'w-full',
            'h-full',
            'md:px-6',
            'md:py-4',
            'md:space-x-4',
          )}
        >
          <div className="flex flex-col flex-grow space-y-4">
            <TimetableController />
            <Timetable
              loading={data == null}
              schedules={
                data?.data.events.map((event) => ({
                  startAt: dayjs(event.start_date),
                  endAt: dayjs(event.end_date),
                  node: <EventMarker event={event} />,
                })) ?? []
              }
            />
          </div>
          <Skyscraper />
        </div>
      </TimetableProvider>

      {typeof window !== 'undefined' && <Tutorial />}
    </Layout>
  );
};

export default Events;
