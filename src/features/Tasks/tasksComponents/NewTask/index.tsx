import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import styles from './index.module.scss';
import Button from '../Button';
import InputNameTask from './InputNameTask';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { createNewTaskAsync as createNewTaskInWorkAsync } from 'store/slice/task/taskInWork';
import { createNewTaskAsync as createNewTaskInboxAsync } from 'store/slice/task/taskInbox';
import { TaskStatuses } from 'shared/helpers/enums';

const NewTask = ({ taskStatusId }: { taskStatusId: string }) => {
  const dispatch = useDispatch();
  const [nameTask, setNameTask] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameTask(e.target.value);
    if (e.target.value.length === 0) {
      setIsVisibleTooltip(true);
    } else {
      setIsVisibleTooltip(false);
    }
  };

  const newTaskHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    let taskTitle = nameTask.trim();
    while (taskTitle.includes('  ')) {
      taskTitle = taskTitle.replaceAll('  ', ' ');
    }
    if (taskTitle.length !== 0) {
      if (taskStatusId === TaskStatuses.IN_WORK) {
        dispatch(
          createNewTaskInWorkAsync({
            task_status_id: taskStatusId,
            title: taskTitle,
          }),
        );
      }
      if (taskStatusId === TaskStatuses.CREATED) {
        dispatch(
          createNewTaskInboxAsync({
            task_status_id: taskStatusId,
            title: taskTitle,
          }),
        );
      }
      setNameTask('');
    } else {
      setIsVisibleTooltip(true);
    }
  };

  const toggleVisibleForm = () => {
    setIsActive((prev) => !prev);
    setIsVisibleTooltip(false);
    setNameTask('');
  };

  return (
    <form className={styles.wrap} onSubmit={newTaskHandler}>
      <div style={isActive ? { display: 'none' } : { display: 'block' }}>
        <button type="button" className={styles.newTaskLabel} onClick={toggleVisibleForm}>
          + новая задача
        </button>
      </div>
      <div className={styles.formNewTaskWrap} style={!isActive ? { display: 'none' } : { display: 'flex' }}>
        <Tooltip title="Название обязательно" visible={isVisibleTooltip} placement="bottom" getPopupContainer={() => document.querySelector('.ant-layout') as HTMLElement} />
        <InputNameTask
          type="text"
          name="inputNewTask"
          value={nameTask}
          onChange={onChange}
          placeholder="Введите название задачи"
        />
        <div className={styles.btnBlock}>
          <Button type="primary" htmlType="submit">Сохранить</Button>
          <Button type="default" onClick={toggleVisibleForm}>Отменить</Button>
        </div>
      </div>
    </form>
  );
};

export default NewTask;
