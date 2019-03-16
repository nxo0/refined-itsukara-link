import React, { useMemo } from 'react';
import { Event } from 'shared/entities/event';
import { styled, css } from 'client/ui/styles';
import * as querystring from 'querystring';
import { getThumbnailImageUrl } from 'client/ui/helpers/get-thumbnail-image-url';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export interface EventCard {
  event: Event;
}

interface WrapperProps {
  isStreaming: boolean;
}

export const Thumbnail = styled.div`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 112px;
  height: 63px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.borderNormal};
  background-position: center;
  background-size: cover;
`;

export const Wrapper = styled.a<WrapperProps>`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  opacity: ${({ isStreaming }) => (isStreaming ? 1 : 0.5)};

  &:hover {
    text-decoration: none;
  }

  ${({ isStreaming }) =>
    isStreaming &&
    css`
      ${Thumbnail}::after {
        content: '';
        display: block;
        position: absolute;
        /* ↓ negate((width / 2) + border-width) */
        top: -9px;
        right: -9px;
        width: 12px;
        height: 12px;
        border: 3px solid ${({ theme }) => theme.backgroundNormal};
        border-radius: 50%;
        background-color: ${({ theme }) => theme.highlightNormal};
      }
    `}
`;

export const Meta = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const Title = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.foregroundNormal};
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.time`
  color: ${({ theme }) => theme.foregroundLight};
`;

export const EventCard = (props: EventCard) => {
  const { event } = props;
  const { t } = useTranslation();

  const thumbnailImageUrl = useMemo(() => {
    const videoId = querystring.parse(event.url.split('?')[1]).v as string;
    return getThumbnailImageUrl(videoId);
  }, [event]);

  const textForScreenReader = useMemo(() => {
    return event.name + ' ' + event.liver.name + ' ' + event.description;
  }, [event]);

  const isStreaming = useMemo(
    () =>
      (dayjs(event.start_date).isBefore(dayjs()) ||
        dayjs(event.start_date).isSame(dayjs())) &&
      dayjs(event.end_date).isAfter(dayjs()),
    [],
  );

  return (
    <Wrapper
      href={event.url}
      target="__blank"
      rel="norefferer"
      title={event.name}
      tabIndex={0}
      aria-label={textForScreenReader}
      isStreaming={isStreaming}
    >
      <Thumbnail style={{ backgroundImage: `url(${thumbnailImageUrl})` }} />

      <Meta>
        <Title>{event.name}</Title>
        <Time dateTime={event.start_date}>
          {t('event_card.date', {
            defaultValue: 'Streaming on {{ value, fromNow }}',
            value: event.start_date,
          })}
        </Time>
      </Meta>
    </Wrapper>
  );
};
