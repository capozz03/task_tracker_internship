import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import styles from './index.module.scss';
import Button from 'features/Tasks/tasksComponents/Button';
import InputNameTask from './InputNameTask';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { Tooltip } from 'antd';

const CheckListFormCreate = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
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
      dispatch(TaskFormSlice.createCheckList({
        title,
      }));
      setTitle('');
    } else {
      setIsVisibleTooltip(true);
    }
  };

  const toggleVisibleForm = () => {
    dispatch(TaskFormSlice.hiddenFormCreateChecklist());
    setIsVisibleTooltip(false);
  };

  return (
    <form className={styles.wrap} onSubmit={newTaskHandler}>
      <div className={styles.formNewTaskWrap}>
        <Tooltip title="Требуется название чек-листа" visible={isVisibleTooltip} placement="bottom" />
        <InputNameTask
          type="text"
          name="inputNewTask"
          value={title}
          onChange={onChange}
          placeholder="Название чек-листа"
        />
        <Button type="primary" htmlType="submit">Сохранить</Button>
        <Button type="default" onClick={toggleVisibleForm}>Отменить</Button>
      </div>
    </form>
  );
};

export default CheckListFormCreate;
