import React from 'react';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import { CardCompleted } from './CardCompleted';
import { tags, user } from './data';
import style from './index.module.scss';

export const CardsCompleted = () => {
  const isMobile = useBreakPoint(768);

  return (
    <div className={style.cardCompleted}>
      <div className={style.container}>
        <div className={style.cardCompletedTitle}>
          <div className={style.title}>Завершено</div>
          {isMobile ? <SortByMobileScreen /> : <SortByPCScreen />}
        </div>
        <CardCompleted user={user} tags={tags} />
      </div>
    </div>
  );
};
