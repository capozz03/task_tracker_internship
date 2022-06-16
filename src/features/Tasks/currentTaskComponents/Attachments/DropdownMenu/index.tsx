import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import Icon from '@ant-design/icons';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { TaskFormSlice } from 'store/slice';
import { ModalDelete } from 'shared';
import { MoreVerticalIcon } from 'shared/ui/icons';

type DropdownMenuProps = {
  // eslint-disable-next-line react/require-default-props
  taskId?: string;
  storageFileId: string;
  name: string;
  canChange?: boolean,
};

const DropdownMenu = ({ taskId, storageFileId, name, canChange = false }: DropdownMenuProps) => {
  const { Item } = Menu;
  const dispatch = useDispatch();
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

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
      {
        canChange
        && (
          <Item key="2" onClick={deleteAttachment} className={style.delete}>
            Удалить вложение
          </Item>
        )
      }
    </Menu>
  );

  return (
    <>
      <Dropdown.Button
        getPopupContainer={() => document.querySelector('.ant-modal-wrap') as HTMLElement}
        className={style.dropdownButton}
        overlay={menu}
        icon={<Icon className={style.dropdownIcon} component={MoreVerticalIcon} />}
        destroyPopupOnHide
        trigger={['click']}
      />
      <ModalDelete
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
        taskId={taskId}
        storageFileId={storageFileId}
        name={name}
      />
    </>
  );
};

export default DropdownMenu;
