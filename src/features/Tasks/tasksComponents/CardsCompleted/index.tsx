import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { CompletedTaskSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import CardCompleted from './CardCompleted';
import style from './index.module.scss';

const CardsCompleted = () => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(CompletedTaskSlice.getTasks);

  useEffect(() => {
    dispatch(
      CompletedTaskSlice.getTasksAsync({
        page: 1,
        per_page: 3,
      }),
    );
  }, []);

  return (
    <div className={style.cardCompleted}>
      <div className={style.container}>
        <div className={style.cardCompletedTitle}>
          <div className={style.title}>Завершено</div>
          {isMobile ? <SortByMobileScreen /> : <SortByPCScreen />}
        </div>
        {tasks && tasks.map((task) => (
          <CardCompleted key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default CardsCompleted;
