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
  // const currentTask = useSelector(CommonSlice.getTaskDropdownMenuSelector);
  // const [visibleModal, setVisibleModal] = useState(false);
  // const [isLoadingModal, setIsLoadingModal] = useState(false);

  const openTask = () => {
    if (task.task_id) {
      dispatch(getTaskByIdAsync(task.task_id));
    }
  };

  const duplicateResolvedHandle = () => {
    alert('Задача успешно скопирована', 'success');
  };

  const duplicateRejectedHandle = () => {
    alert('Ошибка во время создание копии задачи', 'error');
  };

  // const deleteResolvedHandle = () => {
  //   alert(`Задача ${titleTask.slice(0, 25)}${titleTask.length > 25 ? '...' : ''}
  //   удалена`, 'remove');
  //   setIsLoadingModal(false);
  //   setVisibleModal(false);
  // };
  //
  // const deleteRejectedHandle = () => {
  //   alert('Во время удаления задачи произошла ошибка', 'error');
  //   setIsLoadingModal(false);
  // };

  const duplicateHandle = () => {
    // setIsLoadingModal(true);
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
    // setIsLoadingModal(true);
    if (task.task_id) {
      dispatch(
        CommonSlice.deleteTaskAsync({
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

  const dropdownClick = () => {
    dispatch(CommonSlice.setTask(task));
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
        dropdownClick();
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
