import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import style from './index.module.scss';

type ModalDeleteProps = {
  isVisibleModal: boolean;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskId?: string;
  storageFileId: string;
  name: string;
};

const ModalDelete = ({
  isVisibleModal,
  setIsVisibleModal,
  taskId,
  storageFileId,
  name,
}: ModalDeleteProps) => {
  const dispatch = useDispatch();

  const handleOk = () => {
    if (taskId) {
      dispatch(
        TaskFormSlice.deleteStorageFile({
          taskId,
          storageFileId,
          nameOriginal: name,
        }),
      );
    }
    setIsVisibleModal(false);
  };

  const handleCancel = () => {
    setIsVisibleModal(false);
  };

  const warning = `${name} будет удален`;
  return (
    <Modal
      className={style.modalDelete}
      title=""
      centered
      visible={isVisibleModal}
      footer={null}
      onCancel={handleCancel}
      onOk={handleOk}
      width={325}
    >
      <h4 className={style.title}>Вы уверены?</h4>
      <p className={style.text}>{warning}</p>
      <div className={style.wrapperButtons}>
        <Button className={style.deleteBtn} icon={<DeleteOutlined />} onClick={handleOk}>
          Удалить файл
        </Button>
        <Button className={style.cancelBtn} onClick={handleCancel}>
          Отменить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
