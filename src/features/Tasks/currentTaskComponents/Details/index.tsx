import React from 'react';
import styles from './index.module.scss';
import { PriorityStatus, TaskStatus } from 'features/Tasks/tasksComponents';
import { useSelector } from 'react-redux';
import { TaskFormSlice } from 'store/slice';

const Details = () => {
  const task = useSelector(TaskFormSlice.getTask);

  const statusHandler = () => {};

  if (task) {
    return (
      <div className={styles.container}>
        <div className={styles.item}>
          <span className={styles.itemTitleText}>Статус</span>
          <span>
            <TaskStatus defaultValue={task.status.name} onChange={statusHandler} />
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemTitleText}>Срок</span>
          <span>Какая-то дата</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemTitleText}>Метка</span>
          <span>Какие-то теги</span>
          <span>Добавить еще чо-нить</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemTitleText}>Приоритет</span>
          <span>
            <PriorityStatus type={task.priority?.name} />
          </span>
        </div>
      </div>
    );
  }
  return <>Ошибка в получении таски</>;
};

export default Details;
