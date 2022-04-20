import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import styles from './index.module.scss';
import Button from 'features/Tasks/tasksComponents/Button';
import InputNameTask from './InputNameTask';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { Tooltip } from 'antd';

type createItemForChecklistProps = {
  checkListId: string,
}

const createItemForChecklist = ({ checkListId }: createItemForChecklistProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.length === 0) {
      setIsVisibleTooltip(true);
    } else {
      setIsVisibleTooltip(false);
    }
  };

  const newTaskHandler:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const titleText = title.replaceAll(' ', '');
    setTitle(titleText);
    if (titleText.length !== 0) {
      dispatch(TaskFormSlice.createItemForChecklist({
        title,
        checkListId,
      }));
      setTitle('');
    } else {
      setIsVisibleTooltip(true);
    }
  };

  const toggleVisibleForm = () => {
    setIsActive((prev) => !prev);
    setIsVisibleTooltip(false);
  };

  return (
    <form className={styles.wrap} onSubmit={newTaskHandler}>
      <div style={isActive ? { display: 'none' } : { display: 'block' }}>
        <button type="button" className={styles.newTaskLabel} onClick={toggleVisibleForm}>+ Добавить новый пункт</button>
      </div>
      <div className={styles.formNewTaskWrap} style={!isActive ? { display: 'none' } : { display: 'flex' }}>
        <Tooltip title="Название обязательно" visible={isVisibleTooltip} placement="bottom" />
        <InputNameTask
          type="text"
          name="inputNewTask"
          value={title}
          onChange={onChange}
          placeholder="Создание пункта списка"
        />
        <Button type="primary" htmlType="submit">Сохранить</Button>
        <Button type="default" onClick={toggleVisibleForm}>Отменить</Button>
      </div>
    </form>
  );
};

export default createItemForChecklist;
