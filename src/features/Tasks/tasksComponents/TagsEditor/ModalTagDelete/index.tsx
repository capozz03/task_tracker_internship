import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';
import style from './index.module.scss';

type ModalDeleteProps = {
  isVisibleModal: boolean;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTagDelete = ({ isVisibleModal, setIsVisibleModal }: ModalDeleteProps) => {
  const dispatch = useDispatch();
  const tag = useSelector(TagsSlice.getCurrentTagSelector);

  const handleOk = () => {
    if (tag) {
      dispatch(TagsSlice.deleteTagAsync({ taskTagId: tag.task_tag_id }));
    }
    setIsVisibleModal(false);
  };

  const handleCancel = () => {
    dispatch(TagsSlice.clearCurrentTag());
    setIsVisibleModal(false);
  };

  const warning = `Метка ${tag && tag.name} будет удалена из списка меток и из всех задач проекта`;
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
          Удалить метку
        </Button>
        <Button className={style.cancelBtn} onClick={handleCancel}>
          Отменить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalTagDelete;
