import React, { ChangeEvent, useState } from 'react';
import styles from './index.module.scss';
import Button from '../Button';
import InputNameTask from './InputNameTask';
import { useDispatch } from 'react-redux';
import { createNewTaskAsync as createNewTaskInWorkAsync } from 'store/slice/task/taskInWork';
import { createNewTaskAsync as createNewTaskInboxAsync } from 'store/slice/task/taskInbox';
import { TaskStatuses } from 'shared/helpers/enums';

const NewTask = ({ taskStatusId }: { taskStatusId: string }) => {
  const dispatch = useDispatch();
  const [nameTask, setNameTask] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameTask(e.target.value);
  };

  const newTaskHandler = () => {
    if (taskStatusId === TaskStatuses.IN_WORK) {
      dispatch(
        createNewTaskInWorkAsync({
          task_status_id: taskStatusId,
          title: nameTask,
        }),
      );
    }
    if (taskStatusId === TaskStatuses.CREATED) {
      dispatch(
        createNewTaskInboxAsync({
          task_status_id: taskStatusId,
          title: nameTask,
        }),
      );
    }
    setNameTask('');
  };

  const toggleVisibleForm = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <form className={styles.wrap}>
      <div style={isActive ? { display: 'none' } : { display: 'block' }}>
        <button type="button" className={styles.newTaskLabel} onClick={toggleVisibleForm}>
          + новая задача
        </button>
      </div>
      <div
        className={styles.formNewTaskWrap}
        style={!isActive ? { display: 'none' } : { display: 'flex' }}
      >
        <InputNameTask
          type="text"
          name="inputNewTask"
          value={nameTask}
          onChange={onChange}
          placeholder="Введите название задачи"
        />
        <Button type="primary" onClick={newTaskHandler}>
          Сохранить
        </Button>
        <Button type="default" onClick={toggleVisibleForm}>
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default NewTask;
