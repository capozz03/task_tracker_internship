import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import React from 'react';
import style from './index.module.scss';

const ModalDeleteTask = () => {
  // isVisibleModal={visibleModal}
  // cancelClick={() => setVisibleModal(false)}
  // eslint-disable-next-line max-len
  // message={`Задача ${titleTask.slice(0, 25)}${titleTask.length > 25 ? '...' : ''} будет безвозвратно удалена`}
  // okClick={deleteTaskHandle}
  // isLoading={isLoadingModal}
  const isVisibleModal = false;
  const isLoading = false;
  const cancelClick = () => {};
  const okClick = () => {};
  const message = 'asd';
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
        <p className={style.text}>{ message }</p>
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
