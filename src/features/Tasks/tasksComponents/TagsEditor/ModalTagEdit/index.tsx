import { Button, Modal } from 'antd';
import React, { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';
import style from './index.module.scss';

type ModalTagProps = {
  isVisibleModal: boolean;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTagEdit = ({ isVisibleModal, setIsVisibleModal }: ModalTagProps) => {
  const dispatch = useDispatch();
  const tag = useSelector(TagsSlice.getCurrentTagSelector);
  const handleOk = () => {
    if (tag) {
      dispatch(TagsSlice.updateTagAsync({
        taskTagId: tag.task_tag_id,
        titleTag: tag.name,
        color: tag.color,
      }));
    }
    setIsVisibleModal(false);
  };

  const handleCancel = () => {
    dispatch(TagsSlice.clearCurrentTag());
    setIsVisibleModal(false);
  };

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (tag) {
      dispatch(TagsSlice.setCurrentTag({
        ...tag,
        name: event.target.value,
      }));
    }
  };

  const message = 'Название метки';
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
      <h4 className={style.title}>Изменить метку</h4>
      <p className={style.text}>{message}</p>
      {
        tag && <input type="text" value={tag.name} onChange={inputChangeHandler} />
      }
      <div className={style.wrapperButtons}>
        <Button className={style.saveBtn} onClick={handleOk}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalTagEdit;
