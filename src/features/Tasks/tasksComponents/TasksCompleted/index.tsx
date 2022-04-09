import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakPoint } from 'shared/helpers/hooks/useBreakPoint';
import { TaskCompletedSlice } from 'store/slice';
import { SortByMobileScreen, SortByPCScreen } from '../SortBy';
import TaskCompleted from './TaskCompleted';
import style from './index.module.scss';

const TasksCompleted = () => {
  const isMobile = useBreakPoint(768);
  const dispatch = useDispatch();
  const tasks = useSelector(TaskCompletedSlice.getTasks);

  useEffect(() => {
    dispatch(
      TaskCompletedSlice.getTasksAsync({
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
          <TaskCompleted key={task.task_id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksCompleted;
