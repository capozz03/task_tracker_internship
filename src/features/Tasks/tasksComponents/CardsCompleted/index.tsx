import React, { useEffect, useState } from 'react';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import { CardCompleted } from './CardCompleted';
import { tags, user } from './data';
import style from './index.module.scss';

export const CardsCompleted = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className={style.cardCompleted}>
      <div className={style.container}>
        <div className={style.cardCompletedTitle}>
          <div className={style.title}>Завершено</div>
          {windowWidth >= 768 ? <SortByPCScreen /> : <SortByMobileScreen />}
        </div>
        <CardCompleted user={user} tags={tags} />
      </div>
    </div>
  );
};
