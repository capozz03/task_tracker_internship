import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import React from 'react';
import style from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CommonSlice } from 'store/slice';
import { alert } from '../Alert';

const ModalDeleteTask = () => {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(CommonSlice.isVisibleModalDeleteTaskSelector);
  const isLoading = useSelector(CommonSlice.isLoadingCommonActionTask);
  const task = useSelector(CommonSlice.getTaskDropdownMenuSelector);
  const deleteResolvedHandle = () => {
    if (task) {
      alert(`Задача "${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}"
    удалена`, 'remove');
    }
  };
  const deleteRejectedHandle = () => {
    if (task) {
      alert(`Ошибка удаления задачи ${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}`, 'error');
    }
  };
  const cancelClick = () => {
    dispatch(CommonSlice.clearState());
  };
  const okClick = () => {
    if (task) {
      dispatch(
        CommonSlice.deleteTaskAsync({
          data: {
            taskId: task.task_id,
            taskStatusId: task.status.task_status_id,
          },
          resolvedHandle: deleteResolvedHandle,
          rejectedHandle: deleteRejectedHandle,
        }),
      );
    }
  };

  return (
    <Modal
      className={style.modalDelete}
      title=""
      centered
      visible={isVisibleModal}
      footer={null}
      onCancel={cancelClick}
      onOk={okClick}
    >
      <Spin spinning={isLoading}>
        <h4 className={style.title}>Вы уверены?</h4>
        <p className={style.text}>{ task && `Задача "${task.title.slice(0, 25)}${task.title.length > 25 ? '...' : ''}" будет безвозвратно удалена`}</p>
        <div className={style.wrapperButtons}>
          <Button className={style.deleteBtn} icon={<DeleteOutlined />} onClick={okClick}>
            Удалить задачу
          </Button>
          <Button className={style.cancelBtn} onClick={cancelClick}>
            Отменить
          </Button>
        </div>
      </Spin>
    </Modal>);
};

export default ModalDeleteTask;
