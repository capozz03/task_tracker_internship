import React, { useEffect } from 'react';
import { Dropdown, Menu, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CommonSlice, TaskFormSlice } from 'store/slice';
import { TTask } from 'store/slice/task/taskForm';
import { DropdownMoreButton } from 'shared/ui/icons';
import { alert } from 'shared';
import styles from './index.module.scss';

type DropdownMenuProps = {
  task: TTask;
};

const DropdownMenu = ({ task }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();
  const startDelete = useSelector(CommonSlice.isLoadingCommonActionTask);

  useEffect(() => {
    if (startDelete) dispatch(TaskFormSlice.hiddenTaskForm());
  }, [startDelete]);

  const duplicateResolvedHandle = () => {
    alert(`Дубль задачи "${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}"
    успешно создан`, 'success');
  };

  const duplicateRejectedHandle = () => {
    alert(`Ошибка копирования задачи "${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}"`, 'error');
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

  const duplicateAndEditHandle = async () => {
    if (task.task_id) {
      dispatch(
        CommonSlice.duplicateTaskAsync({
          data: {
            taskId: task.task_id,
            taskStatusId: task.status.task_status_id,
          },
          resolvedHandle: duplicateResolvedHandle,
          rejectedHandle: duplicateRejectedHandle,
          openTask: true,
        }),
      );
    }
  };

  const menu = (
    <Menu className={styles.dropdownMenu}>
      <Item key="1" onClick={duplicateHandle}>
        Дублировать задачу
      </Item>
      <Item key="2" onClick={duplicateAndEditHandle}>
        Дублировать и редактировать задачу
      </Item>
      <Item key="3" onClick={deleteTaskHandle} className={styles.delete}>
        Удалить задачу
      </Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
    >
      <Tooltip title="Действия с задачей">
        <button type="button" className={styles.button}>
          <DropdownMoreButton className={styles.icon} />
        </button>
      </Tooltip>
    </Dropdown>
  );
};

export default DropdownMenu;
