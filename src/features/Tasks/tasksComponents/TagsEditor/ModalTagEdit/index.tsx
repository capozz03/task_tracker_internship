import { Button, Form, Input, Modal } from 'antd';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
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
  const [error, setError] = useState('');
  const colorArray = ['#FF974A', '#FC5A5A', '#82C43C', '#A461D8', '#FF9AD5', '#50B5FF', '#FFC542'];
  const tag = useSelector(TagsSlice.getCurrentTagSelector);
  const rejectedHandle = (message: string) => {
    if (message === 'duplicate key value violates unique constraint "ctr__name_unique"') {
      setError('Тег с таким именем уже существует');
    } else {
      setError(message);
    }
  };
  const resolveHandle = () => {
    setIsVisibleModal(false);
  };
  const handleOk = () => {
    if (tag) {
      if (tag.name.length !== 0) {
        if (tag.created) {
          dispatch(TagsSlice.updateTagAsync({
            tag: {
              taskTagId: tag.task_tag_id,
              titleTag: tag.name,
              color: tag.color,
            },
            rejectedHandle,
            resolveHandle,
          }));
        } else {
          dispatch(TagsSlice.createTagAsync({
            tag: {
              titleTag: tag.name,
              color: tag.color,
            },
            rejectedHandle,
            resolveHandle,
          }));
        }
      } else {
        setError('Название обязательно');
      }
    }
  };

  const handleCancel = () => {
    dispatch(TagsSlice.clearCurrentTag());
    setError('');
    setIsVisibleModal(false);
  };

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setError('');
    if (tag) {
      dispatch(TagsSlice.setCurrentTag({
        ...tag,
        name: event.target.value,
      }));
    }
  };

  useEffect(() => () => {
    setError('');
  }, []);

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
      <Form onFinish={handleOk}>
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
              required
            />
            {
              error && <span className={styles.errorMessage}>{ error }</span>
            }
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
          <Button
            className={styles.saveBtn}
            disabled={!!error || tag?.name.length === 0}
            onClick={handleOk}
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalTagEdit;
