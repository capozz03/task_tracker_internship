import React, { useState } from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import Icon, { DeleteOutlined } from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { MoreVerticalIcon } from 'shared/ui/icons/MoreVerticalIcon';
import { Button } from 'features/Tasks/tasksComponents';

type DropdownMenuProps = {
  // eslint-disable-next-line react/require-default-props
  taskId?: string;
  storageFileId: string;
  name: string;
};

const DropdownMenu = ({ taskId, storageFileId, name }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleOk = () => {
    if (taskId) {
      dispatch(
        TaskFormSlice.deleteStorageFile({
          taskId,
          storageFileId,
        }),
      );
    }
    setIsVisibleModal(false);
  };

  const warning = `${name} будет безвозвратно удален`;

  const handleCancel = () => {
    setIsVisibleModal(false);
  };

  const downloadAttachment = () => {
    if (taskId) {
      dispatch(TaskFormSlice.downloadStorageFile({ storageFileId }));
    }
  };
  const deleteAttachment = () => {
    setIsVisibleModal(true);
  };

  const menu = (
    <Menu className={style.dropdownMenu}>
      <Item key="1" onClick={downloadAttachment}>
        Скачать вложение
      </Item>
      <Item key="2" onClick={deleteAttachment} className={style.delete}>
        Удалить вложение
      </Item>
    </Menu>
  );

  return (
    <>
      <Dropdown.Button
        className={style.dropdownButton}
        overlay={menu}
        icon={<Icon className={style.dropdownIcon} component={MoreVerticalIcon} />}
        destroyPopupOnHide
        trigger={['click']}
      />
      <Modal
        className={style.modalDelete}
        title=""
        centered
        visible={isVisibleModal}
        footer={null}
        onCancel={handleCancel}
        onOk={handleOk}
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
    </>
  );
};

export default DropdownMenu;
