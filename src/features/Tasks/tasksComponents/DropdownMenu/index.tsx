import React from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { CommonSlice } from 'store/slice';
import { getTaskByIdAsync, TTask } from 'store/slice/task/taskForm';
import { alert } from 'shared';

type DropdownMenuProps = {
  task: TTask;
};

const DropdownMenu = ({ task }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();

  const openTask = () => {
    if (task.task_id) {
      dispatch(getTaskByIdAsync(task.task_id));
    }
  };

  const duplicateResolvedHandle = () => {
    alert(`Дубль задачи ${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}
    успешно создан`, 'success');
  };

  const duplicateRejectedHandle = () => {
    alert(`Ошибка копирования задачи ${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}`, 'error');
  };

  const duplicateHandle = () => {
    if (task.task_id) {
      dispatch(
        CommonSlice.duplicateTaskAsync({
          data: {
            taskId: task.task_id,
            taskStatusId: task.status.task_status_id,
          },
          resolvedHandle: duplicateResolvedHandle,
          rejectedHandle: duplicateRejectedHandle,
        }),
      );
    }
  };
  const deleteTaskHandle = () => {
    dispatch(CommonSlice.showModalForDeleteTask(task));
  };

  const menu = (
    <Menu className={style.dropdownMenu}>
      <Item key="1" onClick={openTask}>
        Открыть задачу
      </Item>
      <Item key="2" onClick={duplicateHandle}>
        Дублировать задачу
      </Item>
      <Item key="3" onClick={deleteTaskHandle} className={style.delete}>
        Удалить задачу
      </Item>
    </Menu>
  );

  return (
    <div
      onKeyDown={(e) => e.preventDefault()}
      role="button"
      tabIndex={-1}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown.Button
        className={style.dropdownButton}
        overlay={menu}
        icon={<EllipsisOutlined className={style.dropdownIcon} />}
        destroyPopupOnHide
        trigger={['click']}
      />
    </div>
  );
};

export default DropdownMenu;
