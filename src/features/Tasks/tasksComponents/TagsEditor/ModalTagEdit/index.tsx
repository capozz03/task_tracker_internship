import { Button, Input, Modal } from 'antd';
import React, { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagsSlice } from 'store/slice';
import styles from './index.module.scss';
import ColorButton from './ColorButton';

type ModalTagProps = {
  isVisibleModal: boolean;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTagEdit = ({ isVisibleModal, setIsVisibleModal }: ModalTagProps) => {
  const dispatch = useDispatch();
  const colorArray = ['#FF974A', '#FC5A5A', '#82C43C', '#A461D8', '#FF9AD5', '#50B5FF', '#FFC542'];
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
  return (
    <Modal
      className={styles.modalDelete}
      title=""
      centered
      visible={isVisibleModal}
      footer={null}
      onCancel={handleCancel}
      onOk={handleOk}
      width={272}
    >
      <h4 className={styles.title}>
        {
          tag && tag.created
            ? 'Изменить метку'
            : 'Создать метку'
        }
      </h4>
      {
        tag && (
          <div className={styles.inputWrap}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="tagName">Название метки</label>
            <Input
              type="text"
              id="tagName"
              value={tag.name}
              onChange={inputChangeHandler}
              className={styles.input}
              maxLength={20}
            />
            <div className={styles.wrapColors}>
              {
                colorArray.map((color) => (
                  <ColorButton color={color} key={color} tag={tag} />
                ))
              }
            </div>
          </div>
        )
      }
      <div className={styles.wrapperButtons}>
        <Button className={styles.saveBtn} onClick={handleOk}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalTagEdit;
